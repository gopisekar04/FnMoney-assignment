import { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"; 
import './index.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import InputField from '../InputField/InputField';

export default function AssessmentTask() {
    const navigate = useNavigate()
    const[assessmentDetails, setAssessmentDetails] = useState({
      title: "",
      description: "",
      githublink: "",
      publishlink: "",
    })
    const [error, setError] = useState("")

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken')
        if(!jwtToken){
            navigate('/login')
        }
    })

    const handleAssessmentSubmit = async(e) => {
      e.preventDefault()
      console.log(assessmentDetails);
      const jwtToken = Cookies.get("jwtToken")      
      const url = "http://localhost:3000/api/v1/publish"
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentDetails)
      }

      const res = await fetch(url, options)
      if(res.ok){
        navigate('/my-assignments')
      }else{
        const jsonData = await res.json()
        const {error} = jsonData
        setError(error)
      }      
    }

    return <>
        <Header />
        <div className="mt-5">
          <div style={{padding: '0px 60px'}}>
        <h1>FnMoney Fullstack Assignment Reference Document</h1>

        <section className="mt-4">
          <h2>Frontend Development (React with Class Components)</h2>
          <ol>
            <li>
              <h3>Project Setup</h3>
              <ul>
                <li>Create a new React application using Create React App.</li>
                <li>Install necessary packages like <code>react-router-dom</code> for routing across different pages.</li>
              </ul>
            </li>
            <li>
              <h3>Landing Page</h3>
              <ul>
                <li>Create a class component named <code>LandingPage</code> which includes state for managing any dynamic data or UI states.</li>
                <li>Use the <code>render()</code> method to return JSX that includes navigation links to Home, About, Assessment Tasks, and Contact.</li>
                <li>Apply CSS or a framework like Bootstrap for styling to ensure the page is visually appealing and responsive.</li>
              </ul>
            </li>
            <li>
              <h3>Form Handling</h3>
              <ul>
                <li>Create class components for each form: <code>RegistrationForm</code>, <code>LoginForm</code>, and <code>AssessmentForm</code>.</li>
                <li>Manage form state using the component's state to handle input fields and form validation.</li>
                <li>Use the <code>onChange</code> handlers to update state and <code>onSubmit</code> handlers to process the form data.</li>
              </ul>
            </li>
            <li>
              <h3>User Interface</h3>
              <ul>
                <li>Build out UI components that can be reused across different parts of the application such as headers, footers, and form components.</li>
                <li>Make sure to use state effectively to manage any interactive elements like modal dialogs or dropdowns.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="mt-4">
          <h2>Backend Development (Node.js, Express, SQLite)</h2>
          <ol>
            <li>
              <h3>Setting up Node.js Server</h3>
              <ul>
                <li>Initialize a new Node.js project and install Express.</li>
                <li>Create an <code>app.js</code> file where you set up your Express server.</li>
                <li>Define basic routes to serve your React application and handle API requests.</li>
              </ul>
            </li>
            <li>
              <h3>Database Setup</h3>
              <ul>
                <li>Although MongoDB was suggested, if you prefer SQLite:</li>
                <li>Set up an SQLite database using the <code>sqlite3</code> module.</li>
                <li>Create tables relevant to your application such as <code>users</code>, <code>assessments</code>, etc.</li>
              </ul>
            </li>
            <li>
              <h3>API Endpoints</h3>
              <ul>
                <li>Define endpoints in Express that perform CRUD operations on the SQLite database.</li>
                <li>For each endpoint, write controller functions that interact with the database using SQL queries.</li>
              </ul>
            </li>
            <li>
              <h3>User Authentication</h3>
              <ul>
                <li>Implement user authentication using basic JWT.</li>
                <li>Set up registration and login endpoints that issue JWTs upon successful authentication.</li>
                <li>Store and manage JWTs in the client side securely (typically in HTTP-only cookies).</li>
              </ul>
            </li>
            <li>
              <h3>Form Data Handling</h3>
              <ul>
                <li>Create API endpoints to handle submissions from your forms.</li>
                <li>Validate incoming data on the server side before processing or storing it in your database.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="mt-4">
          <h2>General Tips</h2>
          <ul>
            <li>Ensure that all data inputs from forms are validated both client-side (for user experience) and server-side (for security).</li>
            <li>Use modern development tools like Postman for testing your APIs.</li>
            <li>Employ a responsive design strategy to ensure that your application looks good on both desktops and mobile devices.</li>
            <li>Implement error handling both in your React components and your Express server to gracefully handle any unexpected situations.</li>
          </ul>
        </section>
        <div className='form-container'>
          <form className=' d-flex flex-column' onSubmit={handleAssessmentSubmit}>
                  <h4>Publish Assessment</h4>
                  <InputField
                      label="Title"
                      type="text"
                      placeholder="Enter assessment title"
                      value={assessmentDetails.title}
                      onChange={(e)=> {
                        setAssessmentDetails({
                          ...assessmentDetails,
                          title: e.target.value
                        })
                      }}
                      name="title"
                      required
                  />
                  <InputField
                      label="Description"
                      type="text"
                      placeholder="Enter assessment description"
                      value={assessmentDetails.description}
                      onChange={(e)=> {
                        setAssessmentDetails({
                          ...assessmentDetails,
                          description: e.target.value
                        })
                      }}
                      name="description"
                      required
                  />
                  <InputField
                      label="GitHub Link"
                      type="url"
                      placeholder="Enter GitHub link"
                      value={assessmentDetails.githublink}
                      onChange={(e)=> {
                        setAssessmentDetails({
                          ...assessmentDetails,
                          githublink: e.target.value
                        })
                      }}
                      name="githubLink"
                      required
                  />
                  <InputField
                      label="Publish Link"
                      type="url"
                      placeholder="Enter publish link"
                      value={assessmentDetails.publishLink}
                      onChange={(e)=> {
                        setAssessmentDetails({
                          ...assessmentDetails,
                          publishlink: e.target.value
                        })
                      }}
                      name="publishLink"
                  />
                  {error !== "" ? <p>{error}</p> : null}
                  <div>
                      <button className='btn btn-primary mt-3' type='submit'>Publish Assessment</button>
                  </div>
              </form>
            </div>
        </div>

        <Footer />
      </div>

      </>
}