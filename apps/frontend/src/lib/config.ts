const BACKEND_URL = process.env.BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("BACKEND_URL environment variable is not set");
}

const BROWSER_VNC_URL = process.env.VNC_URL;
if (!BROWSER_VNC_URL) {
  throw new Error("VNC_URL environment variable is not set");
}


export { BACKEND_URL, BROWSER_VNC_URL };