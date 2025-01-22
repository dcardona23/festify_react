import './Schedules.css'
import { useState, useEffect } from 'react'

function Schedules({schedules}) {
  console.log(schedules)
  return (
    <section className="schedules">
      {schedules.forEach((schedule) => {
        console.log(schedule)
      })}
    </section>
  )
}

export default Schedules