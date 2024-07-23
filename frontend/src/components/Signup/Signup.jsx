import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputField from "../InputField/InputField"
import Cookies from "js-cookie"
import './index.css'

export default function Signup(){
    const [signupDetails, setSignupDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })    
    const navigate = useNavigate()
    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken')
        if(jwtToken){
            navigate('/')
        }
    })

    const handleSignup = async(e) => {
        console.log(signupDetails);
        e.preventDefault();
        const url = 'http://localhost:3000/api/v1/signup'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupDetails)
        }
        const res = await fetch(url, options)
        const jsonData = await res.json()          
        if(res.ok){
            navigate('/login')
        }
        
    }

    return <div className="login-bg d-flex justify-content-center align-items-center">
            <form id="RegistrationForm" onSubmit={handleSignup} className="signin-form">
                <h4>Signin</h4>
                <p>Already have an account?  <a href="/login">Login</a></p>
                <InputField
                    label="First Name"
                    type="text"
                    placeholder="John"
                    value={signupDetails.firstName}
                    onChange={(e)=>{
                        setSignupDetails({
                            ...signupDetails,
                            firstName: e.target.value
                        })
                    }}
                    name="firstName"
                    required
                />

<InputField
                    label="Last Name"
                    type="text"
                    placeholder="Doe"
                    value={signupDetails.lastName}
                    onChange={(e)=>{
                        setSignupDetails({
                            ...signupDetails,
                            lastName: e.target.value
                        })
                    }}
                    name="lastName"
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={signupDetails.email}
                    onChange={(e)=>{
                        setSignupDetails({
                            ...signupDetails,
                            email: e.target.value
                        })
                    }}
                    name="email"
                    required
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder=""
                    value={signupDetails.password}
                    onChange={(e)=>{
                        setSignupDetails({
                            ...signupDetails,
                            password: e.target.value
                        })
                    }}
                    name="password"
                    required
                />
                <div>
                    <button type="submit" className="btn btn-primary mt-3 signin-btn">Signin</button>
                </div>
            </form>
        </div>    
}