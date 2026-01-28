# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend files
COPY . .

# Expose the port your app runs on
EXPOSE 1337

# Start the server
CMD ["node", "main.js"]
