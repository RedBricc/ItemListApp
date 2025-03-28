# Item List App

A simple React application that allows you to add items to a list, copy them by clicking, and delete them. Built with React, TypeScript, and Vite.

## Features

- Create new lists
- Add items to a list
- Copy items by clicking on them
- Delete items with a single click
- Persistent storage using localStorage
- Modern, responsive UI
- Hot reloading for development

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Docker (optional)

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Running with Docker

```bash
# Build the image
docker build -t item-list-app .

# Run the container
docker run -p 80:80 item-list-app
```