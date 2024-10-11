from typing import Optional
from pydantic import BaseModel, ConfigDict
from enum import Enum


class FolderType(Enum):
    BASIC = "basic"
    SHARED = "shared"
    AUTOMATED = "automated"


class FolderData(BaseModel):
    folder_name: str
    folder_type: Optional[FolderType] = FolderType.BASIC
    model_config = ConfigDict(use_enum_values=True)
