import { Chart as ChartJS, registerables } from 'chart.js';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { TransactionsContext } from '../context/TransactionsContext';

// Register all Chart.js components
ChartJS.register(...registerables);

const Insights = () => {
    const { transactions } = useContext(TransactionsContext);

    const incomeData = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expenseData = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const categoryData = transactions.reduce((acc, curr) => {
        const category = curr.category || 'Others';
        acc[category] = (acc[category] || 0) + curr.amount;
        return acc;
    }, {});

    const monthlyTrends = transactions.reduce((acc, curr) => {
        const date = new Date(curr.date);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        acc[month] = acc[month] || { income: 0, expense: 0 };
        acc[month][curr.type] += curr.amount;
        return acc;
    }, {});

    const trendLabels = Object.keys(monthlyTrends).sort();
    const trendIncome = trendLabels.map((month) => monthlyTrends[month].income);
    const trendExpense = trendLabels.map((month) => monthlyTrends[month].expense);

    const colors = ['#4caf50', '#f44336', '#ff9800', '#2196f3', '#9c27b0', '#673ab7'];
    const backgroundColors = Object.keys(categoryData).map(
        (_, index) => colors[index % colors.length]
    );

    const handleExport = () => {
        const csvData = Object.keys(categoryData)
            .map((key) => `${key},${categoryData[key]}`)
            .join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'insights.csv';
        link.click();
    };

    return (
        <div className="container mt-5">
            <div
                className="card"
                style={{
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        color: '#4a90e2',
                        fontWeight: 'bold',
                        letterSpacing: '1.2px',
                    }}
                >
                    Insights
                </h3>
                <Button
                    onClick={handleExport}
                    style={{
                        backgroundColor: '#4caf50',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                    }}
                >
                    Export as CSV
                </Button>
                <div style={{ marginBottom: '40px', height: '250px', width: '100%' }}>
                    <h5 style={{ color: '#4a90e2', fontWeight: 'bold' }}>Category-Wise Breakdown</h5>
                    <Pie
                        data={{
                            labels: Object.keys(categoryData),
                            datasets: [
                                {
                                    data: Object.values(categoryData),
                                    backgroundColor: backgroundColors,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        font: { size: 12, family: 'Roboto' },
                                        color: '#4a90e2',
                                    },
                                },
                            },
                        }}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '40px', height: '250px', width: '100%' }}>
                    <h5 style={{ color: '#4a90e2', fontWeight: 'bold' }}>Monthly Trends</h5>
                    <Line
                        data={{
                            labels: trendLabels,
                            datasets: [
                                {
                                    label: 'Income',
                                    data: trendIncome,
                                    borderColor: '#4caf50',
                                    fill: false,
                                },
                                {
                                    label: 'Expense',
                                    data: trendExpense,
                                    borderColor: '#f44336',
                                    fill: false,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: { mode: 'index', intersect: false },
                            },
                            animation: {
                                duration: 1000,
                                easing: 'easeOutQuart',
                            },
                        }}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '40px', height: '250px', width: '100%' }}>
                    <h5 style={{ color: '#4a90e2', fontWeight: 'bold' }}>Income vs Expense</h5>
                    <Bar
                        data={{
                            labels: ['Income', 'Expense'],
                            datasets: [
                                {
                                    label: 'Amount',
                                    data: [incomeData, expenseData],
                                    backgroundColor: ['#4caf50', '#f44336'],
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { display: false },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        font: {
                                            size: 12,
                                        },
                                    },
                                },
                                x: {
                                    ticks: {
                                        font: {
                                            size: 12,
                                        },
                                    },
                                },
                            },
                            animation: {
                                duration: 1000,
                                easing: 'easeOutQuart',
                            },
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Insights;
