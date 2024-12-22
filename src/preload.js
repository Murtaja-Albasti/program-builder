const { contextBridge, ipcRenderer } = require('electron');

// Expose an API to the renderer process securely
contextBridge.exposeInMainWorld('electronAPI', {
  createNuxtProject: async (projectName) => {
    try {
      const result = await ipcRenderer.invoke('create-nuxt-project', projectName);
      return result; // Returns `true` on success or `false` on failure
    } catch (error) {
      console.error('Error in createNuxtProject:', error);
      return false; // Handle unexpected errors gracefully
    }
  }
});
