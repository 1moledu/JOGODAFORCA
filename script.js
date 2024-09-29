/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {

    frutas: ["melancia", "ameixa", "pitaia", "mirtilo"],
    profissoes: ["padeiro", "escritor", "chaveiro", "decorador"],
    cores: ["fucsia", "magenta", "prata", "dourado"],
    animais: ["lobo-guara", "jararaca", "alce", "coiote"]

};

function retornaArrayDeCategorias(){

    return Object.keys(categorias);
}

function retornaCategoria(){

    const arrayCategorias = retornaArrayDeCategorias();
    let indice = retornaNumAleatorio(arrayCategorias.length);
    return arrayCategorias[indice];
}

function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
}

function retornaNumAleatorio(max){

    return Math.floor(Math.random() * max);
}

function definePalavra(){

    //acessando a propriedade em categorias (frutas, profissoes, cores, animais)
    const arraySelecionado = categorias[categoria.innerHTML];
    let indice = retornaNumAleatorio(arraySelecionado.length);
    palavraProposta = arraySelecionado[indice];
    console.log(palavraProposta);
    ocultaPalavra();

}

function ocultaPalavra(){

    let palavraOculta = "";

    for(let i = 0; i < palavraProposta.length; i++){
        palavraOculta += "-";
    }
    exibePalavraInterface(palavraOculta);
}

function exibePalavraInterface(palavra){
    palavraInterface.innerHTML = palavra;
}


/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

function tentativa(letra){

    /*for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
        }
    }*/

    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras Erradas " + letrasErradasArray;
        
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    verificaFimDeJogo();
}

function atualizaPalavraInterface(letra){
    
    let aux = "";
    for(let i = 0; i < palavraProposta.length; i++){

        if(palavraProposta[i] === letra){
            aux += letra;
        }
        else if(palavraInterface.innerHTML[i] != "-"){
            aux += palavraInterface.innerHTML[i];
        }
        else{
            aux += "-";
        }
    }
    
    exibePalavraInterface(aux);
}
/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

function verificaFimDeJogo(){

    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavraInterface("Você Venceu!");
        window.removeEventListener("keypress", retornaLetra);
        indiceBoneco = 0;
    }
    else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavraInterface("Você Perdeu!");
        window.removeEventListener("keypress", retornaLetra);
        indiceBoneco = 0;
    }

    
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
    exibeCategoria();
    definePalavra();
}

window.addEventListener("load", iniciaJogo);
