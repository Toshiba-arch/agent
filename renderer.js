const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

// Configurações do bot
let botOnline = true;
const keywords = {
    'Olá': ['Oi! Como posso ajudar?', 'Olá! Tudo bem?'],
    'Ajuda': ['Como posso ajudar?', 'Precisa de ajuda?']
};

// Cria um novo cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Usa autenticação local para evitar reautenticação
});

// Quando o cliente estiver pronto, exibe uma mensagem
client.on('ready', () => {
    document.getElementById('status').innerText = 'Bot Online';
});

// Quando o cliente precisar de autenticação, gera um QR Code
client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Erro ao gerar QR Code:', err);
            return;
        }
        document.getElementById('status').innerHTML = `<img src="${url}" alt="QR Code" />`;
    });
});

// Quando o cliente receber uma mensagem, responde automaticamente
client.on('message', message => {
    if (!botOnline) return;

    for (const [keyword, responses] of Object.entries(keywords)) {
        if (message.body.includes(keyword)) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            message.reply(randomResponse);
            break;
        }
    }
});

// Função para alternar o bot entre online e offline
window.toggleBot = () => {
    botOnline = !botOnline;
    document.getElementById('status').innerText = botOnline ? 'Bot Online' : 'Bot Offline';
};

// Inicializa o cliente
client.initialize();