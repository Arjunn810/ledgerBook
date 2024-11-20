import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = ({ handleLogout }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <BootstrapNavbar
            expand="lg"
            style={{
                backgroundColor: theme === 'light' ? '#3f51b5' : '#333',
                padding: '15px 20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <BootstrapNavbar.Brand
                as={Link}
                to="/"
                style={{
                    color: theme === 'light' ? '#ffffff' : '#f0f0f0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    letterSpacing: '1px',
                }}
            >
                LedgerBook
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link
                        as={Link}
                        to="/"
                        style={{
                            color: theme === 'light' ? '#ffffff' : '#f0f0f0',
                            margin: '0 15px',
                            fontSize: '18px',
                            textTransform: 'capitalize',
                        }}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/add"
                        style={{
                            color: theme === 'light' ? '#ffffff' : '#f0f0f0',
                            margin: '0 15px',
                            fontSize: '18px',
                            textTransform: 'capitalize',
                        }}
                    >
                        Add Transaction
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/history"
                        style={{
                            color: theme === 'light' ? '#ffffff' : '#f0f0f0',
                            margin: '0 15px',
                            fontSize: '18px',
                            textTransform: 'capitalize',
                        }}
                    >
                        History
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/insights"
                        style={{
                            color: theme === 'light' ? '#ffffff' : '#f0f0f0',
                            margin: '0 15px',
                            fontSize: '18px',
                            textTransform: 'capitalize',
                        }}
                    >
                        Insights
                    </Nav.Link>
                    <button
                        onClick={toggleTheme}
                        style={{
                            backgroundColor: theme === 'light' ? '#4caf50' : '#555',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            marginLeft: '15px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: theme === 'light' ? '#f44336' : '#b71c1c',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            marginLeft: '15px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        Logout
                    </button>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
