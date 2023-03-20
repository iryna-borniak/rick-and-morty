import React, { useContext } from 'react';

import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { AuthPage } from '../AuthPage';
import { Spinner } from '../Spinner';
import './Header.scss';

export const Header: React.FC = () => {
  const { user, handleLogout, loggingIn } = useContext(AuthContext);

  const { displayName, email, photoURL } = user || {};

  return (
    <>
      {loggingIn ? (
        <Spinner />
      ) : user ? (
        <>
          <header className="header">
            <div className="header__info">
              <img
                className="header__picture"
                src={photoURL}
                alt="user photo"
              ></img>
              <div className="header__details">
                <p className="header__paragraph header__paragraph--bold">
                  {displayName}
                </p>
                <p className="header__paragraph">{email}</p>
              </div>
            </div>

            <button className="header__logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </header>
          <Outlet />
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
};
