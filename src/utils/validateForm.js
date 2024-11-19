export const validateTransaction = ({ amount }) => {
    if (!amount || isNaN(amount)) {
        return 'Please enter a valid amount.';
    }
    return null;
};
