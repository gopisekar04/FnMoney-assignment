import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Headers(){
    const navigate = useNavigate()

    return <div className='d-flex justify-content-between align-items-center header-container'>
        <Link to='/'>
        <img src="https://www.fnmoney.ai/images/logo.png" alt="logo" className='header-logo' />
        </Link>
        <div className='d-flex'>
            <button className='login-btn' onClick={()=> {
                navigate('/login')
            }}>Log in</button>
            <button className='signup-btn' onClick={()=> {
                navigate("/signup")
            }}>Sign up</button>
            <DropdownButton bsPrefix="dropdown-btn" title="Menu" >
                <Dropdown.Item href="#Home">Home</Dropdown.Item>
                <Dropdown.Item href="#About">About</Dropdown.Item>
                <Dropdown.Item href="#Assessment-task">Assessment Tasks</Dropdown.Item>
                <Dropdown.Item href="#Contact">Contact</Dropdown.Item>
            </DropdownButton>
        </div>
    </div>
    
}