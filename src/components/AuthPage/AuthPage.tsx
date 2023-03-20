import React, { useContext } from 'react';

import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { AuthContext } from '../../context/AuthProvider';
import './AuthPage.scss';

export const AuthPage: React.FC = () => {
  const { handleGoogleLogin, handleFacebookLogin } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <GoogleLoginButton onClick={handleGoogleLogin} />
      <FacebookLoginButton onClick={handleFacebookLogin} />
    </div>
  );
};
