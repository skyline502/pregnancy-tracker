
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import { useDispatch } from 'react-redux';
import { showModal, setCurrentModal } from '../store/modal';
import { useSelector } from 'react-redux';


const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  console.log(user, 'user....')

  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal());
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  }
  return (
      <ul className='nav justify-content-around bg-light py-1'>
        <li className='nav-item'>
          <NavLink className='nav-link active text-info' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <div className='nav-link active text-info' onClick={showLoginForm}>Login</div>
        </li>
        <li className='nav-item'>
          <div className='nav-link active text-info' onClick={showSignUpForm}>New Mom</div>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link active text-info' to='/users' exact={true} activeClassName='active'>
            Mothers
          </NavLink>
        </li>
        <li className='nav-item'>
          <LogoutButton />
        </li>
      </ul>
  );
}

export default NavBar;
