from .utils import DropboxAutomation


async def open_dropbox_login_page(automation: DropboxAutomation):
    """
    Opens the Dropbox login page.

    Args:
        DropboxAutomation class instance

    Returns:
        dict: A status message indicating success or failure.
    """
    try:
        login_success = await automation.open_login_page()
        if not login_success:
            await automation.close_browser()
            return {"status": "error", "message": "Failed to open login page"}
    except Exception as e:
        await automation.close_browser()
        return {"status": "error", "message": str(e)}
