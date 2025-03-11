const { contextBridge, ipcRenderer } = require('electron');

// Expõe funcionalidades seguras para o Renderer Process
contextBridge.exposeInMainWorld('api', {
    onWhatsappStatus: (callback) => ipcRenderer.on('whatsapp-status', callback),
    onWhatsappQr: (callback) => ipcRenderer.on('whatsapp-qr', callback),
    onWhatsappUser: (callback) => ipcRenderer.on('whatsapp-user', callback),
    onWhatsappNumber: (callback) => ipcRenderer.on('whatsapp-number', callback),
    onWhatsappMessage: (callback) => ipcRenderer.on('whatsapp-message', callback),
    onWhatsappConnected: (callback) => ipcRenderer.on('whatsapp-connected', callback),
    onWhatsappLoading: (callback) => ipcRenderer.on('whatsapp-loading', callback),
    //onAdminGroupsList: (callback) => ipcRenderer.on('admin-groups-list', callback), // Novo listener
    onWhatsappDisconnected: (callback) => ipcRenderer.on('whatsapp-disconnected', callback),
    generateQr: () => ipcRenderer.send('generate-qr'),
    //getAdminGroups: () => ipcRenderer.send('get-admin-groups'), // Nova função
    getAllGroups: () => ipcRenderer.send('get-all-groups'),
    stopBot: () => ipcRenderer.send('stop-bot'),
    getContacts: () => ipcRenderer.send('get-contacts'),
    onContactsList: (callback) => ipcRenderer.on('contacts-list', callback)
});