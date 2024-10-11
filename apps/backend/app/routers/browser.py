from fastapi import APIRouter, BackgroundTasks
from app.services.browser import open_dropbox_login_page
from app.schema.browser import FolderData
from app.services.utils import DropboxAutomation

dropbox = DropboxAutomation()

router = APIRouter()


@router.post("/dropbox")
async def login_action(background_tasks: BackgroundTasks):
    """
    Endpoint to initiate the Dropbox login process.

    This starts a background task to open the Dropbox login page.

    Args:
        None

    Returns:
        dict: A message indicating the browser instance has started.
    """
    background_tasks.add_task(open_dropbox_login_page, dropbox)
    return {"message": "Started browser instance"}


@router.post("/dropbox/create-folder")
async def create_folder(request: FolderData, background_tasks: BackgroundTasks):
    """
    Endpoint to create a new folder in Dropbox.

    Args:
        request (FolderData): The folder data including name and type of the folder that are available in dropbox to create.

    Returns:
        dict: A message indicating the folder creation status.
    """

    if not dropbox.page:
        return {"error": "Not logged in"}
    background_tasks.add_task(dropbox.create_folder, request)
    return {"message": "Folder creation started"}
