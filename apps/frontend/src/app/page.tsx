"use client";

import { useState } from "react";
import { FolderPlus, LogIn, MonitorPlay, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BROWSER_VNC_URL, BACKEND_URL } from "@/lib/config";
import { createFolder } from "@/lib/actions/dropbox";

export default function Component() {
  const iframeUrl = `${BROWSER_VNC_URL}/vnc.html?autoconnect=true&resize=remote&reconnect=true&quality=9`;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  /**
   * Opens the Dropbox login page in the same window.
   *
   * @returns {Promise<void>} - A promise that resolves when the user is logged
   */
  const handleLogin = async (): Promise<void> => {
    setIsLoggingIn(true);
    try {
      const response = await fetch(`${BACKEND_URL}/dropbox`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  /**
   * Handles the creation of a folder in Dropbox.
   *
   * @param {FormData} formData - The form data containing the folder name.
   * @returns {Promise<void>} - A promise that resolves when the folder is created.
   */
  const handleCreateFolder = async (formData: FormData): Promise<void> => {
    setIsCreatingFolder(true);
    try {
      createFolder(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 w-[250px] h-screen overflow-y-auto flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Dropbox Automation
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full justify-start text-left"
                variant="outline"
                onClick={handleLogin}
              >
                {!isLoggingIn ? (
                  <LogIn className="mr-2 h-4 w-4" />
                ) : (
                  <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                )}
                Open Dropbox
              </Button>
              <hr />
              {/* Create Folder Form */}
              <form
                action={handleCreateFolder}
                className="flex-col w-full max-w-sm items-center space-y-2"
              >
                <Input
                  className="w-full"
                  name="folder_name"
                  placeholder="Folder Name"
                  disabled={!isLoggedIn || isCreatingFolder}
                  required
                />
                <Button
                  className="w-full justify-start text-left"
                  variant="outline"
                  type="submit"
                  disabled={!isLoggedIn || isCreatingFolder}
                >
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Create Folder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Browser Live view */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Browser View
          </h2>
        </header>
        <div className="flex-1 p-4">
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0 rounded-lg"
              title="Playwright Browser View"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg">
              <MonitorPlay className="h-24 w-24 text-gray-400" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
