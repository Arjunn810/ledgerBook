import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
    return (
        <BootstrapNavbar style={{ backgroundColor: '#4a90e2', padding: '10px 20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <BootstrapNavbar.Brand
                as={Link}
                to="/"
                style={{
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                }}
            >
                LedgerBook
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" style={{ color: '#fff', margin: '0 10px', fontSize: '18px' }}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/add" style={{ color: '#fff', margin: '0 10px', fontSize: '18px' }}>
                        Add Transaction
                    </Nav.Link>
                    <Nav.Link as={Link} to="/history" style={{ color: '#fff', margin: '0 10px', fontSize: '18px' }}>
                        History
                    </Nav.Link>
                    <Nav.Link as={Link} to="/insights" style={{ color: '#fff', margin: '0 10px', fontSize: '18px' }}>
                        Insights
                    </Nav.Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#f44336',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            marginLeft: '10px',
                            cursor: 'pointer',
                            fontSize: '16px',
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
