import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddTransactionForm from './components/AddTransactionForm';
import Dashboard from './components/Dashboard';
import GoogleSignIn from './components/GoogleSignIn';
import Insights from './components/Insights';
import Navbar from './components/Navbar';
import TransactionList from './components/TransactionList';
import { TransactionsProvider } from './context/TransactionsContext';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const storedUser = localStorage.getItem('user');
    if (!user && storedUser) {
        setUser(JSON.parse(storedUser));
    }

    return (
        <TransactionsProvider>
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
                            </Routes>
                        </div>
                    </>
                ) : (
                    <GoogleSignIn
                        onLoginSuccess={handleLoginSuccess}
                        onLoginFailure={() => console.log('Google Sign-In Failed')}
                    />
                )}
            </Router>
        </TransactionsProvider>
    );
};

export default App;
