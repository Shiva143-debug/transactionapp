import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(`${API_URL}/transactions`, transaction);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTransaction = async (id, transaction) => {
    try {
        const response = await axios.put(`${API_URL}/transactions/${id}`, transaction);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTransaction = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/transactions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
