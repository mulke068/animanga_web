
FROM node:21.6.2-alpine3.18
# Use node 16 as the base image
# FROM node:18.15.0-alpine3.17
# FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /web

# Install git (if needed for your project)
RUN apk update && apk upgrade && apk add --no-cache git

# Copy package.json and package-lock.json (if available)
COPY ./package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Build the Nuxt.js application
RUN npm run build

ENV PATH ./node_modules/.bin:$PATH

# Expose the port on which the Nuxt.js application will run
# EXPOSE 3000

# Command to run the Nuxt.js application
#CMD ["node", ".output/server/index.mjs"]