import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { exec } from 'child_process';
import path from 'path';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import fs from 'fs';


const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame:false,
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    win.loadURL('app://./index.html');
  }
}

app.on('ready', () => {
  createWindow();
});

ipcMain.handle('create-nuxt-project', async (event, projectName) => {
  const desktopPath = app.getPath('desktop');
  const projectPath = path.join(desktopPath, projectName);

  // Check if the folder exists
  if (fs.existsSync(projectPath)) {
    return Promise.reject(`Project folder "${projectPath}" already exists.`);
  }

  // Construct the command to skip interactive prompts
 const command = `npx nuxi init "${projectPath}" --no-deps --force --no-tty`;

return new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error creating Nuxt project:', stderr);
      reject(stderr);
      return;
    }

    console.log('Nuxt project created. Installing dependencies...');
    exec(`cd "${projectPath}" && npm install`, (installError, installStdout, installStderr) => {
      if (installError) {
        console.error('Error installing dependencies:', installStderr);
        reject(installStderr);
        return;
      }

      console.log('Dependencies installed:', installStdout);
      resolve({ url: 'http://localhost:3000' });
    });
  });
});

});

