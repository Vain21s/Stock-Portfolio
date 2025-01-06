package com.example.portfolio.controller;

import com.example.portfolio.model.Stock;
import com.example.portfolio.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/users/{userId}/stocks") // Base path now includes userId
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping
    public ResponseEntity<Stock> addStock(@PathVariable Long userId, @RequestBody Stock stock) {
        Stock addedStock = stockService.addStock(stock, userId);
        return new ResponseEntity<>(addedStock, HttpStatus.CREATED); // Return 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long userId, @PathVariable Long id, @RequestBody Stock stock) {
        try {
            Stock updatedStock = stockService.updateStock(id, stock, userId);
            return ResponseEntity.ok(updatedStock);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long userId, @PathVariable Long id) {
        try {
            stockService.deleteStock(id, userId);
            return ResponseEntity.noContent().build(); // Return 204 No Content
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks(@PathVariable Long userId) {
        List<Stock> stocks = stockService.getAllStocks(userId);
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/portfolio/value")
    public ResponseEntity<Double> getPortfolioValue(@PathVariable Long userId) {
        double portfolioValue = stockService.calculatePortfolioValue(userId);
        return ResponseEntity.ok(portfolioValue);
    }

    @GetMapping("/portfolio/value/realtime")
    public ResponseEntity<Double> getRealTimePortfolioValue(@PathVariable Long userId) {
        double realTimePortfolioValue = stockService.calculatePortfolioValueRealTime(userId);
        return ResponseEntity.ok(realTimePortfolioValue);
    }
}