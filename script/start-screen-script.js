/**
 * Created by user on 13.3.2015 г..
 */

function playerLoginScreen(Player){
    if(document.getElementById("login-div")){
        document.getElementById("login-div").remove();
    }

    var wrapper = document.getElementById("wrapper");
    var loginDiv = document.createElement('div');
    var nameParagraph = document.createElement('p');
    var nickInput = document.createElement('input');
    var startButton = document.createElement('div');

    loginDiv.id = "login-div";
    nameParagraph.innerHTML = "Enter Player\'s Name";
    nameParagraph.className = "name-paragraph";
    nickInput.type = "text";
    nickInput.id = "nick-input";
    startButton.id = "start-btn";
    startButton.innerHTML = "<span>Start Game</span>";

    slideOpen(loginDiv, 450, 1.2);
    wrapper.appendChild(loginDiv);

    setTimeout(function(){
        loginDiv.appendChild(nameParagraph);
        loginDiv.appendChild(nickInput);
        loginDiv.appendChild(startButton);
    }, 1200);

    startButton.onclick = function(){
        slideClose(loginDiv, 1.2);
        Player.nick = nickInput.value;
        setTimeout(function(){
            loginDiv.remove();
            memoryBoard(Player);
        }, 1200);
    }
}


/* startButton.onclick = function(){
 slideClose(loginDiv, 2);
 var evt = new Event('randomEvt');

 startButton.dispatchEvent(evt);

 }

 startButton.addEventListener('randomEvt', function(){
 alert('super si');
 })*/
function slideOpen(elem, height, time){
    elem.style.height = 0;
    setTimeout(function(){
        elem.style.visibility = "visible";
        elem.style.transition = "height " + time +"s linear 0s";
        elem.style.height = height + "px";
    }, 1);
}

function slideClose(elem, time){
    elem.style.transition = "height " + time +"s linear 0s";
    elem.style.height = "0px";
}

function Game(){

    var Player = {nick: "", score: 0};

    var main_wrapper = document.getElementById("wrapper");
    main_wrapper.style.background = "url(\'images/startingBackground.gif\')";

    var SoundPlayer = new soundPlayer();
    SoundPlayer.playBackgroundMusic();

    document.getElementById('new-game-btn').addEventListener("click", game, false);
    document.getElementById('mutter').addEventListener("click", SoundPlayer.muteAllSounds, false);

    function game(){
        SoundPlayer.stopBackgroundSound();
        SoundPlayer.startNewGameSound();
        main_wrapper.style.background  = "url(\'images/background-no-text.jpg\')";
        playerLoginScreen(Player);
    }
}

function soundPlayer(){
    var mutter = false;
    var startingSoundPlaying = true;
    var background_sound = new Audio('sounds/background-sound.mp3');
    var new_game_sound = new Audio('sounds/new-game.ogg');


    this.playSound = function(soundPath){
        var sound = new Audio(soundPath);
        sound.play();
    };

    this.playBackgroundMusic = function(){
        background_sound.play();
        background_sound.loop = "true";
    };

    this.stopBackgroundSound = function(){
        startingSoundPlaying = false;
        background_sound.pause();
    };

    this.startNewGameSound = function(){
        if(mutter === false){
          new_game_sound.play();
        }
    };

    this.muteAllSounds = function(){
        if(mutter === false){
            background_sound.pause();
            mutter = true;
            document.getElementById('mutter').innerHTML = "<img src=\'images/sounds-off.png\'/>";
        }else{
            mutter = false;
            document.getElementById('mutter').innerHTML = "<img src=\'images/sounds-on.png\'/>";
            if(startingSoundPlaying === true){
                background_sound.play();
            }

        }
    }
}

window.addEventListener("load", Game);