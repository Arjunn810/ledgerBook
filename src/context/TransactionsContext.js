import React, { createContext, useReducer } from 'react';

// Create the Transactions Context
export const TransactionsContext = createContext();

// Define the Reducer for Transactions
const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return [...state, action.payload];
        default:
            return state;
    }
};

// Create the Provider Component
export const TransactionsProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(transactionsReducer, []);

    return (
        <TransactionsContext.Provider value={{ transactions, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    );
};