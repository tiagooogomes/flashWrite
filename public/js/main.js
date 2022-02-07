let tempoInicial = $('#tempo-digitacao').text();
let campo = $('.campo-digitacao');

//(document).ready();
$(function() {
    atualizarTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    inicializarMarcadores();
    $('#botao-reiniciar').click(reiniciarJogo);
});

function atualizarTamanhoFrase() {
    let frase = $('.frase').text();
    let numeroPalavras = frase.split(' ').length;
    let tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numeroPalavras);
}


function inicializarContadores() {
    campo.on('input', function() {
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        let qtdCaracteres = conteudo.length;

        $('#contador-palavras').text(qtdPalavras);
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializarCronometro() {
    let tempoRestante =  $('#tempo-digitacao').text();
    campo.one('focus', function() {
        let cronometro = setInterval(function() {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante < 1) {
                clearInterval(cronometro);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    campo.toggleClass('campo-desativado');
    inserePlacar();
}

function inicializarMarcadores() {
    let frase = $('.frase').text();
    campo.on('input', function() {
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel) {
            campo.addClass('borda-verde');
            campo.removeClass('borda-vermelha');
        } else {
            campo.addClass('borda-vermelha');
            campo.removeClass('borda-verde');
        }
    });
}

function reiniciarJogo() {
    campo.attr('disabled', false);
    campo.val('');
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);
    inicializarCronometro();
    campo.removeClass('campo-desativado');
    campo.removeClass('borda-vermelha');
    campo.removeClass('borda-verde');
};

