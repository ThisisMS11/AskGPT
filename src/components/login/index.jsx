import React, { useState } from 'react'
import '../auth/auth.css'
function Login() {
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });
    const handleUserInput = (name, value) => {
        setFormInput({
          ...formInput,
          [name]: value,
        });
      };
    return (
        <div className="App-container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">Login</h4>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" className='login-avatar'/>


        <div className="card-body">
          <form >
            <p className="label">Email</p>
            <input
              value={formInput.email}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="email"
              type="text"
              className="input"
              placeholder="Enter Email"
            />

            <p className="label">Password</p>
            <input
              value={formInput.password}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />


            <input type="submit" className="btn" value="Submit" />
          </form>
        </div>
      </div>
    </div>
    )
}

export default Login