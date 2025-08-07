from enum import Enum
from typing import Optional, Dict, Any, Union
from openai import AuthenticationError
from .client import client


class Role(Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


def create_message(
    content: str,
    role: Role = Role.USER,
) -> Dict[str, Any]:
    return {"role": role.value, "content": content}


def get_chat_completion(
    messages: list,
    model: str = "gpt-3.5-turbo",
    temperature: float = 0.7,
    max_tokens: int = None,
    top_p: float = 1.0,
    n: int = 1,
    stop: Optional[list] = None,
) -> str:
    """
    Get a response from the OpenAI chat completion API.

    Args:
        messages: List of messages for the conversation
        model: The model to use for completion
        temperature: Controls randomness (0.0 to 2.0)
        max_tokens: Maximum number of tokens to generate
        top_p: Controls diversity via nucleus sampling
        n: Number of completions to generate
        stop: List of sequences where the API will stop generating

    Returns:
        str: The generated text response

    Raises:
        AuthenticationError: If there's an authentication issue
        Exception: For other API errors
    """
    stop = stop or []
    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            n=n,
            stop=stop,
        )
        return response.choices[0].message.content
    except AuthenticationError as e:
        raise AuthenticationError(
            "Authentication Error: {}\nPlease check your OPENAI_API_KEY in the .env file.".format(
                str(e)
            )
        )
    except Exception as e:
        raise Exception(f"Error in chat completion: {str(e)}")


def moderate_content(text: str) -> Dict[str, Any]:
    """
    Check if the given text violates OpenAI's content policy.

    Args:
        text: The text to moderate

    Returns:
        Dict containing moderation results

    Raises:
        AuthenticationError: If there's an authentication issue
        Exception: For other API errors
    """
    try:
        response = client.moderations.create(input=text)
        return response.model_dump()
    except AuthenticationError as e:
        raise AuthenticationError(
            "Authentication Error: {}\nPlease check your OPENAI_API_KEY in the .env file.".format(
                str(e)
            )
        )
    except Exception as e:
        raise Exception(f"Error in content moderation: {str(e)}")
