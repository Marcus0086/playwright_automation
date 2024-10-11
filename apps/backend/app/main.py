from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routers.browser import router as browser_router
from .services.utils import DropboxAutomation

dropbox_automation = DropboxAutomation()


@asynccontextmanager
async def browser(app: FastAPI):
    """
    Asynchronous context manager that manages the browser lifecycle.

    It starts the browser when the application starts and closes it when the application shuts down.

    Args:
        app (FastAPI): The FastAPI application instance.
    """
    await dropbox_automation.start_browser()
    try:
        # This `yield` allows the app to run while keeping the browser open
        yield
    except Exception as e:
        print(e)
    finally:
        # Closes the browser and clean any resource when the app stops
        await dropbox_automation.close_browser()


app = FastAPI(lifespan=browser)


@app.get("/")
async def read_root():
    return {"Status": "Live and Running"}


app.include_router(router=browser_router)
