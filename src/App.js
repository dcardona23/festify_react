import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './MainPage/MainPage'
import ScheduleDetails from './ScheduleDetails/ScheduleDetails'

function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/:id' element={<ScheduleDetails />}/>
      </Routes>
    </main>
  )
}

export default App