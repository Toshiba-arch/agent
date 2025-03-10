<h1 align="center">WhatsApp Bot com Electron</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-16.x-green" alt="Node.js Version">
  <img src="https://img.shields.io/badge/Electron-28.x-blue" alt="Electron Version">
  <img src="https://img.shields.io/badge/WhatsApp--web.js-1.26.0-orange" alt="WhatsApp-web.js Version">
</p>

<p align="center">
  Um bot para WhatsApp desenvolvido com Electron e <code>whatsapp-web.js</code>.
</p>

---

## 📋 Índice

- [Introdução](#-introdução)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação da API](#-documentação-da-api)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🚀 Introdução

Este projeto é um bot para WhatsApp desenvolvido com Electron e a biblioteca `whatsapp-web.js`. Ele permite que você interaja com o WhatsApp Web de forma automatizada, recebendo e exibindo mensagens, gerando QR Codes para autenticação e muito mais.

---

## ✨ Funcionalidades

- **Autenticação via QR Code**: Gera um QR Code para autenticação no WhatsApp Web.
- **Recebimento de Mensagens**: Exibe mensagens recebidas, incluindo texto e mídia (imagens, vídeos, etc.).
- **Detecção de Grupos**: Identifica se a mensagem foi enviada em um grupo ou individualmente.
- **Encerramento de Sessão**: Encerra a sessão do WhatsApp ao fechar a aplicação.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 16.x ou superior)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

---

## 🛠 Instalação

Siga os passos abaixo para configurar o projeto:

<h2>🛠 Instalação</h2>

<p>Siga os passos abaixo para configurar o projeto:</p>

<ol>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/seu-usuario/whatsapp-bot.git
cd whatsapp-bot</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Inicie o projeto:
    <pre><code>npm start</code></pre>
  </li>
</ol>

<h2>🎯 Uso</h2>

<h3>Autenticação</h3>
<ol>
  <li>Ao iniciar a aplicação, um QR Code será gerado.</li>
  <li>Escaneie o QR Code usando o aplicativo do WhatsApp no seu celular.</li>
</ol>

<h3>Recebimento de Mensagens</h3>
<p>As mensagens recebidas serão exibidas na interface da aplicação, incluindo:</p>
<ul>
  <li>Nome ou número do remetente.</li>
  <li>Nome do grupo (se aplicável).</li>
  <li>Data e hora da mensagem.</li>
  <li>Corpo da mensagem ou mídia (imagens, vídeos, etc.).</li>
</ul>

<h3>Encerramento de Sessão</h3>
<p>Ao fechar a aplicação, a sessão do WhatsApp será encerrada automaticamente.</p>

<h2>📂 Estrutura do Projeto</h2>

<pre><code>whatsapp-bot/
├── node_modules/          # Dependências do projeto
├── main.js                # Processo principal do Electron
├── preload.js             # Script de pré-carregamento (ponte entre Main e Renderer)
├── renderer.js            # Lógica do frontend (Renderer Process)
├── index.html             # Interface do usuário
├── package.json           # Configuração do projeto e dependências
└── README.md              # Documentação do projeto
</code></pre>

<h2>📚 Documentação da API</h2>

<h3><code>main.js</code></h3>
<ul>
  <li><strong>Função <code>createWindow()</code></strong>: Cria a janela principal do Electron.</li>
  <li><strong>Função <code>initializeWhatsApp()</code></strong>: Inicializa o cliente do WhatsApp.</li>
  <li><strong>Eventos do WhatsApp</strong>: Configura os eventos para lidar com QR Code, mensagens, etc.</li>
</ul>

<h3><code>preload.js</code></h3>
<ul>
  <li>Expõe funcionalidades seguras para o Renderer Process usando <code>contextBridge</code>.</li>
</ul>

<h3><code>renderer.js</code></h3>
<ul>
  <li>Lida com a interface do usuário e a interação com o Main Process.</li>
</ul>

<h3><code>index.html</code></h3>
<ul>
  <li>Interface gráfica do usuário, exibindo o QR Code, mensagens e status.</li>
</ul>

<h2>🤝 Contribuição</h2>

<p>Contribuições são bem-vindas! Siga os passos abaixo:</p>

<ol>
  <li>Faça um fork do projeto.</li>
  <li>Crie uma branch para sua feature (<code>git checkout -b feature/nova-feature</code>).</li>
  <li>Commit suas mudanças (<code>git commit -m 'Adiciona nova feature'</code>).</li>
  <li>Faça push para a branch (<code>git push origin feature/nova-feature</code>).</li>
  <li>Abra um Pull Request.</li>
</ol>

<h2>📄 Licença</h2>

<p>Este projeto está licenciado sob a Licença MIT. Veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>

<p align="center">Feito com ❤️ por <a href="https://github.com/seu-usuario">Seu Nome</a></p>
