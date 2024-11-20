import React from 'react';
import GoogleSignIn from './GoogleSignIn';

const LoginPage = ({ onLoginSuccess, onLoginFailure }) => {
    return (
        <div>
            <GoogleSignIn
                onLoginSuccess={onLoginSuccess}
                onLoginFailure={onLoginFailure}
            />
        </div>
    );
};

export default LoginPage;
