/**
 * Created by user on 17.3.2015 г..
 */
/*
function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialog-overlay');
        var dialogbox = document.getElementById('dialog-box');

        dialogoverlay.style.display = "block";
        dialogoverlay.style.height  = winH+'px';
        dialogbox.style.left = (winW/2) - (550/2) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialog-box-head').innerHTML = "My Custom Alert";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    };
    this.ok = function(){
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    };
}

function deletePost(id){
    var db_id = id.replace("post_", "");
    document.getElementById(id).remove();
}

*/

function cleanScreen(){
    if(document.getElementById("login-div")){
        document.getElementById("login-div").remove();
    }
    document.getElementById("memory-board-wrapper").style.visibility = "hidden";
    document.getElementById("memory-board").style.visibility = "hidden";
    document.getElementById("player-name").innerHTML = "";
    document.getElementById("level-info").innerHTML = "";
    document.getElementById("score-info").innerHTML = "";
    document.getElementById("memory-board").innerHTML = "";
    document.getElementById("loading-bar-progress").style.width = "0%";

}

function CustomConfirm(){
    this.render = function(){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialog-overlay');
        var dialogbox = document.getElementById('dialog-box');

        dialogoverlay.style.display = "block";
        dialogoverlay.style.height  = winH+'px';
        dialogbox.style.left = (winW/2) - (550/2) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialog-box-head').innerHTML = "Crazy BDSM Memory Game";
        document.getElementById('dialog-box-body').innerHTML = "Do you Want to Start New Game?";
        document.getElementById('dialog-box-foot').innerHTML = '<button id="yes" >Yes</button> <button onclick="Confirm.no()">No</button>';
        document.getElementById("yes").addEventListener('click', yes);

        function yes(){
            cleanScreen();
            document.getElementById('dialog-box').style.display = "none";
            document.getElementById('dialog-overlay').style.display = "none";
            playerLoginScreen();
        };
    };



    this.no = function(){
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    };
}

var Confirm = new CustomConfirm();


/*
function CustomPrompt(){
    this.render = function(dialog,func){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialog-overlay');
        var dialogbox = document.getElementById('dialog-box');

        dialogoverlay.style.display = "block";
        dialogoverlay.style.height  = winH+'px';
        dialogbox.style.left = (winW/2) - (550/2) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialog-box-head').innerHTML = "A value is required";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-body').innerHTML += '<br><input id="prompt_value1">';
        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Prompt.ok(\''+func+'\')">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
    };

    this.cancel = function(){
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    };

    this.ok = function(func){
        var prompt_value1 = document.getElementById('prompt_value1').value;
        window[func](prompt_value1);
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    };
}


var Alert = new CustomAlert();
var Prompt = new CustomPrompt();*/
