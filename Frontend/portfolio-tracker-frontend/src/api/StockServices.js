import axios from 'axios';

const API_URL = 'http://localhost:8080/stocks';

// Fetch stocks
export const fetchStocks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched Stocks:', response.data);  // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw new Error('Failed to fetch stocks');
  }
};

// Add a new stock
export const addStock = async (stock) => {
  try {
    const response = await axios.post(API_URL, stock);
    console.log('Added Stock:', response.data);  // Log the response data
  } catch (error) {
    console.error('Error adding stock:', error);
    throw new Error('Failed to add stock');
  }
};

// Update an existing stock
export const updateStock = async (id, stock) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, stock);
    console.log('Updated Stock:', response.data);  // Log the response data
  } catch (error) {
    console.error('Error updating stock:', error);
    throw new Error('Failed to update stock');
  }
};

// Delete a stock
export const deleteStock = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Deleted Stock:', response.data);  // Log the response data
  } catch (error) {
    console.error('Error deleting stock:', error);
    throw new Error('Failed to delete stock');
  }
};

// Fetch portfolio value
export const fetchPortfolioValue = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolio/value`);
    console.log('Portfolio Value:', response.data);  // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio value:', error);
    throw new Error('Failed to fetch portfolio value');
  }
};

// Fetch real-time portfolio value
export const fetchRealTimePortfolioValue = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolio/value/realtime`);
    console.log('Real-Time Portfolio Value:', response.data);  // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time portfolio value:', error);
    throw new Error('Failed to fetch real-time portfolio value');
  }
};
