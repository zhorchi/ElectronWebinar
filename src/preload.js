const { contextBridge, ipcRenderer } = require('electron')

contextBridge.executeInMainWorld('electronAPI', {
    saveTask: (taskName, taskText) => {
        return ipcRenderer.invoke('save-task', taskName, taskText)
    },

    loadTasks: () => {
        return ipcRenderer.invoke('load-tasks')
    }
})