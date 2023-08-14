FROM node:18.16.1-alpine
WORKDIR /app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
#npm ci --omit=dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Change the ownership of the /usr/src/app directory to the "node" user
RUN chown -R node:node /app

#RUN npm install -g @nestjs/cli
RUN npm install -g nodemon

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Create /usr/src/app/dist and run the application.
CMD nodemon --watch src --ext ts --legacy-watch --exec "npm run migration:run && npm run start"
