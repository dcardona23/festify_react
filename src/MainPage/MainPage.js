import './MainPage.css'
import background from '../images/background.jpg'
import { useState, useEffect } from 'react'
import scheduleImage from '../images/schedules.jpg'

function MainPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [scheduleDisplay, setScheduleDisplay] = useState(true)
  const [schedules, setSchedules] = useState([])
  
    function fetchSchedules() {
      fetch('http://localhost:5000/api/v1/schedules')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch schedules')
        }
        return response.json()
      })
      .then(data => {
        setSchedules(data.data)
        console.log(schedules[0])
      })
      .catch(error => {
        console.error('Error fetching schedules', error)
      })
    }
  
    useEffect(() => {
      fetchSchedules()
    }, [])  

  return (
    <main>
      <section className="header-container">
        <img className="background-image" src={ background } alt="colorful musical notes streaming across black background" />
        <h1 id="main-header">Festify</h1>
        <h2 id="festival-name">Sunset Soundscape 2025</h2>
      </section>
      <input className="search-bar"
        type="text"
        placeholder="Search for a schedule"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        />
      <section className="schedules-container">
        <h3 id="schedules-header">Sunset Soundscape Schedules</h3>
        {scheduleDisplay && (
          <section className="schedules">
            {schedules.map((schedule, index) => (
              <div key={index}>
                <img
                  src={scheduleImage}  
                  alt="abstract music image"
                />
                <p className="schedule-info">{schedule.attributes.name}</p>
              </div>
            ))}
            </section>
        )}
      </section>
    </main>
  )
}

export default MainPage