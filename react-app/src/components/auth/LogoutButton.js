import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button type='button' className='btn btn-outline-warning p-2 m-1' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
