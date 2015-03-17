/**
 * Created by user on 13.3.2015 г..
 */
var lvlWidth  = [300, 400, 500, 400, 400, 500, 600, 600];
var lvlHeight = [200, 200, 200, 300, 400, 400, 400, 500];
var lvlTime   = [10, 12, 14, 16, 20, 26, 30, 40];
var lvlTiles = [6, 8, 10, 12, 16, 20, 24, 30];

function Levels(boardWidth, boardHeight, timeInSec, tiles){
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.timeInSec = timeInSec;
    this.tiles = tiles;
    this.gameOn = false;
}

function Tile(id, imgPath){
    this.tile_id = id;
    this.imgPath = imgPath;
    this.flipped = false;
    this.img ;
    this.open = function(){
        alert(this.tile_id)
    }
}



Array.prototype.memory_tile_shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function generateTiles(count){
    var tilesArr = [];

    for(var i = 0, j = 0; i < count; i += 2, j++){
        tilesArr[i] = new Tile("tile_" + j, "images/tiles/tile_" + j + ".jpg");
        tilesArr[i+1] = new Tile("tile_" + j, "images/tiles/tile_" + j + ".jpg");
    }
    tilesArr.memory_tile_shuffle();

    return tilesArr;
}

function startLevel(lvl, memory_board){
    var Level = new Levels(lvlWidth[lvl], lvlHeight[lvl], lvlTime[lvl], lvlTiles[lvl]);;

    memory_board.style.width = Level.boardWidth + "px";
    memory_board.style.visibility = "visible";
    slideOpen(memory_board, Level.boardHeight, 1.2);
    var tilesArr = generateTiles(Level.tiles);
    setTimeout(function(){
        addTiles(memory_board, tilesArr, Level.tiles, Level);
    }, 1200);
}

function addTiles(board, tilesArr, i, Level){
    if(i > 0){
        setTimeout(function(){
            tilesArr[i - 1].img = document.createElement("div");
            tilesArr[i-1].img.className = tilesArr[i-1].tile_id;

            board.appendChild(tilesArr[i - 1].img);

            tilesArr[i - 1].img.id = "tile" + i;
            tilesArr[i - 1].img.setAttribute("backside", "url(\'" + tilesArr[i - 1].imgPath + "\')");
            tilesArr[i - 1].img.addEventListener('click', hitMe);
           // tile.innerHTML = "" + i;
          //  tilesArr[i - 1].img.style.background = "url(\'" + tilesArr[i - 1].imgPath + "\')" ;
            addTiles(board, tilesArr, i-1, Level);

            if(i === 1){


            }
        }, 300);

    }
}

function hitMe(e){
   this.style.background = this.getAttribute("backside");

}

/*function flipTile()

function runTimer(timeInSec){
    var progress = document.getElementById("loading-bar-progress");
    progress.style.width = "0%";
    progress.style.transition = "width " + timeInSec +"s linear 0s";
    progress.style.width = "100%";
}

function startPlaying(tilesArr, Level){

}

*/

function memoryBoard(Player){
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
    startLevel(0, memory_board);
}

/*function addTiles(memory_board, InfoBarDiv, i){
    var tilesArr = new Tile()[lvlTiles[i]];
    for(var j = 1; j <= lvlTiles[i]; j+=2){
        tilesArr[j-1].tile_id = "tile_" + j;
        tilesArr[j-1].path = "images/tiles/tile_" + j + ".jpg";
        tilesArr[j].tile_id = "tile_" + (j+1);
        tilesArr[j].path = "images/tiles/tile_" + (j+1) + ".jpg";
    }
    tilesArr.memory_tile_shuffle();
    var k = 0;
    while( k < tilesArr.length){
        function addTile(){
            var tile = document.createElement("div");
            tile.className = "tile-class";
            tile.id = tilesArr[k].tile_id;
            memory_board.appendChild(tile);
            k++;
            if(k === tilesArr.length){
                InfoBarDiv.TimeBar.runTimeBar(12000, InfoBarDiv.TimeBar.percentage, InfoBarDiv.TimeBar.progress);
            }
        }
        setTimeout(addTile, 1500);

    }


}

function InfoBar(memory_board_wrapper){
    this.infoDiv = document.createElement("div");
    this.playerInfo = document.createElement("span");
    this.lvlInfo = document.createElement("span");
    this.scoreInfo = document.createElement("span");
    this.infoDiv.id = "info-div";
    memory_board_wrapper.appendChild(this.infoDiv);
    this.infoDiv.appendChild(this.playerInfo);
    this.infoDiv.appendChild(this.lvlInfo);
    this.infoDiv.appendChild(this.scoreInfo);
    this.TimeBar = new timeBar(this.infoDiv);
}

function timeBar(infoDiv){
    this.loadingBar = document.createElement("div");
    this.progress = document.createElement("div");
    this.loadingBar.id = "loading-bar";
    this.progress.id = "loading-bar-progress";
    infoDiv.appendChild(this.loadingBar);
    this.loadingBar.appendChild(this.progress);

    this.percentage = 0;
    this.runTimeBar = function(lvlTime, percents, progress){
        percents = 0;
        var timeInterval = Math.floor(lvlTime/100);
        var progressInterval = setInterval(function(){
            progress.style.width = "" + (percents++) + "%";
            if(percents === 101){
                clearInterval(progressInterval);
            }
        }, timeInterval)
    }
}


function strechBoard(memory_board, max_height, InfoBarDiv, i){
    var board_height = 0;
    memory_board.style.height = (board_height++) + "px";
    memory_board.style.visibility = "visible";

    var interval = setInterval(function () {
        memory_board.style.height = (board_height++) + "px";
        if(board_height >= max_height){
            memory_board.innerHTML = "" + board_height + " " + max_height;
            clearInterval(interval);
            addTiles(memory_board, InfoBarDiv, i);

        }
    }, 15);
}

*/