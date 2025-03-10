// Importa os módulos necessários do Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Função para criar a janela principal
function createWindow() {
    // Cria uma nova janela do navegador
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js') // Carrega o renderer.js antes de carregar a página
        }
    });

    // Carrega o arquivo index.html na janela
    mainWindow.loadFile('index.html');

    // Abre as ferramentas de desenvolvimento (opcional)
    // mainWindow.webContents.openDevTools();
}

// Quando o Electron terminar de inicializar, cria a janela
app.whenReady().then(createWindow);

// Fecha a aplicação quando todas as janelas são fechadas (exceto no macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Reabre a janela se o aplicativo for reativado (macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});