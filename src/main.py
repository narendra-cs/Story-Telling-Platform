from typing import Dict
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from src.api.generate_story import router as generate_story_router

app = FastAPI(
    title="Story Telling Platform API",
    description="API for generating stories using AI",
    version="0.0.1",
    root_path="/api/v1",
    root_path_in_servers=False,
)

# Add CORS middleware to allow requests from the UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With",
        "X-HTTP-Method-Override",
    ],
)


# Health check endpoint
@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check() -> Dict[str, str]:
    return {"message": "healthy"}


# Include API routers for story generation
app.include_router(generate_story_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
