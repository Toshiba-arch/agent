const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

let mainWindow;
let client;


function createWindow() {
    // Cria uma nova janela do Electron
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Carrega o preload.js
            contextIsolation: true, // Isolamento de contexto (recomendado)
            nodeIntegration: false // Desabilita a integração direta do Node.js
        }
    });

    // Carrega o arquivo index.html na janela
    mainWindow.loadFile('index.html');

    // Evento para fechar a janela
    mainWindow.on('close', async (event) => {
        if (client) {
            console.log('Encerrando sessão do WhatsApp...');
            await client.logout(); // Encerra a sessão do WhatsApp
            await client.destroy(); // Destrói o cliente
            client = null;
        }
    });
}

// Função para inicializar o cliente do WhatsApp
function initializeWhatsApp() {
    client = new Client({
        authStrategy: new LocalAuth(), // Usa autenticação local para evitar reautenticação
        puppeteer: {
            headless: true, // Executa o navegador em modo headless
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Evita problemas de memória
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // Modo de processo único
                '--disable-gpu' // Desabilita a aceleração de GPU
            ]
        }
    });

    // Evento para informar que o QR Code está sendo gerado
    client.on('loading_screen', () => {
        console.log('Gerando QR Code...'); // Log para depuração
        mainWindow.webContents.send('whatsapp-loading', true);
    });

    // Evento para gerar o QR Code
    client.on('qr', (qr) => {
        console.log('QR Code recebido, gerando imagem...'); // Log para depuração
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Erro ao gerar QR Code:', err);
                return;
            }
            mainWindow.webContents.send('whatsapp-qr', url);
            mainWindow.webContents.send('whatsapp-loading', false); // Oculta o indicador de carregamento
        });
    });

    // Evento quando o cliente estiver pronto
    client.on('ready', () => {
        console.log('Cliente do WhatsApp pronto!'); // Log para depuração
        const userInfo = client.info; // Informações do usuário conectado
        mainWindow.webContents.send('whatsapp-status', 'ready');
        mainWindow.webContents.send('whatsapp-user', userInfo.pushname); // Nome do usuário
        mainWindow.webContents.send('whatsapp-number', userInfo.wid.user); // Número de telefone
        mainWindow.webContents.send('whatsapp-connected', true); // Indica que a conexão foi estabelecida
    });

    // Evento para lidar com erros de autenticação
    client.on('auth_failure', (msg) => {
        console.error('Falha na autenticação:', msg);
        mainWindow.webContents.send('whatsapp-status', 'auth_failure');
    });

    // Evento para lidar com desconexões
    client.on('disconnected', (reason) => {
        console.error('Desconectado:', reason);
        mainWindow.webContents.send('whatsapp-status', 'disconnected');
    });

    // Evento para receber mensagens
    	client.on('message', async (message) => {
	    const chat = await message.getChat(); // Obtém informações do chat
	    const contact = await message.getContact(); // Obtém informações do contato

	    let mediaUrl = null;
	    if (message.hasMedia) {
		const media = await message.downloadMedia();
		mediaUrl = `data:${media.mimetype};base64,${media.data}`;
	    }

	    mainWindow.webContents.send('whatsapp-message', {
		from: message.from, // Número do remetente
		senderName: contact.pushname || contact.number, // Nome ou número do remetente
		body: message.body, // Corpo da mensagem
		isGroup: chat.isGroup, // Verifica se é um grupo
		groupName: chat.isGroup ? chat.name : null, // Nome do grupo (se for um grupo)
		timestamp: message.timestamp, // Timestamp da mensagem
		mediaUrl: mediaUrl // URL da mídia (se houver)
	    });
	});

    // Inicializa o cliente
    console.log('Inicializando o cliente do WhatsApp...'); // Log para depuração
    client.initialize();
}

// Quando o Electron estiver pronto, cria a janela
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

// Comunicação IPC para gerar o QR Code
ipcMain.on('generate-qr', () => {
    console.log('Solicitando geração do QR Code...'); // Log para depuração
    initializeWhatsApp();
});
