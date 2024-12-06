document.addEventListener('DOMContentLoaded', () => {
    const produtos = {
        airfrayer: {
            nome: "AirFrayer",
            imagem: "airfrayer.png",
            qrCode: "qrcode1.jpg",
            valor: "R$ 200,00",
            pixCode: "00020101021126580014br.gov.bcb.pix01362e00f5b4-46c0-4d13-906b-b00a4ad12c1552040000530398654040.105802BR5924MATHEUS ZIBORDI PEDREIRA6009SAO PAULO622905251JE1E8ZXJ89NYQVKQZVTYJS6T6304AEA9",
            linkCartao: "https://mpago.li/23H1u7n"
        },
        faqueiro: {
            nome: "Faqueiro Inox",
            imagem: "faqueiro.png",
            qrCode: "qrcode2.jpg",
            valor: "R$ 500,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136faqueiro-pix-code",
            linkCartao: "https://mpago.li/24F5a7b"
        },
        tv: {
            nome: "Televisão 43 Polegadas",
            imagem: "tv.png",
            qrCode: "qrcode3.jpg",
            valor: "R$ 1.500,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136tv-pix-code",
            linkCartao: "https://mpago.li/25G8c9p"
        },
        sofa: {
            nome: "Sofá retrátil",
            imagem: "sofa.png",
            qrCode: "qrcode4.jpg",
            valor: "R$ 2.600,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136sofa-pix-code",
            linkCartao: "https://mpago.li/26H2j4k"
        },
        geladeira: {
            nome: "Geladeira",
            imagem: "geladeira.png",
            qrCode: "qrcode5.jpg",
            valor: "R$ 3.000,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136geladeira-pix-code",
            linkCartao: "https://mpago.li/27I3x5y"
        },
        fogao: {
            nome: "Fogão",
            imagem: "fogao.png",
            qrCode: "qrcode6.jpg",
            valor: "R$ 1.600,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136fogao-pix-code",
            linkCartao: "https://mpago.li/28J7z9w"
        }
    };

    // Função do menu lateral
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLateral = document.querySelector('.menu-lateral');

    if (hamburgerMenu && menuLateral) {
        hamburgerMenu.addEventListener('click', () => {
            menuLateral.classList.toggle('ativo');
        });

        document.addEventListener('click', (event) => {
            if (
                !menuLateral.contains(event.target) && 
                !hamburgerMenu.contains(event.target)
            ) {
                menuLateral.classList.remove('ativo');
            }
        });
    }

    // Funções do modal
    const botoesPresentear = document.querySelectorAll('.btn-presentear');
    const modal = document.getElementById('modal');
    const modalImagem = document.getElementById('modal-imagem');
    const modalNome = document.getElementById('modal-nome');
    const modalValor = document.getElementById('modal-valor');
    const modalInicial = document.getElementById('modal-inicial');
    const modalPix = document.getElementById('modal-pix');
    const modalCartao = document.getElementById('modal-cartao');
    const closeModal = document.getElementById('close-modal');
    const btnCopiar = document.getElementById('btn-copiar');
    const btnPix = document.getElementById('btn-pix');
    const btnCartao = document.getElementById('btn-cartao');

    const modalTexto = document.createElement('p');
    modalTexto.className = 'modal-texto';
    modalTexto.textContent = "O pagamento por Pix é o mais rápido e sem taxas! Mas o pagamento por cartão também é muito bem-vindo. 😄";

    botoesPresentear.forEach((botao, index) => {
        const ids = Object.keys(produtos);
        botao.addEventListener('click', () => {
            const produto = produtos[ids[index]];
            if (produto) {
                modalImagem.src = produto.imagem;
                modalNome.textContent = produto.nome;
                modalValor.textContent = produto.valor;
                btnCopiar.dataset.pixCode = produto.pixCode;
                btnCartao.dataset.linkCartao = produto.linkCartao;
                modal.style.display = 'block';
                modalInicial.style.display = 'flex';
                modalPix.style.display = 'none';
                modalCartao.style.display = 'none';

                if (!modalInicial.contains(modalTexto)) {
                    modalInicial.appendChild(modalTexto);
                }
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    btnCopiar.addEventListener('click', () => {
        const pixCode = btnCopiar.dataset.pixCode;
        navigator.clipboard.writeText(pixCode)
            .then(() => alert('Código Pix copiado para a área de transferência!'))
            .catch(() => alert('Não foi possível copiar o código Pix. Tente novamente.'));
    });

    btnPix.addEventListener('click', () => {
        modalInicial.style.display = 'none';
        modalPix.style.display = 'flex';
    
        // Atualizar imagem do QR code
        const produtoAtual = produtos[modalNome.textContent.toLowerCase()];
        const qrCodePath = produtoAtual?.qrCode || 'default_qr.jpg';
        document.getElementById('modal-qr').src = qrCodePath;
    
        // Ajustar layout com botão Copiar e Enviar Comprovante em coluna
        modalPix.innerHTML = ''; // Limpa o conteúdo anterior
        const qrImg = document.createElement('img');
        qrImg.className = 'modal-qr';
        qrImg.src = qrCodePath;
        qrImg.alt = 'QR Code do Pix';
    
        const btnCopiar = document.createElement('button');
        btnCopiar.className = 'btn-copiar';
        btnCopiar.textContent = 'Copiar código Pix';
        btnCopiar.onclick = () => navigator.clipboard.writeText(produtoAtual.pixCode)
            .then(() => alert('Código Pix copiado!'))
            .catch(() => alert('Erro ao copiar o código Pix.'));
    
        const btnEnviarComprovante = document.createElement('button');
        btnEnviarComprovante.className = 'btn-enviar';
        btnEnviarComprovante.textContent = 'Enviar comprovante';
        btnEnviarComprovante.onclick = () => window.open('https://www.casar.com', '_blank');
    
        modalPix.appendChild(qrImg);
        modalPix.appendChild(btnCopiar);
        modalPix.appendChild(btnEnviarComprovante);
    });
    
    btnCartao.addEventListener('click', () => {
        modalInicial.style.display = 'none';
        modalCartao.style.display = 'flex';
    
        // Ajustar layout com botões em coluna
        modalCartao.innerHTML = ''; // Limpa o conteúdo anterior
        const btnIrParaPagamento = document.createElement('button');
        btnIrParaPagamento.className = 'btn-pix';
        btnIrParaPagamento.textContent = 'Ir para link de pagamento';
        btnIrParaPagamento.onclick = () => {
            const linkCartao = produtos[modalNome.textContent.toLowerCase()].linkCartao;
            window.open(linkCartao, '_blank');
        };
    
        const btnEnviarComprovante = document.createElement('button');
        btnEnviarComprovante.className = 'btn-enviar';
        btnEnviarComprovante.textContent = 'Enviar comprovante';
        btnEnviarComprovante.onclick = () => window.open('https://www.casar.com', '_blank');
    
        modalCartao.appendChild(btnIrParaPagamento);
        modalCartao.appendChild(btnEnviarComprovante);
    });
    

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
