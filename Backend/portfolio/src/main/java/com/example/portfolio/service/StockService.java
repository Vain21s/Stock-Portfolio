package com.example.portfolio.service;

import com.example.portfolio.model.Stock;
import com.example.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    public Stock addStock(Stock stock, Long userId) {
        stock.setUserId(userId);
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock stockDetails, Long userId) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        if (!stock.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to stock");
        }

        stock.setName(stockDetails.getName());
        stock.setTicker(stockDetails.getTicker());
        stock.setBuyPrice(stockDetails.getBuyPrice());
        stock.setQuantity(stockDetails.getQuantity());
        return stockRepository.save(stock);
    }

    public void deleteStock(Long id, Long userId) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        if (!stock.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to stock");
        }

        stockRepository.deleteById(id);
    }

    public List<Stock> getAllStocks(Long userId) {
        return stockRepository.findByUserId(userId);
    }

    public double calculatePortfolioValue(Long userId) {
        List<Stock> stocks = stockRepository.findByUserId(userId);
        return stocks.stream()
                .mapToDouble(stock -> stock.getBuyPrice() * stock.getQuantity())
                .sum();
    }

    public double calculatePortfolioValueRealTime(Long userId) {
        List<Stock> stocks = stockRepository.findByUserId(userId);
        return stocks.stream()
                .mapToDouble(stock -> stockPriceService.getStockPrice(stock.getTicker()) * stock.getQuantity())
                .sum();
    }
}