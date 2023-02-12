// Initial data (Dados iniciais)
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

// Time to play (Vez de jogada)
let player = "";
// Winner's message - (Mensagem do vencedor)
let warning = "";
// Check if the game is running (Verificar se o jogo está rolando ou não)
let playing = false;
reset();

// Events (Eventos)
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

// Functions (Funções)
function itemClick(event) {
  let item = event.target.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}
function reset() {
  //clearing the warnings (Limpando avisos)
  warning = "";

  //Randomly choosing time(escolhendo a vez aleatoriamente)
  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "x" : "o";

  //clearing the plays (Limpando as jogadas)
  for (let i in square) {
    square[i] = "";
  }
  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }
  checkGame();
}
function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}
function togglePlayer() {
  player = player === "x" ? "o" : "x";
  renderInfo();
}
function checkGame(){
   if(checkInnerFor('x')){
      warning = "O 'x' venceu!"
      playing = false;
   }else if(checkInnerFor('o')){
      warning = "O 'o' venceu!"
      playing = false;
   }else if(ifFull()){
      warning = "Deu impate!"
      playing = false;
   }
}
function checkInnerFor(player){
   let possibilities = [
      'a1,a2,a3',
      'b1,b2,b3',
      'c1,c2,c3',
      'a1,b1,c1',
      'a2,b2.c2',
      'a3,b3,c3',
      'a1,b2,c3',
      'a3,b2,c1'
   ];

   for(let w in possibilities){
      let pArray = possibilities[w].split(',');
      let hasWon = pArray.every(option => square[option] === player);
      if(hasWon){
         return true;
      }
   }
   return false;
}
function ifFull(){
   for(let i in square){
      if(square[i] === ''){
         return false;
      }
   }
   return true;
}