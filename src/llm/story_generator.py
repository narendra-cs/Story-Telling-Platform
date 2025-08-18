import json
from typing import Dict, Any, List
from src.llm.prompt_generator import PromptGenerator
from src.llm.utils import get_chat_completion, create_message, Role
from src.pydentic_models.models import Character


class StoryGenerator:
    def __init__(
        self,
        genre: str,
        characters_details: List[Character] | None = None,
        number_of_characters: int | None = None,
        number_of_paragraphs: int | None = None,
        plot_points: List[str] | None = None,
        instructions: List[str] | None = None,
    ):
        self.genre = genre
        self.number_of_characters = number_of_characters
        self.characters_details = characters_details
        self.number_of_paragraphs = number_of_paragraphs
        self.plot_points = plot_points
        self.instructions = instructions

    def generate_story(self) -> Dict[str, Any]:

        try:
            messages = [create_message("You are a master storyteller.", Role.SYSTEM)]

            prompt_generator = PromptGenerator(
                genre=self.genre,
                characters_details=self.characters_details,
                number_of_characters=self.number_of_characters,
                number_of_paragraphs=self.number_of_paragraphs,
                plot_points=self.plot_points,
                instructions=self.instructions,
            )
            prompt = prompt_generator.generate_prompt()

            messages.append(create_message(prompt, Role.USER))
            story = get_chat_completion(messages, model="gpt-4o")
            story_json = json.loads(story)
            return story_json
        except json.JSONDecodeError as e:
            raise Exception(f"Invalid JSON response from the llm model: {str(e)}")
        except Exception as e:
            raise Exception(f"Error in story generation: {str(e)}")
