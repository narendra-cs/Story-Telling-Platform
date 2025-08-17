import textwrap
from src.pydentic_models.models import Character

# AI Story generation prompt template


class PromptGenerator:
    def __init__(
        self,
        genre: str,
        characters_details: list[Character] = None,
        number_of_characters: int = None,
        number_of_paragraphs: int = None,
        plot_points: list[str] = None,
        instructions: list[str] = None,
    ):
        self.genre = genre
        self.number_of_characters = number_of_characters
        self.characters_details = characters_details
        self.number_of_paragraphs = number_of_paragraphs
        self.plot_points = plot_points
        self.instructions = (instructions or []) + [
            "Use vivid, descriptive language to build the setting and atmosphere.",
            "Ensure the dialogue (if any) is natural and reveals character.",
            "Ensure the story is free of any offensive or inappropriate content.",
        ]

    def generate_prompt(self):
        prompt_template = textwrap.dedent(
            """
        Task: Write a compelling short story based on the following specifications.

        Specifications:

        ###########
        Genre: {genre}

        {characters_prompt}

        Structure: The entire story must be exactly {number_of_paragraphs} paragraphs long.

        {plot_points_prompt}
        ###########
    
        {instructions_prompt}
    
        Output Format: Follow below json structure. Please output only raw JSON without markdown formatting or code fences.

        {{
        title: "<title of story>",
        paragraphs: [<paragraph1>, <paragraph2>, <paragraph3>, ...],
        genre: "<genre>",
        tags: [<tag1>, <tag2>, <tag3>]
        }}
        """
        )

        return prompt_template.format(
            genre=self.genre,
            characters_prompt=self.__characters_prompt(),
            number_of_paragraphs=self.number_of_paragraphs,
            plot_points_prompt=self.__plot_points_prompt(),
            instructions_prompt=self.__instructions_prompt(),
        )

    def __characters_prompt(self) -> str:
        instruction = "Develop the characters beyond simple archetypes."

        if self.number_of_characters is None and self.characters_details is None:
            raise ValueError(
                "Either number_of_characters or characters_details must not be None"
            )

        if self.characters_details:
            characters = f"Characters: The story must feature the following main characters:\n\n---\n"
            for character in self.characters_details:
                characters += f"Name: {character.name}\nAge: {character.age}\nGender: {character.gender}\nPersonality: {character.personality}\nMotivation: {character.motivation}\nRole: {character.role}\n---\n"
            characters += "Please develop their unique  personalities, relationships, roles and other details within the narrative if missing."
            instruction += " Follow the purpose of each character in the story as given in characters section"
        else:
            characters = f"Characters: The story must feature exactly {self.number_of_characters} characters. Please give them distinct names, personalities, motivations and roles that are appropriate for the story's genre."
            instruction += " Give them a purpose in the story."
        self.instructions.append(instruction)
        return characters

    def __plot_points_prompt(self) -> str:

        if self.plot_points:
            plot_points_prompt = (
                f"Plot Points: The story must feature the following plot points:\n"
            )
            for index, plot_point in enumerate(self.plot_points):
                plot_points_prompt += f"{index + 1}. {plot_point}\n"
            self.instructions.append(
                "Follow the given plot points to create a story that is engaging and directly reflects the chosen genre."
            )
        else:
            plot_points_prompt = ""
            self.instructions.extend(
                [
                    "Craft a complete narrative with a clear beginning, rising action, a climax, and a satisfying resolution.",
                    "Ensure the plot is engaging and directly reflects the chosen genre.",
                ]
            )

        return plot_points_prompt

    def __instructions_prompt(self) -> str:
        instructions_prompt = ""
        if self.instructions:
            instructions_prompt = "Instructions:\n"
            for index, instruction in enumerate(self.instructions):
                instructions_prompt += f"{index + 1}. {instruction}\n"

        return instructions_prompt


if __name__ == "__main__":
    print(generate_prompt())
