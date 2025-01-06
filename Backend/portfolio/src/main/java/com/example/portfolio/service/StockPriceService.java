package com.example.portfolio.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.annotation.JsonProperty;

@Service
public class StockPriceService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey;

    private static final String API_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s";

    public double getStockPrice(String ticker) {
        String url = String.format(API_URL, ticker, apiKey);
        RestTemplate restTemplate = new RestTemplate();
        try {
            StockApiResponse response = restTemplate.getForObject(url, StockApiResponse.class);
            if (response != null && response.getGlobalQuote() != null) {
                return response.getGlobalQuote().getPrice();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch stock price for ticker: " + ticker, e);
        }
        return 0.0;
    }

    // Inner classes to map API response
    public static class StockApiResponse {
        @JsonProperty("Global Quote")
        private GlobalQuote globalQuote;

        public GlobalQuote getGlobalQuote() {
            return globalQuote;
        }

        public void setGlobalQuote(GlobalQuote globalQuote) {
            this.globalQuote = globalQuote;
        }
    }

    public static class GlobalQuote {
        @JsonProperty("05. price")
        private double price;

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}