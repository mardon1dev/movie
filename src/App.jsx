import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Components/Header/Header';
import Homepage from './Components/Homepage/Homepage';
import Watch from './Components/Watch/Watch';

function App() {
  return (
    <div className=''>  
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/:title" element={<Watch/>} />
      </Routes>
    </div>
  )
}

export default App;
