const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBotao = document.querySelector('#start-pause')
const iniciarOuPausarBotao = document.querySelector('#start-pause span')
//imagem dos botões
const iconePausaEPlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer')


const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
let tempoDecorridoEmSegundos = 1500
let intervaloId = null


const musicaPlay = new Audio('/sons/play.wav') 
const musicaPause = new Audio('/sons/pause.mp3')
const musicaQuandoZerar= new Audio('/sons/beep.mp3')


musica.loop = true

//change usado para checkbox, por ser verdadeiro ou falso
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//Mudando a cor de fundo e a imagem após um clique no botão
focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBotao.classList.add('active')
})
curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
   alterarContexto('descanso-curto')
   curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})
//remover a sombra após o clique em outro botão
function alterarContexto (contexto) {
    mostrarTempo()

    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    //mudando o texto atraves do click e junto com a cor de fundo e a imagem
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                
                break;
                case "descanso-curto":
                   titulo.innerHTML = ` Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa.</strong>`
                break;
                case "descanso-longo":
                    titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                    default:
                        break;
    }
}
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaQuandoZerar.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    //mostra o tempo que está passando
    mostrarTempo()
   
// console.log('Temporizador: ' + tempoDecorridoEmSegundos)

}
//contagem regressiva após clicar no botão
startPauseBotao.addEventListener('click', iniciarOuPausar)



function iniciarOuPausar() {
    //interromper a contagem
    if(intervaloId){
        musicaPause.play()       
        zerar()
        return
    }
    
    musicaPlay.play()    
    intervaloId = setInterval(contagemRegressiva, 1000)
    iconePausaEPlay.setAttribute('src','imagens/pause.png')     
    iniciarOuPausarBotao.textContent ="Pausar"

}

function zerar() {
    //interromper transformando o temporizador em nulo.
    clearInterval(intervaloId)
    iniciarOuPausarBotao.textContent = "Começar"
    iconePausaEPlay.setAttribute('src','imagens/play_arrow.png')
    intervaloId = null
}
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
//mostrar o tempo que está pausado na tela
mostrarTempo()