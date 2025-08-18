from fastapi import APIRouter, HTTPException, status
from src.pydentic_models.models import StoryInput, StoryOutput
from src.llm.story_generator import StoryGenerator

router = APIRouter()


@router.post(
    "/generate-story", status_code=status.HTTP_200_OK, response_model=StoryOutput
)
async def generate_story(story_input: StoryInput):
    try:
        story_generator = StoryGenerator(
            genre=story_input.genre,
            characters_details=story_input.characters_details,
            number_of_characters=story_input.number_of_characters,
            number_of_paragraphs=story_input.number_of_paragraphs,
            plot_points=story_input.plot_points,
            instructions=story_input.instructions,
        )
        story_json = story_generator.generate_story()
        return story_json
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
