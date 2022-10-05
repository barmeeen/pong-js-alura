//Pong inspirado no tema Dracula do VSCode
//Dimensão do background
let width = 600;
let height = 400;

//Dimensões da bola
let xBall = 300;
let yBall = 200;
let diametro = 15;
let raio = diametro / 2 ;

//Velocidades da bola
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis raquete 1
let xRacket = 5;
let yRacket = 150;
let lenghtRacket = 10;
let heightRacket = 90;

//Variáveis raquete 2
let xRacket2 = 585;
let yRacket2 = 150;
let velocidadeRacket2;

//Colisao das raquetes pela biblioteca p5.collide2d.js 
let colidiu = false;

//Placar do jogo
let pontosPlayer1 = 0;
let pontosPlayer2 = 0;

//Sounds
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("sounds/trilha.mp3")
  ponto = loadSound("sounds/ponto.mp3")
  raquetada = loadSound("sounds/raquetada.mp3")
}

function setup() {
createCanvas(600, 400);
trilha.loop();
}

function draw() {
  background(color(40,42,54));
  contador();
  placar();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRacket, yRacket);
  mostraRaquete(xRacket2, yRacket2);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRacket, yRacket);
  colisaoRaqueteBiblioteca(xRacket2, yRacket2);
  movimentaRaquete2();
 
}

function mostraBolinha(){
  fill(color(0,250,154));
  circle(xBall, yBall, diametro);
}

function movimentaBolinha(){
  xBall += velocidadeXBolinha;
  yBall += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBall + raio > width || xBall - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBall +raio > height || yBall - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  fill(color(186,85,211));
  rect(x, y, lenghtRacket, heightRacket);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
}

function movimentaRaquete2(){
  velocidadeRacket2 = yBall- yRacket2 -lenghtRacket / 2 - 90;
  yRacket2 += velocidadeRacket2;
 }

function colisaoRaquete(){
  if (xBall - raio < xRacket + lenghtRacket
    && yBall + raio > yRacket){
      velocidadeXBolinha *= -1;
    }
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, lenghtRacket, heightRacket, xBall, yBall, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function placar(){
  textAlign(CENTER);
  textSize(20);
  fill(color(105,89,205));
  rect(150, 0, 100, 40);
  fill(color(105,89,205));
  rect(350, 0, 100, 40);
  fill(255);
  text(pontosPlayer1, 200, 25);
  fill(255)
  text(pontosPlayer2, 400, 25);
  
}
function contador(){
  if (xBall > 590){
    pontosPlayer1 += 1;
    ponto.play();
  }
  if (xBall < 10){
    pontosPlayer2 += 1;
    ponto.play();
  }
}