import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const host = 'http://localhost:5000'
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'email': credentials.email,'password':credentials.password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            console.log('successfully logged in')
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("Successfully Logged In", "success")
        }
        else{
            props.showAlert(json.error, "warning")
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-4'>
            <h2>Login to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" onChange={onchange} aria-describedby="emailHelp" placeholder='Enter Your Email Here' required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password" onChange={onchange} placeholder='Enter Your Password Here' required minLength={8} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
