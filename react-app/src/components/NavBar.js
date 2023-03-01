
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import { useDispatch } from 'react-redux';
import { showModal, setCurrentModal } from '../store/modal';


const NavBar = () => {
  const dispatch = useDispatch();

  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal());
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  }
  return (
    <nav className='bg-light'>
      <ul className='nav d-flex justify-content-space-around '>
        <li className='nav-item'>
          <NavLink className='nav-link active text-warning' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <div className='nav-link active text-warning' onClick={showLoginForm}>Login</div>
        </li>
        <li className='nav-item'>
          <div className='nav-link active text-warning' onClick={showSignUpForm}>Sign up</div>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link active text-warning' to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li className='nav-item mx-auto'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
