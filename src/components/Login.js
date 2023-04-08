import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const host = "http://localhost:5000";
    let history=useNavigate()
    const [ credentials, setcredentials ] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history("/")
        }
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [ e.target.name ]: e.target.value });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChange} type="email" name='email' value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} type="password" name='password' value={credentials.password} className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
};

export default Login;