import { useState } from "react";
import "./auth.css";

function Auth() {
  const [formInput, setFormInput] = useState({
    name: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = (event) => {
    event.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      });
      return
    }

    if (!formInput.email) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return
    }

    setFormError(inputError);
  };

  return (
    <div className="App-container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">Sign Up</h4>
        </div>

        <div className="card-body">
          <form onSubmit={validateFormInput}>
          <p className="label">UserName</p>
          <input
            value={formInput.name}
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
            name="name"
            type="text"
            className="input"
            placeholder="Enter Your Name"
          />
          <p className="label">Display Name</p>
            <input
              value={formInput.displayName}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="displayName"
              type="text"
              className="input"
              placeholder="Display Name"
            />
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
            <p className="error-message">{formError.email}</p>

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
            <p className="error-message">{formError.password}</p>

            <p className="label">Confirm Password</p>
            <input
              value={formInput.confirmPassword}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="confirmPassword"
              type="password"
              className="input"
              placeholder="Confirm Password"
            />
            <p className="error-message">{formError.confirmPassword}</p>

            <input type="submit" className="btn" value="Submit" />
            <label className="signup-exist"> Already have an account ? Login</label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;