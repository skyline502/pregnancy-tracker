import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let period = month + day + year;
    console.log(period, 'period...')
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, period));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  console.log(lastPeriod.split('-'), 'last period....')
  const day = lastPeriod.split('-')[2];
  const month = lastPeriod.split('-')[1];
  const year = lastPeriod.split('-')[0];

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="container justify-content-center">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-group'>
        <label>User Name</label>
        <input
          type='text'
          className='form-control'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='form-group'>
        <label>Email</label>
        <input
          type='text'
          className='form-control'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='form-group'>
        <label>Repeat Password</label>
        <input
          type='password'
          className='form-control'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='form-group'>
        <label>Last Period</label>
        <input
          type="date"
          className='form-control'
          name='last_period'
          onChange={e => setLastPeriod(e.target.value)}
          value={lastPeriod}
          required={true}
        ></input>
      </div>
      <button className='btn btn-primary mt-2' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
