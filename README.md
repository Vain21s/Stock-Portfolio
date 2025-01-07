# STOCKFOLIO - Stock Portfolio Management System

A full-stack application for managing stock portfolios with real-time stock price integration.

## Features

- User authentication and portfolio management
- Real-time stock price tracking using AlphaVantage API
- CRUD operations for stock portfolio management
- Portfolio value calculation (both static and real-time)
- Responsive dashboard with detailed stock analytics
- Docker support for easy deployment

## Tech Stack

### Backend
- Spring Boot
- JPA/Hibernate
- MySQL
- Lombok
- AlphaVantage API integration

### Frontend
- Vite + React
- TailwindCSS
- React Router DOM
- Axios
- Real-time data visualization

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL
- Docker (optional)
- AlphaVantage API key

## Local Setup

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/Vain21s/Stock-Portfolio
cd  /backend
```

2. Configure MySQL database properties in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/stockfolio
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Add AlphaVantage API key in `application.properties`:
```properties
alphavantage.api.key=your_api_key
```

4. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The backend server will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file and add backend URL:
```env
VITE_API_URL=http://localhost:8080
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will start at `http://localhost:5173`

## Docker Deployment

### Backend
```bash
docker pull vain21/stock-portfolio-backend
docker run -p 8080:8080 \
  -e DATASOURCE_URL="your_db_url" \
  -e DATASOURCE_ID="your_db_username" \
  -e DATASOURCE_PASSWORD="your_db_password" \
  -e API_KEY="your_alphavantage_api_key" \
  -e FRONTEND_URL="your_frontend_url" \
  stock-portfolio-backend
```

### Frontend
```bash
docker pull vain21/stock-portfolio-frontend
docker run -p 5173:5173 \
  -e VITE_API_URL="your_backend_url"
```

## API Testing using Postman(Optional) 

### Authentication
```http
POST http://localhost:8080/api/auth/login?username={username}
```

### Stock Management

#### Add Stock
```http
POST http://localhost:8080/api/users/{userId}/stocks
Content-Type: application/json

{
  "name": "Apple Inc",
  "ticker": "AAPL",
  "buyPrice": 150.00,
  "quantity": 10
}
```

#### Get All Stocks
```http
GET http://localhost:8080/api/users/{userId}/stocks
```

#### Update Stock
```http
PUT http://localhost:8080/api/users/{userId}/stocks/{stockId}
Content-Type: application/json

{
  "name": "Updated Apple Inc",
  "ticker": "AAPL",
  "buyPrice": 160.00,
  "quantity": 15
}
```

#### Delete Stock
```http
DELETE http://localhost:8080/api/users/{userId}/stocks/{stockId}
```

#### Get Portfolio Value
```http
GET http://localhost:8080/api/users/{userId}/stocks/portfolio/value
```

#### Get Real-Time Portfolio Value
```http
GET http://localhost:8080/api/users/{userId}/stocks/portfolio/value/realtime
```

## Deployment

- Backend: Hosted on Render
- Database: Aiven MySQL
- Frontend: Hosted on Netlify

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
   
## Limitations
1.Since I have used a Free ALPHAVANTAGE Api it has certain limits for day above which the portfolio metrics will show 0.



