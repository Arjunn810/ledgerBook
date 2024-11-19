import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

const GoogleSignIn = ({ onLoginSuccess, onLoginFailure }) => {
    return (
        <GoogleOAuthProvider clientId="1095614911514-nkasj3atkrildc64vchfulef0k6s5k3f.apps.googleusercontent.com">
            <div className="google-signin-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2 style={{ color: '#4a90e2' }}>Sign In to LedgerBook</h2>
                <GoogleLogin
                    onSuccess={(response) => {
                        console.log('Login Success:', response);
                        onLoginSuccess(response);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        onLoginFailure();
                    }}
                    useOneTap
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleSignIn;
