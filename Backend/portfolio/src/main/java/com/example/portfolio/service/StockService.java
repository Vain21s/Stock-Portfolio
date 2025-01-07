package com.example.portfolio.service;

import com.example.portfolio.model.Stock;
import com.example.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    public Stock addStock(Stock stock, Long userId) {
        stock.setUserId(userId); // Very Important: Set the userId on the stock
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock stockDetails, Long userId) {
        Optional<Stock> optionalStock = stockRepository.findById(id);
        if (optionalStock.isEmpty()) {
            throw new NoSuchElementException("Stock not found");
        }
        Stock stock = optionalStock.get();

        if (!stock.getUserId().equals(userId)) {
            throw new NoSuchElementException("Unauthorized access to stock"); // More specific exception
        }

        stock.setName(stockDetails.getName());
        stock.setTicker(stockDetails.getTicker());
        stock.setBuyPrice(stockDetails.getBuyPrice());
        stock.setQuantity(stockDetails.getQuantity());
        return stockRepository.save(stock);
    }

    public void deleteStock(Long id, Long userId) {
        Optional<Stock> optionalStock = stockRepository.findById(id);
        if (optionalStock.isEmpty()) {
            throw new NoSuchElementException("Stock not found");
        }
        Stock stock = optionalStock.get();
        if (!stock.getUserId().equals(userId)) {
            throw new NoSuchElementException("Unauthorized access to stock");
        }
        stockRepository.delete(stock); // Better to delete the entity
    }

    public List<Stock> getAllStocks(Long userId) {
        return stockRepository.findByUserId(userId);
    }

    public double calculatePortfolioValue(Long userId) {
        List<Stock> stocks = stockRepository.findByUserId(userId);
        return stocks.stream().mapToDouble(stock -> stock.getBuyPrice() * stock.getQuantity()).sum();
    }

    public double calculatePortfolioValueRealTime(Long userId) {
        List<Stock> stocks = stockRepository.findByUserId(userId);
        return stocks.stream().mapToDouble(stock -> stockPriceService.getStockPrice(stock.getTicker()) * stock.getQuantity()).sum();
    }
}