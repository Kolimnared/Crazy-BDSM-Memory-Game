/**
 * Created by user on 13.3.2015 г..
 */

var Player = {nick: "", score: 0, gameOn: false};

var SoundPlayer = new function soundPlayer(){
    var mutter = false;
    var startingSoundPlaying = true;
    var background_sound = new Audio('sounds/background-sound.mp3');
    var new_game_sound = new Audio('sounds/new-game.ogg');


    this.playSound = function(soundPath){
        var sound = new Audio(soundPath);
        sound.play();
    };

    this.playBackgroundMusic = function(){
        startingSoundPlaying = true;
        if(mutter === false){
            background_sound.play();
            background_sound.loop = "true";
        }
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
};

function playerLoginScreen(){
    Player.gameOn = true;

    SoundPlayer.stopBackgroundSound();
    SoundPlayer.startNewGameSound();
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

    wrapper.appendChild(loginDiv);
    loginDiv.appendChild(nameParagraph);
    loginDiv.appendChild(nickInput);
    loginDiv.appendChild(startButton);
    slideOpen(loginDiv, 450, 1.2);

    nickInput.addEventListener('keyup', checkName);
    nickInput.addEventListener('keydown', checkName);
    function checkName(){
        var regex = /[\\\\\\`]|[^A-za-z0-9]/gi;
        if(nickInput.value.search(regex) > -1){
            nickInput.value = nickInput.value.replace(regex, "");
        }
    }

    startButton.onclick = function(){
        if(nickInput.value != ""){
            slideClose(loginDiv, 1.2);
            Player.nick = nickInput.value;
            setTimeout(function(){
                loginDiv.remove();
                memoryBoard(0);
            }, 1200);
        }else{
            Alert.render("Enter Player Name!");
        }
    }
}

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

function MainGame(){
    var main_wrapper = document.getElementById("wrapper");
    main_wrapper.style.background = "url(\'images/startingBackground.gif\')";


    SoundPlayer.playBackgroundMusic();

    document.getElementById('new-game-btn').addEventListener("click", newGame, false);
    document.getElementById('mutter').addEventListener("click", SoundPlayer.muteAllSounds, false);

    function newGame(){
        if(Player.gameOn === true){
            Confirm.render();
            return;
        }
        main_wrapper.style.background  = "url(\'images/background-no-text.jpg\')";
        playerLoginScreen();
    }

}

window.addEventListener("load", MainGame);