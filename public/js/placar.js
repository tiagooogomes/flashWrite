$('#botao-placar').click( mostrarPlacar)

function inserePlacar() {
    let corpoTabela = $('.placar').find('tbody');
    let usuario = 'Você'
    let numPalavras = $('#contador-palavras').text();
    let linha = novalinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha)

    corpoTabela.prepend(linha);      
    
    $('.placar').slideDown(500);
    scrollPlacar();

}

function scrollPlacar() {
    let posicaoPlacar = $('.placar').offset().top;
    console.log('teste')
    $('html, body').animate(
    {
        scrollTop: posicaoPlacar + 'px'
    },1000);
}

function novalinha(usuario, palavras) {
    let linha = $('<tr>');
    let colunaUsuario = $('<td>').text(usuario);
    let colunaPalavras = $('<td>').text(palavras);
    let colunaRemover = $('<td>');
    let botao = $('<button>').addClass('botao-remover').text('Remover');

    colunaRemover.append(botao);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
        event.preventDefault();
        let linha = $(this).parent().parent().fadeOut(1000);
        
        setTimeout(function() {
            linha.remove();
        }, 1000);
}

function mostrarPlacar() {
    $('.placar').stop().slideToggle(600);
    scrollPlacar();
}