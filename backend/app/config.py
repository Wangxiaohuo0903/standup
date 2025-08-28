from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    """Application configuration"""

    database_url: str = Field(
        default="sqlite:///./test.db", env="DATABASE_URL"
    )


settings = Settings()
