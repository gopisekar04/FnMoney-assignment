import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'


export default function Headers(){
    const [isLoggedIn, setIsloggedIn] = useState(false)

    useEffect(() => {
        const jwtToken = Cookies.get("jwtToken")
        if(jwtToken){
            setIsloggedIn(true)
        }
    }, [])
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('jwtToken')
        navigate('/')
    }

    return <div className='d-flex justify-content-between align-items-center header-container'>
        <Link to='/'>
        <img src="https://www.fnmoney.ai/images/logo.png" alt="logo" className='header-logo' />
        </Link>
        <div className='nav-link-container'>
            {isLoggedIn === false ? (
                <><button className='header-login-btn' onClick={() => {
                    navigate('/login');
                } }>Log in</button><button className='signup-btn' onClick={() => {
                    navigate("/signup");
                } }>Sign up</button></>
            ): null}
            {isLoggedIn && <>
            <button onClick={() => {
                navigate('/my-assignments')
            }}>My Assignments</button>
            <button className='signup-btn' onClick={handleLogout}>
                Logout</button>
            </>}
            <DropdownButton bsPrefix="dropdown-btn" title="Menu" >
                <Dropdown.Item href="#Home">Home</Dropdown.Item>
                <Dropdown.Item href="#About">About</Dropdown.Item>
                <Dropdown.Item href="/assessment-task">Assessment Tasks</Dropdown.Item>
                <Dropdown.Item href="#Contact">Contact</Dropdown.Item>
            </DropdownButton>
        </div>
    </div>
    
}