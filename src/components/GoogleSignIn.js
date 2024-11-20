import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

const GoogleSignIn = ({ onLoginSuccess, onLoginFailure }) => {
    return (
        <GoogleOAuthProvider clientId="1095614911514-nkasj3atkrildc64vchfulef0k6s5k3f.apps.googleusercontent.com">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#f4f6f9',
                }}
            >
                <h1 style={{ marginBottom: '20px', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                    Welcome to LedgerBook
                </h1>
                <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
                    Please log in with your Google account to continue.
                </p>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log('Login Success:', credentialResponse);
                        onLoginSuccess(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        onLoginFailure();
                    }}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleSignIn;
