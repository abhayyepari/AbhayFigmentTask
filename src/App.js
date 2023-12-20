import logo from './logo.svg';
import './App.css';
import News from './Components/News';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Stocks from './Components/Stocks';
import Market from './Components/Market';
import Screener from './Components/Screener';
 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<News />} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/market' element={<Market />} />
        <Route path='/screener' element={<Screener />} />
      </Routes>
    </div>
  );
}

export default App;
