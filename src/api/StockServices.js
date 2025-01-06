
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, null, {
      params: { username }
    });
    
    if (response.data && response.data.id) {
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('username', response.data.username);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw new Error('Failed to log in');
  }
};

export const fetchStocks = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    const response = await axios.get(`${API_URL}/api/users/${userId}/stocks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw new Error('Failed to fetch stocks');
  }
};

export const addStock = async (stockData) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    const response = await axios.post(
      `${API_URL}/api/users/${userId}/stocks`,
      stockData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding stock:', error.response?.data || error.message);
    throw new Error('Failed to add stock');
  }
};

export const deleteStock = async (stockId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    await axios.delete(`${API_URL}/api/users/${userId}/stocks/${stockId}`);
  } catch (error) {
    console.error('Error deleting stock:', error);
    throw new Error('Failed to delete stock');
  }
};

export const fetchPortfolioValue = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    const response = await axios.get(`${API_URL}/api/users/${userId}/stocks/portfolio/value`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio value:', error);
    throw new Error('Failed to fetch portfolio value');
  }
};

export const fetchRealTimePortfolioValue = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    const response = await axios.get(`${API_URL}/api/users/${userId}/stocks/portfolio/value/realtime`);
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time portfolio value:', error);
    throw new Error('Failed to fetch real-time portfolio value');
  }
};