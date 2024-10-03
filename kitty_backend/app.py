from starlette.applications import Starlette
from starlette.routing import Route
from starlette.responses import JSONResponse
from starlette.requests import Request
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from models import documents
from db import database, engine, metadata
import sqlalchemy

# Create tables
metadata.create_all(engine)

# CORS middleware
middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'])
]

# CRUD operations
async def list_documents(request):
    try:
        query = documents.select()
        results = await database.fetch_all(query)

        results_list = [dict(result) for result in results]
        return JSONResponse(results_list)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

async def create_document(request):
    try:
        data = await request.form()
        if not data:
            return JSONResponse({"error": "Empty JSON body"}, status_code=400)

        query = documents.insert().values(
            type=data["type"],
            gif_url=data["gif_url"],
            title=data["title"],
            position=data["position"],
        )
        last_record_id = await database.execute(query)
        return JSONResponse({"id": last_record_id})
    except KeyError as e:
        return JSONResponse({"error": f"Missing key: {e}"}, status_code=400)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

async def update_document(request: Request):
    try:
        data = await request.form()
        id = int(request.path_params["id"])  # Convert ID to integer

        # Check if the document exists
        select_query = documents.select().where(documents.c.id == id)
        existing_document = await database.fetch_one(select_query)

        if not existing_document:
            return JSONResponse({"error": "Document not found"}, status_code=404)

        query = documents.update().where(documents.c.id == id).values(
            type=data["type"],
            gif_url=data["gif_url"],
            title=data["title"],
            position=data["position"],
        )
        await database.execute(query)
        
        return JSONResponse({"status": "updated"})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

async def delete_document(request):
    id = request.path_params["id"]
    query = documents.delete().where(documents.c.id == id)
    await database.execute(query)
    return JSONResponse({"status": "deleted"})

# Routes
routes = [
    Route("/documents", list_documents, methods=["GET"]),
    Route("/documents", create_document, methods=["POST"]),
    Route("/documents/{id:int}", update_document, methods=["PUT"]),
    Route("/documents/{id:int}", delete_document, methods=["DELETE"]),
]

# Starlette app
app = Starlette(routes=routes, middleware=middleware)

# Startup and shutdown events
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
