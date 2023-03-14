import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav'>
      <div className="bar-left">
        <li>
          <NavLink exact to="/">
            {/* <img className="cloud" src="https://img.icons8.com/ios/512/happy-cloud.png" alt="logo" /> */}
            <i className="fa-solid fa-cloud"></i>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/">
            <h1 className='logo'>Cloudbnb</h1>
          </NavLink>
        </li>
      </div>
      <div className="bar-right">
        <li>
          <NavLink to="/spots/new">Cloudbnb your home</NavLink>
        </li>
        {isLoaded && (
          <div>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </div>
        )}
      </div>
    </ul>
  );
}

export default Navigation;