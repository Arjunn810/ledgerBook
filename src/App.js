import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddTransactionForm from './components/AddTransactionForm';
import Dashboard from './components/Dashboard';
import GoogleSignIn from './components/GoogleSignIn';
import Insights from './components/Insights';
import Navbar from './components/Navbar';
import TransactionList from './components/TransactionList';
import ThemeProvider from './context/ThemeContext';
import { TransactionsProvider } from './context/TransactionsContext';
import { UserProvider } from './context/UserContext';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <ThemeProvider>
            <TransactionsProvider>
                <UserProvider>
                    <Router>
                        {user ? (
                            <>
                                <Navbar handleLogout={handleLogout} />
                                <div style={{ padding: '20px', backgroundColor: '#f4f6f9' }}>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/add" element={<AddTransactionForm />} />
                                        <Route path="/history" element={<TransactionList />} />
                                        <Route path="/insights" element={<Insights />} />
                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                </div>
                            </>
                        ) : (
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <GoogleSignIn
                                            onLoginSuccess={handleLoginSuccess}
                                            onLoginFailure={() => console.log('Google Sign-In Failed')}
                                        />
                                    }
                                />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        )}
                    </Router>
                </UserProvider>
            </TransactionsProvider>
        </ThemeProvider>
    );
};

export default App;
