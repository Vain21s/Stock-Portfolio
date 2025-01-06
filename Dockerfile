# Step 1: Build the frontend
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the frontend application
RUN npm run build

# Step 2: Serve the frontend app with a static server
FROM nginx:alpine

# Copy the build files to Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
