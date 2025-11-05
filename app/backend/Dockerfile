# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install deps first (better layer caching)
COPY package*.json ./
# Use npm ci if you have package-lock.json
RUN npm ci || npm install

# Copy source
COPY . .

# Environment (optional, Compose can also set it)
ENV NODE_ENV=development

# Expose the backend port your app actually uses
EXPOSE 5000

# Default command (dev: nodemon). If you don't have a "dev" script, keep "start".
CMD ["npm", "run", "dev"]

