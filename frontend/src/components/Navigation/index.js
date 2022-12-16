import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav'>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      <h1 className='logo'>Cloudbnb</h1>
      <li className='create'>
        <NavLink to="/spots/new">Cloudbnb your home</NavLink>
      </li>
      {isLoaded && (
        <div>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </ul>
  );
}

export default Navigation;