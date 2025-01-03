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

    // Add a stock to the database
    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    // Update an existing stock
    public Stock updateStock(Long id, Stock stockDetails) {
        Stock stock = stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
        stock.setName(stockDetails.getName());
        stock.setTicker(stockDetails.getTicker());
        stock.setBuyPrice(stockDetails.getBuyPrice());
        stock.setQuantity(stockDetails.getQuantity());
        return stockRepository.save(stock);
    }

    // Delete a stock from the database
    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    // Retrieve all stocks
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    // Calculate portfolio value based on stored data
    public double calculatePortfolioValue() {
        List<Stock> stocks = stockRepository.findAll();
        return stocks.stream()
                .mapToDouble(stock -> stock.getBuyPrice() * stock.getQuantity())
                .sum();
    }

    // Calculate real-time portfolio value using random stocks
    public double calculatePortfolioValueRealTime() {
        // Fetch 5 random stocks
        List<String> randomTickers = getRandomStockTickers();

        // Calculate the total portfolio value
        return randomTickers.stream()
                .mapToDouble(ticker -> stockPriceService.getStockPrice(ticker))
                .sum();
    }

    // Generate 5 random stock tickers for the portfolio
    private List<String> getRandomStockTickers() {
        String[] allTickers = {"AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "FB", "NFLX", "NVDA", "BABA", "INTC"};
        Random random = new Random();
        return random.ints(0, allTickers.length)
                .distinct()
                .limit(5)
                .mapToObj(i -> allTickers[i])
                .collect(Collectors.toList());
    }
}