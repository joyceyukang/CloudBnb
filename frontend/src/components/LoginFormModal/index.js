import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const demoUser = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.login({credential: 'demoUser', password: 'demopassword'}))
    .then(closeModal)
  }

  return (
    <div>
    <h1 className="title-login">Log In</h1>
      <form className="input-login" onSubmit={handleSubmit}>
        <ul className='unordered-list'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="label-login">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="label-login">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className='login-modal-buttons'>
        <button className='single-login' type="submit">Log In</button>
        <button className='single-login' onClick={demoUser}>Demo</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;