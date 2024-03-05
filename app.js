let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
 

function exibirMensagemInicial(){
    exibirNaTela ('h1', 'Jogo do número secreto!');
    exibirNaTela ('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirNaTela('h1', 'Acertou');
        let paralvraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Você descobriu o número secreto com ${tentativas} ${paralvraTentativa}!`;
        exibirNaTela('p', mensagensTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirNaTela('p', 'O número é menor!');
        } else {
            exibirNaTela('p', 'O número é maior!');
        }
        tentativas ++;
        limparCampo();
    }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
