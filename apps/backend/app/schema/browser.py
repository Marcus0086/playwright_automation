from pydantic import BaseModel


class FolderData(BaseModel):
    folder_name: str
