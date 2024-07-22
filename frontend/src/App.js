import './App.css';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';



function App() {
  return <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<LandingPage />}  />
    </Routes>
  </BrowserRouter>
}

export default App;
