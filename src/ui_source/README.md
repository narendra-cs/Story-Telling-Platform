# Story Telling Platform - Frontend

This is the frontend for the Story Telling Platform, built with React, Material-UI, and Vite.

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later) or yarn

## Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Story-Telling-Platform/src/ui_source
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn
   ```

3. **Create a `.env` file** in the `ui_source` directory with your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at [http://localhost:8080](http://localhost:8080)

## Available Scripts

- `npm run dev` or `yarn dev` - Start the development server
- `npm run build` or `yarn build` - Build the application for production
- `npm run preview` or `yarn preview` - Preview the production build locally
- `npm run lint` or `yarn lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/         # Contexts for global state
├── hooks/         # Custom hooks
├── pages/         # Page components
├── utils/         # Utility functions
├── App.js         # Main application component
├── main.jsx       # Application entry point
├── index.html     # HTML template
├── vite.config.js # Vite configuration
├── .env           # Environment variables
├── .env.example   # Example environment variables
├── README.md      # Project documentation
└── package.json   # Project dependencies
```

## Features

- Modern React with Hooks
- Material-UI for beautiful, responsive UI components
- React Router for navigation
- Form handling with validation
- Responsive design that works on mobile and desktop

## Connecting to Backend

The frontend is configured to connect to a backend API running at `http://localhost:8000` by default. You can change this by updating the `VITE_API_BASE_URL` in your `.env` file.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
