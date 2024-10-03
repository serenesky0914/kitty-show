from sqlalchemy import Table, Column, Integer, String, Float
from db import metadata

documents = Table(
    "documents",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("type", String(50), nullable=False),
    Column("gif_url", String(255), nullable=False),
    Column("title", String(100), nullable=False),
    Column("position", String(50), nullable=False),
)
