import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    history.push('/')
  };

  const trip = (e) => {
    e.preventDefault();
    history.push('/user/trips')
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-card">
      <button className="profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className="loginSign-button1" onClick={trip}>
                    Trips
                </button>
              </li>
              <li>
                <button className="loginSign-button1" onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li className="loginSign">
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="loginSign">
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;