package com.example.portfolio.controller;

import com.example.portfolio.model.Stock;
import com.example.portfolio.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;

    @PostMapping
    public Stock addStock(@RequestBody Stock stock, @RequestParam Long userId) {
        return stockService.addStock(stock, userId);
    }

    @PutMapping("/{id}")
    public Stock updateStock(@PathVariable Long id, @RequestBody Stock stock, @RequestParam Long userId) {
        return stockService.updateStock(id, stock, userId);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id, @RequestParam Long userId) {
        stockService.deleteStock(id, userId);
    }

    @GetMapping
    public List<Stock> getAllStocks(@RequestParam Long userId) {
        return stockService.getAllStocks(userId);
    }

    @GetMapping("/portfolio/value")
    public double getPortfolioValue(@RequestParam Long userId) {
        return stockService.calculatePortfolioValue(userId);
    }

    @GetMapping("/portfolio/value/realtime")
    public double getRealTimePortfolioValue(@RequestParam Long userId) {
        return stockService.calculatePortfolioValueRealTime(userId);
    }
}