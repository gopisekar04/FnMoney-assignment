import './App.css';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'
import AssessmentTask from './components/AssessmentTask/AssessmentTask'
import Signup from './components/Signup/Signup'
import MyAssignments from './components/MyAssignments/MyAssignments'



function App() {
  return <BrowserRouter>
    <Routes>
    <Route exact path='/login' element={<Login />}  />
    <Route exact path='/signup' element={<Signup />}  />
    <Route exact path='/' element={<LandingPage />}  />
    <Route exact path='/assessment-task' element={<AssessmentTask />}  />      
    <Route exact path='/my-assignments' element={<MyAssignments />}  /> 
    </Routes>
  </BrowserRouter>
}

export default App;
