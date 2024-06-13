# Use the official Node.js image as the base image
# FROM node:18-bullseye-slim
FROM oven/bun

# Install necessary system dependencies for Puppeteer
RUN apt-get update && apt-get install -y wget gnupg ca-certificates

# Add the signing key for the Chromium package and set up the repository
RUN wget -qO - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Install Chromium
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends

# Clean up the package list to reduce the image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install curl
RUN apt-get update && apt-get install -y curl

# Install Bun
# RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
# ENV PATH="/root/.bun/bin:$PATH"

# Verify Bun installation (optional step for debugging)
RUN bun --version

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb
COPY package.json bun.lockb ./

# Install project dependencies using Bun
RUN bun install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on (adjust if necessary)
ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 9400
