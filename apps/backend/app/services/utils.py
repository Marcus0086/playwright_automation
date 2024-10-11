from playwright.async_api import async_playwright

from .constants import USER_AGENT, BROWSER_ARGS
from ..schema.browser import FolderData, FolderType


class DropboxAutomation:
    """
    A singleton class to automate Dropbox operations using Playwright.

    Attributes:
        page: The current browser page instance.
        context: The browser context instance.
        browser: The browser instance.
    """

    _instance = None

    def __new__(cls):
        """
        Ensures only one instance of DropboxAutomation exists, using (Singleton pattern).

        Returns:
            DropboxAutomation: The single instance of the class.
        """
        if cls._instance is None:
            cls._instance = super(DropboxAutomation, cls).__new__(cls)
            cls.page = None
            cls.context = None
        return cls._instance

    async def start_browser(self):
        """
        Initializes the browser, context, and page instances.
        """

        if self.page is None:
            playwright = await async_playwright().start()
            self.browser = await playwright.chromium.launch(
                headless=False,
                args=BROWSER_ARGS,
            )
            self.context = await self.browser.new_context(
                user_agent=USER_AGENT,
                device_scale_factor=1,
                is_mobile=False,
                locale="en-US",
                timezone_id="UTC",
                ignore_https_errors=True,
                permissions=["geolocation", "notifications"],
            )
            await self.context.add_init_script(
                "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
            )
            cookies = await self.context.cookies()
            await self.context.add_cookies(cookies)
            self.page = await self.context.new_page()
            self.page.set_default_navigation_timeout(60000)
            await self.page.goto("https://www.google.com")

    async def close_browser(self):
        await self.browser.close()

    async def open_login_page(
        self,
    ):
        await self.page.goto("https://www.dropbox.com/login")
        return True

    async def create_folder(self, folder_data: FolderData):
        """
        Automates the creation of a folder in Dropbox.

        Args:
            folder_data (FolderData): Data containing folder name and type.
        """

        folder_name = folder_data.folder_name
        if folder_data.folder_type == FolderType.BASIC:
            await self.page.click('button[aria-label="Create"]')

            # Step 2: Click on the "Folder" button in the submenu
            await self.page.wait_for_selector(
                "#browse-view-action-bar-create-menu-folder-submenu-button"
            )
            await self.page.click(
                "#browse-view-action-bar-create-menu-folder-submenu-button"
            )

            # Step 3: Click to open the modal where you enter the folder name
            await self.page.wait_for_selector('[data-testid="Folder"]')
            await self.page.click('[data-testid="Folder"]')

            # Step 4: Wait for the input to appear, then fill in the folder name
            await self.page.wait_for_selector(
                'input[aria-label="Folder name input"]', timeout=60000
            )
            await self.page.fill('input[aria-label="Folder name input"]', folder_name)

            # Step 5: Press "Enter" to confirm
            await self.page.press('input[aria-label="Folder name input"]', "Enter")

            # Optional: Add a brief wait to ensure the folder creation completes
            await self.page.wait_for_timeout(5000)
