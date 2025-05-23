# Use Node.js 22 base image
FROM node:22

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose API port
EXPOSE 4000

# Start the API service
CMD ["npm", "run", "dev"]
