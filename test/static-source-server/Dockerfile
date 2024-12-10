FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm install

# Copy the rest of the app
COPY . .

# Expose the app's port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]