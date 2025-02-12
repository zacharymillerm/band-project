# Dockerfile
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the Next.js application
RUN npm run build

# Start the application
CMD ["npm", "start"]