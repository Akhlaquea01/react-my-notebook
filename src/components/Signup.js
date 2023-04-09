import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Signup = (props) => {
    const host = "http://localhost:5000";
    let history = useNavigate();
    const [ credentials, setcredentials ] = useState({
        name: '',
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password, name: credentials.name })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history("/")
            props.showAlert("Account Created successfully","success");
        }else{
            props.showAlert("Invalid Creds","danger");
        }
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [ e.target.name ]: e.target.value });
    };
    return (
        <div className='mt-3'>
            <div className='contaier'>
                <h3>SignUp to use myNoteBook</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={onChange} type="name" name='name' value={credentials.name} className="form-control" id="name" placeholder="name" />
                    </div>
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
        </div>
    );
};
