
# Monorepo with FastAPI Backend and Next.js Frontend

## Overview

This monorepo combines two popular frameworks:
- **Backend**: Built with **FastAPI**, handling browser automation tasks.
- **Frontend**: Built with **Next.js**, providing a seamless, modern UI.

The backend runs a headful (visible) browser instance that you can control. You can observe the automation through a VNC server that lets you view and interact with the browser instance.

## Features

### Backend

1. **POST /dropbox**: Opens the Dropbox login page in a browser.
2. **POST /dropbox/create-folder**: Automates creating a folder on the Dropbox homepage.

### VNC Server

- Connect to the VNC server to watch the browser instance live.
- This lets you view and control the automated browser in real time.

## Prerequisites

1. **Docker**: Install Docker on your system. [Get Docker here](https://docs.docker.com/get-docker/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Build and start the project**:

   ```bash
   docker-compose up --build -d
   ```

   This will:
   - Build and start the backend (FastAPI) and frontend (Next.js) services.
   - Start the VNC server for controlling and viewing the browser instance.

## Usage

### Accessing the Services

- **Backend**:
  - **URL**: [http://localhost:8000](http://localhost:8000)
  - **Endpoints**:
    - **`POST /dropbox`**: Starts the browser and navigates to the Dropbox login page.
    - **`POST /dropbox/create-folder`**: Creates a new folder on the Dropbox homepage using automation and takes `folder_name` as json payload.

- **Frontend**:
  - **URL**: [http://localhost:3000](http://localhost:3000)

### Viewing the Browser Automation
While the browser is already availble in frontend to see, to see it explicitly

- **VNC Server**:
  - **URL**: [http://localhost:6080/vnc.html](http://localhost:6080/vnc.html)
  - This lets you watch the automation in real time or control the browser.

---
