import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { TransactionsContext } from '../context/TransactionsContext';

const Dashboard = () => {
    const { transactions } = useContext(TransactionsContext);
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
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: '#4a90e2',
                        fontWeight: 'bold',
                        fontSize: 'clamp(18px, 4vw, 24px)',
                    }}
                >
                    Dashboard
                </h3>

                <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: 'clamp(14px, 3vw, 18px)' }}>
                        Monthly Budget Progress
                    </h5>
                    <ProgressBar
                        now={progress}
                        label={`${progress.toFixed(2)}%`}
                        style={{
                            height: '25px',
                            borderRadius: '12px',
                            marginBottom: '10px',
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
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Modal.Header
                    style={{
                        backgroundColor: '#4a90e2',
                        borderBottom: 'none',
                        padding: '25px',
                    }}
                >
                    <Modal.Title
                        style={{
                            fontWeight: 'bold',
                            color: '#fff',
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
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Form>
                        <Form.Group>
                            <Form.Label
                                style={{
                                    fontWeight: 'bold',
                                    color: '#4a90e2',
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
                                    backgroundColor: '#ffffff',
                                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: '#f9f9f9',
                        borderTop: 'none',
                        padding: '20px 30px',
                    }}
                >
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        style={{
                            backgroundColor: '#cccccc',
                            color: '#333333',
                            padding: '10px 30px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveBudget}
                        style={{
                            backgroundColor: '#4a90e2',
                            color: '#ffffff',
                            padding: '10px 30px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
