# AI-Powered Storytelling Platform

An interactive web application that generates personalized stories using AI models from DeepInfra. Users can provide inputs and receive AI-generated stories based on their preferences.

## Features

- Interactive web interface for story generation
- Integration with DeepInfra's language models
- Customizable story parameters (genre, characters, plot points)
- Responsive design for desktop and mobile devices
- Secure API key management

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- DeepInfra API key (sign up at [DeepInfra](https://deepinfra.com/))
- Node.js and npm (for frontend development)

## Quick Start

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Story-Telling-Platform.git
   cd Story-Telling-Platform
   ```

2. **Create and activate virtual environment**
   ```bash
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root and add your DeepInfra API key:
   ```
   DEEPINFRA_API_KEY=your_deepinfra_api_key_here
   ```

5. **Run the backend server**
   ```bash
   cd src
   uvicorn main:app --reload
   ```

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Visit `http://localhost:3000` in your browser

## Project Structure

```
Story-Telling-Platform/
├── src/                    # Backend source code
│   ├── __init__.py
│   ├── main.py            # FastAPI application
│   ├── llm/               # LLM integration
│   │   ├── __init__.py
│   │   ├── client.py      # DeepInfra client
│   │   └── utils.py       # Utility functions
│   └── api/               # API endpoints
│       └── endpoints.py
├── frontend/              # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Application pages
│   │   └── App.js         # Main application component
│   └── package.json
├── tests/                 # Test files
├── .env.example           # Example environment variables
├── requirements.txt       # Python dependencies
├── README.md              # This file
└── .gitignore
```

## Testing

Run the test suite with pytest:

```bash
pytest tests/
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DEEPINFRA_API_KEY` | Your DeepInfra API key | 
| `PORT` | Port for the backend server (default: 8000) | 
| `FRONTEND_URL` | URL of the frontend application | 

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [DeepInfra](https://deepinfra.com/) for providing powerful language models
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend library
