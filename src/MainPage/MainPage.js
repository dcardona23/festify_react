import './MainPage.css'
import { Routes, Route } from 'react-router-dom'
import ScheduleDetails from '../ScheduleDetails/ScheduleDetails'
import background from '../images/background.jpg'

function MainPage() {

  return (
    <>
      <Routes>
        <Route path='/:id' element={<ScheduleDetails />}/>
      </Routes>
      <section className="header-container">
        <img className="background-image" src={ background } alt="colorful musical notes streaming across black background" />
        <h1>Festify</h1>
        <h2>Sunset Soundscape 2025</h2>
      </section>
      
    </>
  )
}

export default MainPage