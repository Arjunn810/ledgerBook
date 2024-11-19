// src/components/TransactionList.js
import React, { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { TransactionsContext } from '../context/TransactionsContext';

const TransactionList = () => {
    const { transactions } = useContext(TransactionsContext);

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
                `₹{new Date(transaction.date).toLocaleDateString()} ₹{new Date(transaction.date).toLocaleTimeString()}`,
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

    return (
        <div className="container mt-5">
            <div className="card" style={{ padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ textAlign: 'center', color: '#4a90e2' }}>Payment History</h3>
                    <Button onClick={exportToCSV} variant="success" style={{ padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
                        Export as CSV
                    </Button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <Table bordered hover responsive style={{ margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', borderSpacing: '0 10px', borderCollapse: 'separate' }}>
                        <thead style={{ backgroundColor: '#4a90e2', color: '#fff' }}>
                            <tr style={{ textAlign: 'center' }}>
                                <th style={{ padding: '10px 20px' }}>#</th>
                                <th style={{ padding: '10px 20px' }}>Type</th>
                                <th style={{ padding: '10px 20px' }}>Amount</th>
                                <th style={{ padding: '10px 20px' }}>Description</th>
                                <th style={{ padding: '10px 20px' }}>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr key={index} style={{ textAlign: 'center', backgroundColor: '#f9f9f9', marginBottom: '10px' }}>
                                        <td style={{ padding: '10px 20px' }}>{index + 1}</td>
                                        <td style={{ padding: '10px 20px' }}>{transaction.type}</td>
                                        <td style={{ padding: '10px 20px', color: transaction.type === 'income' ? '#4caf50' : '#f44336' }}>
                                            ₹{transaction.amount.toFixed(2)}
                                        </td>
                                        <td style={{ padding: '10px 20px' }}>{transaction.description || 'N/A'}</td>
                                        <td style={{ padding: '10px 20px' }}>
                                            {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', color: '#f44336', padding: '10px 20px' }}>
                                        No Transactions Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
