const informacoesIniciais = $('#informacoes').html();
let CEP = 0;
let latitude;
let longitude;

$(function() {
    $('#botao-consulta').click(consultarCEP);
    $('input').on('input', verificarValidade);
    $('#botao-mapa').click(mostrarMapa);
});

function consultarCEP() {
    CEP = $('input').val();

    if($('#informacoes').html() !== informacoesIniciais){
        $('#informacoes').html(informacoesIniciais);
    }

    fazerRiquisicao();
    aparecerInformacoes();
    atualizarMostradorCEP(CEP);
}

function aparecerInformacoes() {
    $('footer').css('display', 'none');
    $('#teste').stop().show(600);
}

function fazerRiquisicao() {
    $.ajax({
        url: `https://cep.awesomeapi.com.br/json/${CEP}`
    })

    .fail(function() {
        console.log( "error" );
        $('#cidade').html('CEP não encontrado')
      })

    .done(data => {
        console.log(data);
        $('#cidade').html(data.city)
        $('#latitude').html(data.lat);
        $('#longitude').html(data.lng);
        $('#ddd').html(`(${data.ddd}) 9 0000-0000`);
        $('#ibge').html(data.city_ibge);

        latitude = data.lat
        longitude = data.lng
    });
}

function atualizarMostradorCEP(cep) {
    const valor = cep

    $('#info1').html(valor[0]);
    $('#info2').html(valor[1]);
    $('#info3').html(valor[2]);
    $('#info4').html(valor[3]);
    $('#info5').html(valor[4]);
    $('#info6').html(valor[5]); 
    $('#info6').append(valor[6]); 
    $('#info6').append(valor[7]); 
}

function verificarValidade() {
    let valorDigitado = /^\d{5}-\d{3}$|^\d{8}$/.test($('input').val());

    if(valorDigitado === false){
        $('input').removeClass('cor-verde');
        $('input').addClass('cor-vermelha');
        $('label').html('Por favor digite um formato aceito');
    } else {
        $('input').removeClass('cor-vermelha');
        $('input').addClass('cor-verde');
        $('label').html('Formato aceito');
    }

    if($('input').val().length === 0) {
        $('input').removeClass('cor-vermelha');
        $('input').removeClass('cor-verde');
        $('label').html('Digite seu CEP sem o traço');
    }
}

function mostrarMapa() { 
    $('#informacoes').html(`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed" allowfullscreen="" loading="lazy"></iframe>`);
}