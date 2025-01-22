import './ScheduleDetails.css'
import { useParams, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import scheduleImage from '../images/schedules.jpg'
import homeButton from '../images/homebutton.png'

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
      })
    .catch(error => {
      console.error('Error fetching schedule details:', error)
      })
  }, [id])

  if (!schedule) return <p>Loading...</p>

  function removeShow(showId) {
    fetch(`http://localhost:5000/api/v1/schedules/${id}/shows/${showId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to remove show')
      }
      return response.json()
    })
    .then(() => {
      const updatedShows = schedule.attributes.shows.filter(show => show.id !== showId)
      setSchedule({...schedule, attributes: {...schedule.attributes, shows: updatedShows,}})
      })
    .catch(error => {
      console.error('Error removing show:', error)
      })
  }

  return (
    <>
      <section className="schedule-details-header-container">
        <img className="schedule-details-background-image"
          src={scheduleImage}  
          alt="abstract music"
        />
        <NavLink to="/">
          <img className="home-button" src={ homeButton } alt="Back to main page" />
        </NavLink>
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
                alt="abstract music"
              />
              <div className="show-info">
                <p><span>Artist:</span> {show.artist_name}</p>
                <p><span>Genre:</span> {show.genre}</p>
                <p><span>Location:</span> {show.location}</p>
                <p><span>Start Time:</span> {new Date(show.start_time).toLocaleString()}</p>
                <p><span>End Time:</span> {new Date(show.end_time).toLocaleString()}</p>
              </div>
              <button 
                id="remove-show-button" 
                onClick={() => removeShow(show.id)}
              >
                Remove Show from Schedule
              </button>
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
                alt="abstract music"
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