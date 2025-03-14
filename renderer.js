// Escuta o status do WhatsApp
window.api.onWhatsappStatus((event, status) => {
    document.getElementById('status').innerText = `Status: ${status}`;
    if (status === 'auth_failure' || status === 'disconnected') {
        alert(`Erro: ${status}`);
    }
});

// Escuta o QR Code
window.api.onWhatsappQr((event, qr) => {
    document.getElementById('qrcode').innerHTML = `<img src="${qr}" alt="QR Code" />`;
});

// Escuta o nome do usuário conectado
window.api.onWhatsappUser((event, user) => {
    document.getElementById('user').innerText = `Usuário: ${user}`;
});

// Escuta o número de telefone conectado
window.api.onWhatsappNumber((event, number) => {
    document.getElementById('number').innerText = `Número: ${number}`;
});

// Escuta as mensagens recebidas
window.api.onWhatsappMessage((event, message) => {
    const messagesElement = document.getElementById('messages');

    // Cria um elemento para a mensagem
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Adiciona detalhes da mensagem
    let senderInfo = `De: ${message.senderName} (${message.from})`;
    if (message.isGroup) {
        senderInfo += ` no grupo "${message.groupName}"`;
    }

    const timestamp = new Date(message.timestamp * 1000).toLocaleString(); // Converte o timestamp para uma data legível

    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${senderInfo}</strong>
            <span class="timestamp">${timestamp}</span>
        </div>
        <div class="message-body">
            ${message.body ? `<p>${message.body}</p>` : ''}
            ${message.mediaUrl ? `<img src="${message.mediaUrl}" alt="Mídia" style="max-width: 100%; height: auto;" />` : ''}
        </div>
    `;

    messagesElement.appendChild(messageElement);
});

// Escuta a confirmação de conexão
window.api.onWhatsappConnected(() => {
    document.getElementById('qrcode-container').style.display = 'none'; // Oculta o QR Code
    document.getElementById('messages-container').style.display = 'block'; // Exibe as mensagens
    document.getElementById('admin-groups-container').style.display = 'block'; // Exibe o botão e a lista de grupos
    document.getElementById('stop-bot-button').style.display = 'block';
});

// Oculta o botão "Stop Bot" quando a sessão é encerrada
window.api.onWhatsappDisconnected(() => {
    document.getElementById('stop-bot-button').style.display = 'none';
    document.getElementById('qrcode-container').style.display = 'block';
    document.getElementById('messages-container').style.display = 'none';
    document.getElementById('admin-groups-container').style.display = 'none';
});

// Escuta o estado de carregamento
window.api.onWhatsappLoading((event, isLoading) => {
    const loadingElement = document.getElementById('loading');
    if (isLoading) {
        loadingElement.style.display = 'block'; // Exibe o indicador de carregamento
    } else {
        loadingElement.style.display = 'none'; // Oculta o indicador de carregamento
    }
});

// Função para gerar o QR Code
window.generateQr = () => {
    window.api.generateQr(); // Solicita a geração do QR Code
};
// Função para listar grupos administrados
//window.getAdminGroups = () => {
//    const adminGroupsList = document.getElementById('admin-groups-list');
//    adminGroupsList.innerHTML = '<li>Carregando grupos...</li>'; // Feedback visual
//    window.api.getAdminGroups();
//};

// Listener para receber a lista de grupos administrados
//window.api.onAdminGroupsList((event, { success, groups, error }) => {
//    const adminGroupsList = document.getElementById('admin-groups-list');
//    adminGroupsList.innerHTML = ''; // Limpa a lista anterior

//    if (success) {
//        console.log('Grupos recebidos:', groups); // Log para depuração
//        groups.forEach((group) => {
//            const groupItem = document.createElement('li');
//            groupItem.innerText = `${group.name} (${group.participants} participantes)`;
//            adminGroupsList.appendChild(groupItem);
//        });
//    } else {
//        console.error('Erro ao listar grupos:', error); // Log para depuração
//        alert(`Erro ao listar grupos: ${error}`);
//    }
//});
// Função para listar todos os grupos
window.getAllGroups = () => {
    const allGroupsList = document.getElementById('all-groups-list');
    allGroupsList.innerHTML = '<li>Carregando grupos...</li>'; // Feedback visual
    window.api.getAllGroups();
};

// Listener para receber a lista de todos os grupos
window.api.onAllGroupsList((event, { success, groups, error }) => {
    const allGroupsList = document.getElementById('all-groups-list');
    allGroupsList.innerHTML = ''; // Limpa a lista anterior

    if (success) {
        console.log('Todos os grupos recebidos:', groups); // Log para depuração
        groups.forEach((group) => {
            const groupItem = document.createElement('li');
            groupItem.innerText = `${group.name} (${group.participants} participantes) - ${
                group.isAdmin ? 'Administrador' : 'Membro'
            }`;
            allGroupsList.appendChild(groupItem);
        });
    } else {
        console.error('Erro ao listar grupos:', error); // Log para depuração
        alert(`Erro ao listar grupos: ${error}`);
    }
});
// Função para encerrar o bot
window.stopBot = () => {
    console.log('Função stopbot chamada!');
    window.api.stopBot();
};
window.getContacts = () => {
    console.log('Função getContacts chamada!');	
    window.api.getContacts();
};

// Outros listeners e funções...