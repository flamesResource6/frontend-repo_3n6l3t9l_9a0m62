import { Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Radar from './components/Radar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/radar" element={<Radar mode="juggernaut" />} />
      <Route path="/ogrash" element={<Radar mode="ogrash" />} />
    </Routes>
  )
}

export default App
