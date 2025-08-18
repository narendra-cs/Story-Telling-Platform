from typing import Dict, Any, List
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from src.pydentic_models.models import Character
from src.llm.prompt_generator import PromptGenerator
from src.llm.utils import Role, get_llm


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

        output = {"title": "", "paragraphs": [], "genre": self.genre, "tags": []}

        try:
            messages = [
                (Role.SYSTEM.value, "You are a master storyteller."),
                (Role.USER.value, "{input}"),
            ]

            prompt = ChatPromptTemplate.from_messages(messages)
            chain = prompt | get_llm() | JsonOutputParser()

            prompt_generator = PromptGenerator(
                genre=self.genre,
                characters_details=self.characters_details,
                number_of_characters=self.number_of_characters,
                number_of_paragraphs=self.number_of_paragraphs,
                plot_points=self.plot_points,
                instructions=self.instructions,
            )
            user_message = prompt_generator.generate_prompt()

            story = chain.invoke({"input": user_message})

            return {**output, **story}
        except Exception as e:
            raise Exception(f"Error in story generation: {str(e)}")
