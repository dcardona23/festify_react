import './ScheduleDetails.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import scheduleImage from '../images/schedules.jpg'

function ScheduleDetails() {
  const { id } = useParams()
  const [schedule, setSchedule] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/schedules/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch schedule details')
      }
      return response.json()
    })
    .then(data => {
      setSchedule(data.data[0])
      console.log(schedule)
      })
    .catch(error => {
      console.error('Error fetching schedule details:', error)
      })
  }, [id])

  if (!schedule) return <p>Loading...</p>

  return (
    <>
      <section className="schedule-details-header-container">
        <img className="schedule-details-background-image"
          src={scheduleImage}  
          alt="abstract music image"
        />
        <h1 id="schedule-details-header">{schedule.attributes.name}</h1>
        <h2 id="schedule-details-description">{schedule.attributes.description}</h2>
      </section>
      <section className="shows-container">
          <h3 id="schedules-header">{`${schedule.attributes.name} Show Details`}</h3>
        <div className="shows">
          {schedule.attributes.shows.map((show, index) => (
            <div className="show-card" key={index}>
              <img
                src={scheduleImage}  
                alt="abstract music image"
              />
              <div className="show-info">
                <p><span>Artist:</span> {show.artist_name}</p>
                <p><span>Genre:</span> {show.genre}</p>
                <p><span>Location:</span> {show.location}</p>
                <p><span>Start Time:</span> {new Date(show.start_time).toLocaleString()}</p>
                <p><span>End Time:</span> {new Date(show.end_time).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="attendees-container">
          <h3 id="attendees-header">{`${schedule.attributes.name} Attendee Info`}</h3>
          <div className="attendees">
          {schedule.other_schedule_attendees.map((attendee, index) => (
            <div className="attendee-card" key={index}>
              <img
                src={scheduleImage}  
                alt="abstract music image"
              />
              <div className="attendee-info">
                <p><span>Attendee Name:</span> {attendee.attendee_name}</p>
                <p><span>Attendee Email:</span> {attendee.attendee_email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
    
  )

}

export default ScheduleDetails