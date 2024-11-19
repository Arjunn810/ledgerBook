// src/components/TransactionList.js
import React, { useContext, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { TransactionsContext } from '../context/TransactionsContext';

const TransactionList = () => {
    const { transactions, dispatch } = useContext(TransactionsContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);

    const exportToCSV = () => {
        const csvRows = [];
        const headers = ['#', 'Type', 'Amount', 'Description', 'Date & Time'];
        csvRows.push(headers.join(','));

        transactions.forEach((transaction, index) => {
            const row = [
                index + 1,
                transaction.type,
                transaction.amount.toFixed(2),
                transaction.description || 'N/A',
                `${new Date(transaction.date).toLocaleDateString()} ${new Date(
                    transaction.date
                ).toLocaleTimeString()}`,
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDelete = () => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: selectedTransactionId });
        setSelectedTransactionId(null);
        setShowConfirm(false);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '100%' }}>
            <div
                className="card"
                style={{
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '5px',
                        borderRadius: '5px',
                        flexWrap: 'wrap',
                    }}
                >
                    <h4 style={{ color: '#4a90e2', fontWeight: 'bold' }}>Payment History</h4>
                    <Button
                        onClick={exportToCSV}
                        variant="success"
                        style={{
                            padding: '10px 20px',
                            fontSize: '14px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Export as CSV
                    </Button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <Table
                        bordered
                        hover
                        responsive
                        style={{
                            margin: '0 auto',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            borderSpacing: '0',
                            borderCollapse: 'collapse',
                        }}
                    >
                        <thead style={{ backgroundColor: '#4a90e2', color: '#ffffff' }}>
                            <tr>
                                <th style={{ padding: '12px', textAlign: 'center' }}>#</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Type</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Amount</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Description</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Date & Time</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <td style={{ padding: '12px' }}>{index + 1}</td>
                                        <td style={{ padding: '12px' }}>{transaction.type}</td>
                                        <td
                                            style={{
                                                padding: '12px',
                                                color: transaction.type === 'income' ? '#4caf50' : '#f44336',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ₹{transaction.amount.toFixed(2)}
                                        </td>
                                        <td style={{ padding: '12px' }}>{transaction.description || 'N/A'}</td>
                                        <td style={{ padding: '12px' }}>
                                            {new Date(transaction.date).toLocaleDateString()}{' '}
                                            {new Date(transaction.date).toLocaleTimeString()}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedTransactionId(transaction.id);
                                                    setShowConfirm(true);
                                                }}
                                                style={{
                                                    borderRadius: '8px',
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: 'center',
                                            color: '#f44336',
                                            fontWeight: 'bold',
                                            padding: '5px',
                                        }}
                                    >
                                        No Transactions Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                centered
                style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                <Modal.Header>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        Confirm Deletion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '16px' }}>
                    Are you sure you want to delete this transaction? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirm(false)}
                        style={{
                            padding: '5px 5px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        style={{
                            padding: '5px 5px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TransactionList;
