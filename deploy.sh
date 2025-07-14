#!/bin/bash

# Exit on error
set -e

# Pull latest code
git pull

# Install dependencies
pnpm install


# Stop and delete only the VA-Production pm2 process
pm2 stop VA-Production || true
pm2 delete VA-Production || true

# Build the app
pnpm run build

# Start the app with pm2 using ecosystem config
pm2 stop VA-Production || true
pm2 delete VA-Production || true
pm2 start ecosystem.config.js
