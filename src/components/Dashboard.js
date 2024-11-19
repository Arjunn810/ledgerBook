import React, { useContext } from 'react';
import { FaBalanceScale, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { TransactionsContext } from '../context/TransactionsContext';

const Dashboard = () => {
    const { transactions } = useContext(TransactionsContext);

    // Calculate totals
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    return (
        <div className="container mt-5">
            <div
                className="dashboard"
                style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {/* Total Income Card */}
                <div
                    className="card"
                    style={{
                        flex: '1',
                        minWidth: '250px',
                        padding: '20px',
                        borderRadius: '15px',
                        backgroundColor: '#e0f7fa',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                >
                    <FaDollarSign
                        size={40}
                        style={{ color: '#00796b', marginBottom: '10px' }}
                    />
                    <h4 style={{ color: '#00796b' }}>Total Income</h4>
                    <h2 style={{ color: '#004d40', fontWeight: 'bold' }}>₹{totalIncome}</h2>
                </div>

                {/* Total Expenses Card */}
                <div
                    className="card"
                    style={{
                        flex: '1',
                        minWidth: '250px',
                        padding: '20px',
                        borderRadius: '15px',
                        backgroundColor: '#ffebee',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                >
                    <FaShoppingCart
                        size={40}
                        style={{ color: '#d32f2f', marginBottom: '10px' }}
                    />
                    <h4 style={{ color: '#d32f2f' }}>Total Expenses</h4>
                    <h2 style={{ color: '#b71c1c', fontWeight: 'bold' }}>₹{totalExpenses}</h2>
                </div>

                {/* Net Balance Card */}
                <div
                    className="card"
                    style={{
                        flex: '1',
                        minWidth: '250px',
                        padding: '20px',
                        borderRadius: '15px',
                        backgroundColor: '#e8f5e9',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                >
                    <FaBalanceScale
                        size={40}
                        style={{ color: '#388e3c', marginBottom: '10px' }}
                    />
                    <h4 style={{ color: '#388e3c' }}>Net Balance</h4>
                    <h2
                        style={{
                            color: netBalance >= 0 ? '#1b5e20' : '#b71c1c',
                            fontWeight: 'bold',
                        }}
                    >
                        ₹{netBalance}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
