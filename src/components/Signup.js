import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const host = 'http://localhost:5000'
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const navigate = useNavigate()
    const handleSubmit = async (e, res) => {
        e.preventDefault()

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'name': credentials.name, 'email': credentials.email, 'password': credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            navigate('/login')
            props.showAlert("Successfully Created an account", "success")
        }
        else {
            props.showAlert(json.error, "warning")

        }

    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container mt-4'>
                <h2>Create an Account </h2>
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input onChange={onchange} type="text" className="form-control" id="name" name='name' placeholder='Enter Your Name Here' required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={onchange} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder='Enter Your Email Here' required minLength={5} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={onchange} type="password" className="form-control" name='password' id="password" placeholder='Enter Your Password Here' required minLength={8} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" placeholder='Enter Password Again' required minLength={8} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
