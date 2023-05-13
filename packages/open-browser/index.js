const os = require("os");
const { exec } = require("child_process");

const osOpenBrowserCommand = {
  "win32": "start",
  "darwin": "open"
}

module.exports = (url) => {
  const osPlatform = os.platform();

  if (!url) {
    throw new Error("укажите url");
  }

  if (!osOpenBrowserCommand[osPlatform]) {
    console.log("\x1b[31m%s\x1b[0m", "не удалось открыть браузер на вашей операционной системе"); // red
    process.exit(0);
  }

  try {
    exec(`${osOpenBrowserCommand[osPlatform]} ${url}`);
  }
  catch(e) {
    console.log("\x1b[31m%s\x1b[0m", e); // red
  }

}