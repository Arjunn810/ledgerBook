import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer } from 'react';

export const TransactionsContext = createContext();

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            const updatedState = [...state, action.payload];
            AsyncStorage.setItem('transactions', JSON.stringify(updatedState));
            return updatedState;
        case 'DELETE_TRANSACTION':
            const filteredState = state.filter(t => t.id !== action.payload);
            AsyncStorage.setItem('transactions', JSON.stringify(filteredState));
            return filteredState;
        default:
            return state;
    }
};

export const TransactionsProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(transactionsReducer, []);

    useEffect(() => {
        const loadTransactions = async () => {
            const storedTransactions = await AsyncStorage.getItem('transactions');
            if (storedTransactions) {
                dispatch({ type: 'INIT', payload: JSON.parse(storedTransactions) });
            }
        };
        loadTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    );
};
