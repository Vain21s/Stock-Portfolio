import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Ensure this import works after installing icons
import { deleteStock } from '../api/StockServices'; // Correct path

const StockList = ({ stocks, fetchStocks }) => {
  const handleDelete = async (id) => {
    await deleteStock(id);
    fetchStocks();
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <List>
        {stocks.map(stock => (
          <ListItem key={stock.id}>
            <ListItemText primary={`${stock.name} - ${stock.ticker}`} secondary={`Quantity: ${stock.quantity}, Buy Price: $${stock.buyPrice}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(stock.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default StockList;
