import './App.css'
import CountDown from './components/CountDown/CountDown'
import Alarm from './components/Alarm/Alarm'
import { Route, Routes } from 'react-router-dom'
import StopWatch from './components/StopWatch/StopWatch'
import Navbar from './components/Navbar/Navbar'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Alarm/>} />
        <Route path='/stopwatch' element={<StopWatch/>} />
        <Route path='/countdown' element={<CountDown/>} />
      </Routes>
    </>
  )
}

export default App
