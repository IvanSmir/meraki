# Meraki

Meraki is a full-stack web application built with React and Node.js, designed to help seamstresses manage their contacts and clothing items efficiently.

## Features

- React 18 for building user interfaces
- Vite as the build tool for fast development and optimized production builds
- Material-UI (MUI) for pre-built React components and icons
- React Router for client-side routing
- Axios for making HTTP requests
- Form validation with Yup
- ESLint for code linting
- Express.js backend API
- MongoDB database for data storage
- Firebase for image storage

## Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (usually comes with Node.js)
- MongoDB (installed and running)
- Firebase account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/IvanSmir/meraki.git
cd meraki
```

2. Install dependencies for both client and server:

```bash
cd client && npm install
cd ../server && npm install
```

## Environment Setup

Set up environment variables:
   - Copy `.env.example` to `.env` in the client directory
   - Copy `.env.example` to `.env` in the server directory
   - Fill in the required details in both files

## Development

To start the development servers:

1. Start the backend server:

```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend development server:

```bash
cd client
npm run dev
```

The React app will be available at `http://localhost:5173` and the API at `http://localhost:3000`.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
