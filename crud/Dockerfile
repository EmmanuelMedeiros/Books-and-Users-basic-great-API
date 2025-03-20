# Use a valid Node.js version
FROM node:20-alpine

# Set the working directory
WORKDIR /my-app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 4000

# Build the application
RUN npx run build

# Run the application
CMD ["npm", "run", "start:prod"]