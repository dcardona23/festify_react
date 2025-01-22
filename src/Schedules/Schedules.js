import './Schedules.css'
import scheduleImage from '../images/schedules.jpg'
import { Link } from 'react-router-dom'

function Schedules({schedules}) {

  return (
    <section className="schedules">
      {schedules.map((schedule, index) => (
        <div className="schedule-card" key={index}>
          <Link to={`/${schedule.id}`}>
            <img
              src={scheduleImage}  
              alt="abstract music"
            />
          </Link>
          <p className="schedule-info">{schedule.attributes.name}</p>
        </div>
      ))}
      </section>
  )
}

export default Schedules