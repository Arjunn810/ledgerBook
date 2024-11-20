import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
    user: { name: 'John Doe', email: 'john.doe@example.com' }, // Example user data
    transactions: [
        { id: 1, type: 'income', amount: 1000, description: 'Salary', category: 'Work', date: '2024-11-20T00:00:00Z' },
        { id: 2, type: 'expense', amount: 200, description: 'Groceries', category: 'Food', date: '2024-11-21T00:00:00Z' },
    ],
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                user: null, // Clear user data
                transactions: [], // Clear transactions
            };
        default:
            return state;
    }
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
