# Base layer
FROM node:13

# Working directory
WORKDIR /tmp
# Copy all files from root, exept dockerignored
COPY . /tmp
# Install required dependencies, results in /node_modules directory is created
# Set registry for fastening installation
RUN npm config set registry http://registry.npmjs.org/ && npm ci
# Production build
RUN npm run build

# Move necessary files in app folder
WORKDIR /app

COPY . /app
COPY package.json /app
RUN cp -a /tmp/node_modules /app
RUN cp -a /tmp/server /app
RUN cp -a /tmp/dist /app

# Set up environment variables which are required for static server
ENV NODE_ENV=production
ENV PORT=80

# Container will be available at port 80
EXPOSE 80

# Server serves static files from /dist
CMD npm run start:prod
