# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use an official Nginx image to serve the built application
FROM nginx:alpine

# Copy the built application from the build stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]