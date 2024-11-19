import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TransactionsContext } from '../context/TransactionsContext';

const AddTransactionForm = () => {
    const { dispatch } = useContext(TransactionsContext);
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrence, setRecurrence] = useState('daily');
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [errors, setErrors] = useState({});

    const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Others'];

    const validateForm = () => {
        const newErrors = {};
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            newErrors.amount = 'Please enter a valid positive amount';
        }
        if (!description || description.trim().length < 3) {
            newErrors.description = 'Description must be at least 3 characters';
        }
        if (!category) {
            newErrors.category = 'Please select a category';
        }
        if (category === 'Others' && !customCategory.trim()) {
            newErrors.customCategory = 'Please specify a custom category';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newTransaction = {
            type,
            amount: parseFloat(amount),
            description,
            category: category === 'Others' ? customCategory : category,
            isRecurring,
            recurrence: isRecurring ? recurrence : null,
            date: transactionDate.toISOString(),
        };

        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        setAmount('');
        setDescription('');
        setCategory('');
        setCustomCategory('');
        setIsRecurring(false);
        setRecurrence('daily');
        setTransactionDate(new Date());
        setErrors({});
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
                        marginBottom: '15px',
                        color: '#4a90e2',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                    }}
                >
                    Add a New Transaction
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: '18px' }}>
                            Type
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                padding: '4%',
                                fontSize: 'clamp(14px, 4vw, 18px)',
                                marginBottom: '5%',
                                border: '1px solid #ddd',
                            }}
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: '18px' }}>
                            Amount
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                padding: '4%',
                                fontSize: 'clamp(14px, 4vw, 18px)',
                                marginBottom: '5%',
                                border: '1px solid #ddd',
                            }}
                        />
                        {errors.amount && (
                            <Form.Text className="text-danger">{errors.amount}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: '18px' }}>
                            Description
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            isInvalid={!!errors.description}
                            style={{
                                marginBottom: '10px',
                                borderRadius: '12px',
                                padding: '12px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                backgroundColor: '#ffffff',
                            }}
                        />
                        {errors.description && (
                            <Form.Text className="text-danger">{errors.description}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: '18px' }}>
                            Category
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            isInvalid={!!errors.category}
                            style={{
                                marginBottom: '10px',
                                borderRadius: '12px',
                                padding: '12px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <option value="">Select a Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Control>
                        {category === 'Others' && (
                            <Form.Control
                                type="text"
                                placeholder="Specify custom category"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                isInvalid={!!errors.customCategory}
                                style={{
                                    marginTop: '10px',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ffffff',
                                }}
                            />
                        )}
                        {errors.category && (
                            <Form.Text className="text-danger">{errors.category}</Form.Text>
                        )}
                        {errors.customCategory && (
                            <Form.Text className="text-danger">{errors.customCategory}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: '18px' }}>
                            Date & Time
                        </Form.Label>
                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                            <DatePicker
                                selected={transactionDate}
                                onChange={(date) => setTransactionDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="form-control"
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    padding: '4%',
                                    fontSize: 'clamp(14px, 4vw, 18px)',
                                    marginBottom: '5%',
                                    border: '1px solid #ddd',
                                }}
                            />
                        </div>
                        {errors.transactionDate && (
                            <Form.Text className="text-danger">{errors.transactionDate}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Check
                            type="checkbox"
                            label="Is this a recurring transaction?"
                            checked={isRecurring}
                            onChange={(e) => setIsRecurring(e.target.checked)}
                            style={{ fontWeight: 'bold', color: '#4a90e2', fontSize: '16px' }}
                        />
                        {isRecurring && (
                            <Form.Control
                                as="select"
                                value={recurrence}
                                onChange={(e) => setRecurrence(e.target.value)}
                                style={{
                                    marginBottom: '15px',
                                    marginTop: '10px',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </Form.Control>
                        )}
                    </Form.Group>
                    <Button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '4%',
                            fontSize: 'clamp(16px, 5vw, 20px)',
                            borderRadius: '10px',
                            backgroundColor: '#4a90e2',
                            color: '#fff',
                            fontWeight: 'bold',
                            border: 'none',
                            marginTop: '20px',
                        }}
                    >
                        ADD TRANSACTION
                    </Button>
                </Form>
            </div>
        </div >
    );
};

export default AddTransactionForm;
