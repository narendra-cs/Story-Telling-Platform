from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from src.models.request_models import StoryInput
from src.llm.story_generator import StoryGenerator

app = FastAPI(
    title="Story Telling Platform API",
    description="API for generating stories using AI",
    version="0.0.1",
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/generate-story", status_code=status.HTTP_200_OK)
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


@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    return {"message": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
