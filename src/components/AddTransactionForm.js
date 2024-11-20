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
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrence, setRecurrence] = useState('daily');
    const [errors, setErrors] = useState({});

    const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Others'];

    const validateForm = () => {
        const newErrors = {};
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            newErrors.amount = 'Please enter a valid positive amount.';
        }
        if (!description || description.trim().length < 3) {
            newErrors.description = 'Description must be at least 3 characters.';
        }
        if (!category) {
            newErrors.category = 'Please select a category.';
        }
        if (category === 'Others' && !customCategory.trim()) {
            newErrors.customCategory = 'Please specify a custom category.';
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
        resetForm();
    };

    const resetForm = () => {
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
                    backgroundColor: '#ffffff',
                }}
            >
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: '#4a90e2',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                    }}
                >
                    Add a New Transaction
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2' }}>Type</Form.Label>
                        <Form.Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                            }}
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2' }}>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            isInvalid={!!errors.amount}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                            }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2' }}>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            isInvalid={!!errors.description}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                            }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2' }}>Category</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            isInvalid={!!errors.category}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                            }}
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                        {category === 'Others' && (
                            <Form.Control
                                type="text"
                                placeholder="Specify custom category"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                isInvalid={!!errors.customCategory}
                                className="mt-2"
                                style={{
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '1px solid #ddd',
                                }}
                            />
                        )}
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                        {errors.customCategory && (
                            <Form.Text className="text-danger">{errors.customCategory}</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: '#4a90e2' }}>
                            Date & Time
                        </Form.Label>
                        <DatePicker
                            selected={transactionDate}
                            onChange={(date) => setTransactionDate(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            className="form-control"
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Check
                            type="checkbox"
                            label="Is this a recurring transaction?"
                            checked={isRecurring}
                            onChange={(e) => setIsRecurring(e.target.checked)}
                            style={{
                                fontWeight: 'bold',
                                color: '#4a90e2',
                                fontSize: '16px',
                            }}
                        />
                        {isRecurring && (
                            <Form.Select
                                value={recurrence}
                                onChange={(e) => setRecurrence(e.target.value)}
                                style={{
                                    marginTop: '10px',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '1px solid #ddd',
                                }}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </Form.Select>
                        )}
                    </Form.Group>

                    <Button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '18px',
                            borderRadius: '10px',
                            backgroundColor: '#4a90e2',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            border: 'none',
                        }}
                    >
                        Add Transaction
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddTransactionForm;
