import enum
from pydantic import BaseModel, Field


class GenderEnum(str, enum.Enum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"


# Character class to store character details
class Character(BaseModel):
    """Character class to store character details"""

    name: str = Field(description="Name of the character")
    age: int = Field(description="Age of the character")
    gender: GenderEnum = Field(
        default=GenderEnum.OTHER, description="Gender of the character"
    )
    personality: str = Field(default="", description="Personality of the character")
    motivation: str = Field(default="", description="Motivation of the character")
    role: str = Field(default="", description="Role of the character")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "John Doe",
                "age": 30,
                "gender": "Male",
                "personality": "Curious and adventurous",
                "motivation": "To find the legendary treasure",
                "role": "Explorer",
            }
        }
    }


class GenreEnum(str, enum.Enum):
    Fantasy = "Fantasy"
    ScienceFiction = "Science Fiction"
    Mystery = "Mystery"
    Romance = "Romance"
    Horror = "Horror"
    Comedy = "Comedy"
    Drama = "Drama"
    Thriller = "Thriller"
    Biography = "Biography"
    History = "History"
    SelfHelp = "Self Help"
    NonFiction = "Non Fiction"
    Adventure = "Adventure"


class StoryInput(BaseModel):
    """StoryInput class to store story input details"""

    genre: GenreEnum = Field(description="Genre of the story")
    characters_details: list[Character] = Field(
        default=None, description="Details of the characters"
    )
    number_of_characters: int = Field(default=3, description="Number of characters")
    number_of_paragraphs: int = Field(default=3, description="Number of paragraphs")
    plot_points: list[str] = Field(default=None, description="Plot points of the story")
    instructions: list[str] = Field(
        default=None, description="Instructions for the story"
    )
    model_config = {
        "json_schema_extra": {
            "example": {
                "genre": "Fantasy",
                "characters_details": [
                    {
                        "name": "John Doe",
                        "age": 30,
                        "gender": "Male",
                        "personality": "Curious and adventurous",
                        "motivation": "To find the legendary treasure",
                        "role": "Explorer",
                    }
                ],
                "number_of_characters": 3,
                "number_of_paragraphs": 3,
                "plot_points": [
                    "The story begins with John Doe discovering an old map in his attic.",
                    "Jane Smith, intrigued by the map, joins John on his quest.",
                    "Bob Johnson, a cunning thief, tries to steal the treasure.",
                    "John and Jane must navigate through treacherous mountains to reach the treasure.",
                    "The climax occurs when Bob confronts John and Jane, leading to a dramatic showdown.",
                    "John and Jane manage to protect the treasure and return home as heroes.",
                    "The treasure is later discovered to be a powerful artifact that can grant wishes.",
                    "John and Jane use the treasure to help others and make the world a better place.",
                ],
                "instructions": [
                    "Use vivid, descriptive language to build the setting and atmosphere.",
                    "Ensure the dialogue (if any) is natural and reveals character.",
                    "Ensure the story is free of any offensive or inappropriate content.",
                ],
            }
        }
    }
