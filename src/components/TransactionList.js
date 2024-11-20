import React, { useContext, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';
import { TransactionsContext } from '../context/TransactionsContext';

const TransactionList = () => {
    const { transactions, dispatch } = useContext(TransactionsContext);
    const { theme } = useContext(ThemeContext); // Access theme context
    const [filterType, setFilterType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Debug: Log transactions
    console.log('Transactions:', transactions);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            console.log('Deleting transaction with ID:', id); // Debug: Log ID
            dispatch({ type: 'DELETE_TRANSACTION', payload: id });
        }
    };

    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (filterType ? transaction.type === filterType : true) &&
            (searchTerm
                ? transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
                : true)
        );
    });

    // Debug: Log filtered transactions
    console.log('Filtered Transactions:', filteredTransactions);

    const isDarkTheme = theme === 'dark';

    return (
        <div className="container mt-5">
            <div
                className="card"
                style={{
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff',
                    color: isDarkTheme ? '#f0f0f0' : '#333333',
                }}
            >
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: isDarkTheme ? '#90caf9' : '#4a90e2',
                        fontWeight: 'bold',
                    }}
                >
                    Transaction History
                </h3>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '15px',
                        marginBottom: '20px',
                    }}
                >
                    <Form.Select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{
                            flex: '1',
                            borderRadius: '8px',
                            padding: '10px',
                            fontSize: '14px',
                            border: isDarkTheme ? '1px solid #555' : '1px solid #ddd',
                            backgroundColor: isDarkTheme ? '#333333' : '#ffffff',
                            color: isDarkTheme ? '#f0f0f0' : '#333333',
                        }}
                    >
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </Form.Select>

                    <Form.Control
                        type="text"
                        placeholder="Search by description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: '2',
                            borderRadius: '8px',
                            padding: '10px',
                            fontSize: '14px',
                            border: isDarkTheme ? '1px solid #555' : '1px solid #ddd',
                            backgroundColor: isDarkTheme ? '#333333' : '#ffffff',
                            color: isDarkTheme ? '#f0f0f0' : '#333333',
                        }}
                    />
                </div>

                <Table
                    striped
                    bordered
                    hover
                    responsive
                    style={{
                        backgroundColor: isDarkTheme ? '#333333' : '#ffffff',
                        color: isDarkTheme ? '#f0f0f0' : '#333333',
                    }}
                >
                    <thead style={{ backgroundColor: isDarkTheme ? '#555555' : '#4a90e2', color: '#ffffff' }}>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td>{index + 1}</td>
                                    <td
                                        style={{
                                            color:
                                                transaction.type === 'income'
                                                    ? '#4caf50'
                                                    : '#f44336',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {transaction.type}
                                    </td>
                                    <td>₹{transaction.amount.toFixed(2)}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.category}</td>
                                    <td>
                                        {new Date(transaction.date).toLocaleDateString()}{' '}
                                        {new Date(transaction.date).toLocaleTimeString()}
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(transaction.id)}
                                            style={{
                                                backgroundColor: '#f44336',
                                                borderColor: '#f44336',
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
                                <td colSpan="7" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionList;
