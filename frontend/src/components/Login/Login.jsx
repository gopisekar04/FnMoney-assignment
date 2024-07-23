import './index.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Login(){
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken')
        if(jwtToken){
            navigate('/')
        }
    })

    const handleLogin = async(e) => {        
        e.preventDefault();
        console.log(loginDetails);
        const url = 'http://localhost:3000/api/v1/login'
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },            
            body: JSON.stringify(loginDetails)
        }
        const res = await fetch(url, options)
        if(res.ok){
            const jsonData = await res.json()
            const {jwtToken} = jsonData;
            Cookies.set('jwtToken', jwtToken, {expires: 7})
            navigate('/assessment-task')
        }
    }

    return <div className="login-bg d-flex justify-content-center align-items-center">
            <form id="RegistrationForm" className='form-container d-flex flex-column' onSubmit={handleLogin}>
                <h4>Login</h4>
                <p>Don't have an account?  <a href="/signup">Sign up</a></p>                
                <div className='d-flex flex-column input-contaienr'>
                    <label>Email</label>
                    <input value={loginDetails.email} type="email" placeholder="johndoe@gmail.com" onChange={(e)=>{
                        setLoginDetails({
                            ...loginDetails,
                            email: e.target.value
                        })
                    }} />
                </div>
                <div className='d-flex flex-column input-contaienr'>
                    <label>Password</label>
                    <div>
                    <input value={loginDetails.password} type={`${showPassword === true ? 'text' : 'password'}`} placeholder="" onChange={(e)=>{
                        setLoginDetails({
                            ...loginDetails,
                            password: e.target.value
                        })
                    }} />

                    <button className='show-password-btn' onClick={(e)=>{
                        e.preventDefault()
                        setShowPassword(!showPassword)}
                    } >
                    {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                        )}
                    </button>       </div>                        
                    <a href='' style={{fontSize: '13px'}}>Forgot password</a>
                </div>
                <div >
                    <button className='btn btn-primary login-btn' type='submit'>Login</button>
                </div>
            </form>
    </div>
}