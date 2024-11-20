import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';
import { TransactionsContext } from '../context/TransactionsContext';

const Dashboard = () => {
    const { transactions } = useContext(TransactionsContext);
    const { theme } = useContext(ThemeContext);

    const [budget, setBudget] = useState(0); // Budget goal
    const [spent, setSpent] = useState(0); // Total spent
    const [showModal, setShowModal] = useState(false); // Modal visibility for setting budget
    const [inputBudget, setInputBudget] = useState(''); // Temporary input for budget

    // Calculate total expense
    useEffect(() => {
        const totalExpense = transactions
            .filter((transaction) => transaction.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
        setSpent(totalExpense);
    }, [transactions]);

    const handleSaveBudget = () => {
        if (!inputBudget || isNaN(inputBudget) || parseFloat(inputBudget) <= 0) {
            alert('Please enter a valid budget amount');
            return;
        }
        setBudget(parseFloat(inputBudget));
        setInputBudget('');
        setShowModal(false);
    };

    const progress = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

    return (
        <div
            className="container"
            style={{
                padding: '5%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <div
                className="card"
                style={{
                    padding: '5%',
                    borderRadius: '15px',
                    boxShadow: theme === 'light' ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 6px 12px rgba(255, 255, 255, 0.1)',
                    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
                    color: theme === 'light' ? '#333333' : '#f0f0f0',
                }}
            >
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: theme === 'light' ? '#4a90e2' : '#90caf9',
                        fontWeight: 'bold',
                        fontSize: 'clamp(18px, 4vw, 24px)',
                    }}
                >
                    Dashboard
                </h3>

                <div style={{ marginBottom: '20px' }}>
                    <h5
                        style={{
                            fontWeight: 'bold',
                            color: theme === 'light' ? '#4a90e2' : '#90caf9',
                            fontSize: 'clamp(14px, 3vw, 18px)',
                        }}
                    >
                        Monthly Budget Progress
                    </h5>
                    <ProgressBar
                        now={progress}
                        label={`${progress.toFixed(2)}%`}
                        style={{
                            height: '25px',
                            borderRadius: '12px',
                            marginBottom: '10px',
                            backgroundColor: theme === 'light' ? '#e0e0e0' : '#333333',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <span>Spent: ₹{spent.toFixed(2)}</span>
                        <span>Budget: ₹{budget.toFixed(2) || 'Not Set'}</span>
                    </div>
                </div>

                <Button
                    variant="primary"
                    style={{
                        padding: '10px 20px',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        width: 'fit-content',
                        alignSelf: 'center',
                        backgroundColor: theme === 'light' ? '#4caf50' : '#90caf9',
                        color: '#ffffff',
                        border: 'none',
                        boxShadow: theme === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(255, 255, 255, 0.1)',
                    }}
                    onClick={() => setShowModal(true)}
                >
                    Set Budget
                </Button>
            </div>

            {/* Modal for setting budget */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: theme === 'light' ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 8px 16px rgba(255, 255, 255, 0.1)',
                }}
            >
                <Modal.Header
                    style={{
                        backgroundColor: theme === 'light' ? '#4a90e2' : '#333333',
                        borderBottom: 'none',
                        padding: '25px',
                    }}
                >
                    <Modal.Title
                        style={{
                            fontWeight: 'bold',
                            color: '#ffffff',
                            fontSize: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '1.2px',
                        }}
                    >
                        Set Monthly Budget
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        padding: '30px',
                        backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
                        color: theme === 'light' ? '#333333' : '#f0f0f0',
                    }}
                >
                    <Form>
                        <Form.Group>
                            <Form.Label
                                style={{
                                    fontWeight: 'bold',
                                    color: theme === 'light' ? '#4a90e2' : '#90caf9',
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    marginBottom: '10px',
                                }}
                            >
                                Budget Amount
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter your budget"
                                value={inputBudget}
                                onChange={(e) => setInputBudget(e.target.value)}
                                style={{
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                    backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
                                    color: theme === 'light' ? '#333333' : '#f0f0f0',
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
                        borderTop: 'none',
                        padding: '20px 30px',
                    }}
                >
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        style={{
                            backgroundColor: theme === 'light' ? '#cccccc' : '#555555',
                            color: theme === 'light' ? '#333333' : '#ffffff',
                            padding: '10px 30px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveBudget}
                        style={{
                            backgroundColor: theme === 'light' ? '#4caf50' : '#90caf9',
                            color: '#ffffff',
                            padding: '10px 30px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                        }}
                    >
                        Save Budget
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
