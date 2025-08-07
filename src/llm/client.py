import os
from typing import Optional
from openai import OpenAI, AuthenticationError
from dotenv import load_dotenv, find_dotenv


class OpenAIClient:
    """
    Singleton class to manage the OpenAI client instance.
    Ensures only one instance of the client is created and reused.
    """
    _instance: Optional['OpenAIClient'] = None
    _client: Optional[OpenAI] = None
    _initialized: bool = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(OpenAIClient, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._initialized:
            self._client = None
            self._initialized = True

    def get_client(self) -> OpenAI:
        """
        Get the OpenAI client instance. Creates one if it doesn't exist.
        
        Returns:
            OpenAI: Initialized OpenAI client
            
        Raises:
            FileNotFoundError: If .env file is not found
            ValueError: If OPENAI_API_KEY is not found in .env
            RuntimeError: If client initialization fails
        """
        if self._client is not None:
            return self._client

        # Load environment variables
        env_path = find_dotenv()
        if not env_path:
            raise FileNotFoundError(
                "No .env file found. Please create one with your OPENAI_API_KEY."
            )
        
        load_dotenv(env_path)
        
        # Get API key
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in .env file")
        
        # Initialize client
        try:
            self._client = OpenAI(api_key=api_key)
            return self._client
        except AuthenticationError as e:
            raise AuthenticationError(
                f"Authentication Error: {str(e)}\n"
                "Please check your OPENAI_API_KEY in the .env file."
            )
        except Exception as e:
            raise RuntimeError(f"Failed to initialize OpenAI client: {str(e)}")


# Create a module-level singleton instance
_openai_client = OpenAIClient()

# Module-level function for backward compatibility
def get_openai_client() -> OpenAI:
    """Get the singleton OpenAI client instance."""
    return _openai_client.get_client()

# Module-level client instance for direct import
client = get_openai_client()
