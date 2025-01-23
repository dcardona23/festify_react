import './MainPage.css'
import background from '../images/background.jpg'
import { useState, useEffect } from 'react'
import Schedules from '../Schedules/Schedules'

function MainPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [schedules, setSchedules] = useState([])
  const [error, setError] = useState(null)
  
    function fetchSchedules() {
      fetch('http://localhost:5000/api/v1/schedules')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch schedules')
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        setSchedules(data.data)
      })
      .catch(error => {
        console.error('Error fetching schedules', error)
        setError('Oops! Something went wrong. Please try again later.')
      })
    }

    useEffect(() => {
      fetchSchedules()
    }, [])  

    const filteredSchedules = schedules.filter((schedule) =>
      (schedule.attributes.shows || []).some((show) =>
        show.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )  

    if (error) { 
      return <h1>{error}</h1>
    }

  return (
    <main>
      <section className="header-container">
        <img className="background-image" src={ background } alt="colorful musical notes streaming across black background" />
        <h1 id="main-header">Festify</h1>
        <h2 id="festival-name">Sunset Soundscape 2025</h2>
      </section>
      <input className="search-bar"
        type="text"
        placeholder="Search schedules by artist name"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        />
      <section className="schedules-container">
        <h3 id="schedules-header">Sunset Soundscape Schedules</h3>
        <Schedules schedules={filteredSchedules}/>
      </section>
    </main>
  )
}

export default MainPage