#!/bin/sh
# start.sh

# Start the application
npm run dev &

# Store the background process ID
PID=$!

# Function to handle SIGTERM
handle_sigterm() {
    echo "Received SIGTERM. Shutting down gracefully..."
    kill $PID
    exit 0
}

# Trap SIGTERM
trap handle_sigterm SIGTERM

# Wait for the background process
wait $PID