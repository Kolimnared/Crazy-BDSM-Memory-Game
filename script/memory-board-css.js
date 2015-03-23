/**
 * Created by user on 13.3.2015 г..
 */
/************************* CONSTRUCTORS *************************/
function Levels(lvl, boardWidth, timeInSec, tiles){
    this.level = lvl;
    this.boardWidth = boardWidth;
    this.timeInSec = timeInSec;
    this.tilesCount = tiles;
    this.cardsFlipped = 0;
    this.playing = false;
}

function Card(pair, id, imgUrl){
    var image = document.createElement('div');
    image.id = id;
    image.setAttribute('backside', imgUrl );
    image.setAttribute("pairID", pair);
    image.setAttribute("flipped", "false");

    return image;
}

var Board = new function mBoard(){
    this.memory_board_wrapper = document.getElementById("memory-board-wrapper");
    this.memory_board =  document.getElementById("memory-board");
    this.playerName = document.getElementById("player-name");
    this.lvlInfo = document.getElementById("level-info");
    this.scoreInfo = document.getElementById("score-info");
};

var timer = new function Timer(){
    var progress = document.getElementById("loading-bar-progress");
    this.start = function(Level){
        Level.playing = true;
        progress.style.width = "0%";
        progress.style.transition = "width " + Level.timeInSec +"s linear 0s";
        progress.style.width = "100%";
    };
    this.stop = function(Level){
        if(Level.playing === true){
            gameOver();
        }
    };
    this.reset = function(){
        progress.style.transition = "width 0s linear 0s";
        progress.style.width = "0%";
    }
};
/******************************************************************/

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

function generateDeck(count){
    var Deck = [];

    for(var i = 0, j = 0; i < count; i += 2, j++){
        Deck[i] = new Card(j,"tile_" + i, "url(\'images/tiles/tile_" + j + ".jpg\')");
        Deck[i+1] = new Card(j, "tile_" + (i + 1), "url(\'images/tiles/tile_" + j + ".jpg\')");
    }
    Deck.shuffle();

    return Deck;

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

function gameOver(){
    alert('GAME OVER');
    location.reload();
}

function levelUp(Level, Deck){
    var nextLevel = Level.level;
    Level = null;
    Deck = null;

    timer.reset();
    alert('Level: ' + (nextLevel + 1));
    memoryBoard(nextLevel);
}



function startPlaying(Deck, Level){
    var cardsOpened = 0;
    var tempCard;

    for(var i = 0; i < Deck.length; i++){
        Deck[i].addEventListener('click', hitMe);
    }

    setTimeout(function(){
        timer.stop(Level, Deck);
    }, Level.timeInSec*1000);
    timer.start(Level);

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
                    Player.score += 2*Level.level;
                    Board.scoreInfo.innerHTML = "Score: " + Player.score;
                    if(Level.tilesCount === Level.cardsFlipped){
                        Level.playing = false;
                        levelUp(Level,  Deck);
                    }
                }else{
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

function winn(){
    alert('You beat the game madafaka');
}
/***-------------------------------- MAIN BOARD --------------------------------***/
function memoryBoard(lvl){
    if(lvl === 10){
        winn();
    }
    var lvlWidth  = [300, 400, 500, 400, 400, 600, 500, 600, 600, 600];
    var lvlTime   = [12, 16, 20, 25, 30, 35, 40, 50, 60, 80];
    var lvlTiles = [6, 8, 10, 12, 16, 18, 20, 24, 30, 36];
    var Level = new Levels(lvl + 1, lvlWidth[lvl], lvlTime[lvl], lvlTiles[lvl]);

    var Deck = generateDeck(Level.tilesCount);
    Board.playerName.innerHTML = "Player: " + Player.nick;
    Board.lvlInfo.innerHTML  = "Level: " + Level.level;
    Board.scoreInfo.innerHTML = "Score: " + Player.score;
    Board.memory_board_wrapper.style.visibility = "visible";
    Board.memory_board.innerHTML = "";
    Board.memory_board.style.width = Level.boardWidth + "px";
    Board.memory_board.style.visibility = "visible";

    setTimeout(function(){
        addTiles(Board.memory_board, Deck, 0, Level);
    }, 500);
}