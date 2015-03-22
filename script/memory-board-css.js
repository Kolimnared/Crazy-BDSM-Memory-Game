/**
 * Created by user on 13.3.2015 г..
 */
/************************* CONSTRUCTORS *************************/
function Levels(boardWidth, boardHeight, timeInSec, tiles){
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.timeInSec = timeInSec;
    this.tilesCount = tiles;
    this.cardsFlipped = 0;
}

function Card(pair, id, imgUrl){
    var image = document.createElement('div');
    image.id = id;
    image.setAttribute('backside', imgUrl );
    image.setAttribute("pairID", pair);
    image.setAttribute("flipped", "false");
   // image.addEventListener('click', hitMe);

    return image;
}
/******************************************************************/

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function generateDeck(count){
    var Deck = [];

    for(var i = 0, j = 0; i < count; i += 2, j++){
        Deck[i] = new Card(j,"tile_" + i, "url(\'images/tiles/tile_" + j + ".jpg\')");
        Deck[i+1] = new Card(j, "tile_" + (i + 1), "url(\'images/tiles/tile_" + j + ".jpg\')");
    }
    Deck.shuffle();

    return Deck;

}

function startLevel(lvl, memory_board){
    var lvlWidth  = [300, 400, 500, 400, 400, 500, 600, 600];
    var lvlHeight = [200, 200, 200, 300, 400, 400, 400, 500];
    var lvlTime   = [10, 12, 14, 16, 20, 26, 30, 40];
    var lvlTiles = [6, 8, 10, 12, 16, 20, 24, 30];

    var Level = new Levels(lvlWidth[lvl], lvlHeight[lvl], lvlTime[lvl], lvlTiles[lvl]);

    memory_board.style.width = Level.boardWidth + "px";
    memory_board.style.height = "0";
    memory_board.style.visibility = "visible";
    slideOpen(memory_board, Level.boardHeight, 1.2);
    var Deck = generateDeck(Level.tilesCount);
    setTimeout(function(){
        addTiles(memory_board, Deck, 0, Level);
    }, 1200);



}

function addTiles(board, Deck, i, Level){
    if(i < Level.tilesCount){
        setTimeout(function(){
            board.appendChild(Deck[i]);
            addTiles(board, Deck, i+1, Level);

            if(i === (Level.tilesCount-1) ){
             startPlaying(Deck, Level);

            }
        }, 100);
    }
}



function flipTile(){

}

function runTimer(timeInSec){
    var progress = document.getElementById("loading-bar-progress");
    progress.style.width = "0%";
    progress.style.transition = "width " + timeInSec +"s linear 0s";
    progress.style.width = "100%";
}

function startPlaying(Deck, Level){
    var cardsOpened = 0;
    var tempCard;

    for(var i = 0; i < Deck.length; i++){
        Deck[i].addEventListener('click', hitMe);
    }

    function hitMe(e){
        if(this.getAttribute('flipped') === "false"){
            this.setAttribute('flipped', "true");
            this.style.background = this.getAttribute("backside");
            if(cardsOpened === 0){
                tempCard = this;
                cardsOpened = 1;
            }else if(cardsOpened === 1){
                cardsOpened = 0;
                if(this.getAttribute('pairId') === tempCard.getAttribute('pairID')){
                    Level.cardsFlipped += 2;
                    if(Level.tilesCount === Level.cardsFlipped){
                        alert('ok');
                    }
                }else{

                     /*   this.setAttribute('flipped', "false");
                        this.style.background = "url('images/tile_bg.jpg')";
                        tempCard.setAttribute('flipped', "false");
                        tempCard.style.background = "url('images/tile_bg.jpg')";*/
                        flip2Back(this, tempCard);
                }
            }
        }
    }

    function flip2Back(cardA, cardB){
        setTimeout(function(){
            cardA.setAttribute('flipped', "false");
            cardA.style.background = "url('images/tile_bg.jpg')";
            cardB.setAttribute('flipped', "false");
            cardB.style.background = "url('images/tile_bg.jpg')";
        }, 750);
    }
}


/***-------------------------------- MAIN BOARD --------------------------------***/
function memoryBoard(){
    var memory_board_wrapper = document.getElementById("memory-board-wrapper");
    var memory_board =  document.getElementById("memory-board");
    var playerName = document.getElementById("player-name");
    var lvlInfo = document.getElementById("level-info");
    var scoreInfo = document.getElementById("score-info");
    playerName.innerHTML = "Player: " + Player.nick;
    lvlInfo.innerHTML  = "Level: " + 1;
    scoreInfo.innerHTML = "Score: " + Player.score;
    memory_board_wrapper.style.visibility = "visible";
    memory_board.style.height = "0px";
    memory_board.style.visibility = "visible";
    startLevel(2, memory_board);
}