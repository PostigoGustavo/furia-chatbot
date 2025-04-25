document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar o histórico de conversas do LocalStorage
    function loadConversationHistory() {
        const conversation = JSON.parse(localStorage.getItem("conversation")) || [];
        conversation.forEach(msg => {
            showMessage(msg.text, msg.sender, false);
        });

        // Se o histórico estiver vazio (após limpar), exibe a mensagem inicial
        if (conversation.length === 0) {
            showMessage("Olá! Eu sou o chatbot do FURIA CS. Digite 'oi' para começar.", "bot");
        }
    }

    // Função para salvar mensagens no LocalStorage
    function saveMessageToLocalStorage(text, sender) {
        let conversation = JSON.parse(localStorage.getItem("conversation")) || [];
        conversation.push({ text, sender, timestamp: new Date().toISOString() });
        localStorage.setItem("conversation", JSON.stringify(conversation));
    }

    // Função para exibir mensagem no chat
    function showMessage(text, sender, save = true) {
        const chatWindow = document.getElementById("chat-window");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.innerText = text;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        if (save) {
            saveMessageToLocalStorage(text, sender);
        }
    }

    // Função para exibir botões de respostas rápidas
    function showQuickReplies() {
        const chatWindow = document.getElementById("chat-window");
        const quickDiv = document.createElement("div");
        quickDiv.classList.add("quick-buttons");

        const opcoes = ["Notícias", "Estatísticas", "Agenda", "Curiosidades", "Loja"];
        opcoes.forEach(opcao => {
            const btn = document.createElement("button");
            btn.classList.add("quick-btn");
            btn.innerText = opcao;
            btn.addEventListener("click", () => {
                processUserMessage(opcao);
                quickDiv.remove();
            });
            quickDiv.appendChild(btn);
        });
        chatWindow.appendChild(quickDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Função para limpar o histórico de mensagens
    function clearChatHistory() {
        localStorage.removeItem("conversation"); // Apaga do LocalStorage
        document.getElementById("chat-window").innerHTML = ""; // Apaga todas as mensagens da tela
    
        // Exibe a mensagem de confirmação de histórico apagado
        showMessage("🗑️ Histórico de mensagens apagado! Iniciando uma nova conversa em instantes...", "bot");
    
        // Após um intervalo de 2 segundos, exibe a mensagem inicial do bot
        setTimeout(() => {
            localStorage.removeItem("conversation"); // Apaga do LocalStorage
            document.getElementById("chat-window").innerHTML = ""; // Apaga todas as mensagens da tela
            showMessage("Olá! Eu sou o chatbot do FURIA CS. Digite 'oi' para começar.", "bot");
        }, 2000); // 2000 milissegundos = 2 segundos
    }
    


    // Adicionando evento ao botão "Limpar Histórico"
    document.getElementById("clear-history-btn").addEventListener("click", clearChatHistory);

    // Funções para buscar informações (simulação de API)
    function fetchLatestNews() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("💥 Última notícia: O FURIA acaba de anunciar novos reforços para a próxima temporada!");
                showQuickReplies()
            }, 1500);
        });
    }

    function fetchStatistics() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("📊 Estatísticas: Vitórias: 15, Derrotas: 5, K/D médio: 1.5");
                showQuickReplies()
            }, 1200);
        });
    }

    function fetchAgenda() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("📅 Agenda: Próximo jogo:\n- 25/10: FURIA vs TimeX\n- 30/10: FURIA vs TeamY");
                showQuickReplies()
            }, 1200);
        });
    }

    function fetchCuriosities() {
        const curiosidades = [
            "🤫 O FURIA surgiu de uma paixão pelos eSports e se tornou um dos times mais dinâmicos do cenário!",
            "🔥 O nome 'FURIA' representa a agressividade e determinação do time em competições.",
            "🏆 O FURIA já participou de grandes torneios internacionais, colocando o Brasil em destaque no CS.",
            "🎯 Um dos diferenciais do FURIA é seu estilo de jogo agressivo e altamente estratégico.",
            "🚀 O time começou com poucos recursos e hoje é uma das maiores organizações de eSports do país!",
            "🎮 O FURIA é conhecido por sua habilidade em criar jogadas inesperadas e surpreendentes.",
            "🤫 FURIA é uma organização brasileira que atua nas modalidades de e-sports em Counter-Strike 2, Rocket League, League of Legends, Valorant, Rainbow Six: Siege, Apex Legends, e Futebol de 7. Fundada em 2017, a FURIA possui o time de Counter-Strike que melhor desempenha nas competições internacionais mais recentes, sempre a frente nas colocações entre equipes do país.",
            "😎 A organização foi eleita por dois anos consecutivos, em 2020 e 2021, como a melhor organização de esportes eletrônicos no Prêmio eSports Brasil. Em 2022, foi apontada como a quinta maior organização de esportes eletrônicos do mundo pelo portal norte-americano Nerd Street."
        ];
    
        return new Promise((resolve) => {
            setTimeout(() => {
                const curiosidadeAleatoria = curiosidades[Math.floor(Math.random() * curiosidades.length)];
                resolve(curiosidadeAleatoria);
                showQuickReplies();
            }, 1200);
        });
    }

    function fetchStore() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("🛒 Loja: Confira nossos produtos oficiais em https://www.furia.gg/produtos!");
                showQuickReplies()
            }, 1200);
        });
    }

    // Função para processar mensagens do usuário
    function processUserMessage(message) {
        showMessage(message, "user");
        processBotResponse(message);
    }

    // Função para processar a resposta do bot com chamadas assíncronas e mensagens de "carregando"
    function processBotResponse(message) {
        const msg = message.toLowerCase().trim();

        if (msg.includes("notícia") || msg === "notícias") {
            showMessage("Carregando as notícias...", "bot");
            fetchLatestNews().then(response => {
                showMessage(response, "bot");
            });
        } else if (msg.includes("estatística") || msg === "estatísticas") {
            showMessage("Carregando as estatísticas...", "bot");
            fetchStatistics().then(response => {
                showMessage(response, "bot");
            });
        } else if (msg.includes("agenda") || msg === "agenda") {
            showMessage("Carregando a agenda...", "bot");
            fetchAgenda().then(response => {
                showMessage(response, "bot");
            });
        } else if (msg.includes("curiosidade") || msg === "curiosidades") {
            showMessage("Carregando curiosidades...", "bot");
            fetchCuriosities().then(response => {
                showMessage(response, "bot");
            });
        }
        else if (msg.includes("loja") || msg === "loja") {
            showMessage("Carregando a loja...", "bot");
            fetchStore().then(response => {
                showMessage(response, "bot");
            });
        } else if (msg === "oi" || msg === "olá") {
            showMessage("Olá! Sou o chatbot oficial do FURIA CS. Selecione uma opção:", "bot");
            showQuickReplies();
        } else {
            showMessage("Desculpe, não entendi. Tente usar uma das opções: Notícias, Estatísticas, Agenda ou Curiosidades.", "bot");
            showQuickReplies();
        }
    }

    // Evento de clique para enviar mensagem
    const sendBtn = document.getElementById("send-btn");
    sendBtn.addEventListener("click", () => {
        const inputField = document.getElementById("user-input");
        const message = inputField.value;
        if (message.trim() !== "") {
            processUserMessage(message);
            inputField.value = "";
        }
    });

    // Permite enviar a mensagem com a tecla Enter
    const userInput = document.getElementById("user-input");
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendBtn.click();
        }
    });

    // Inicializa o chat: carrega o histórico e exibe mensagem inicial se necessário
    loadConversationHistory();
});
