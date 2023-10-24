var gameEnded = won = false ;
var compScore = playerScore = tieScore = disabledCount = 0;
var idList = ["row1", "row2", "row3", "col1", "col2", "col3", "diagonal1", "diagonal2"];
var playerIds = new Array(8), compIds = new Array(8) ;
playerIds.fill(0), compIds.fill(0);

    $("h1").fadeIn(500);
    $("p").fadeIn(500);
    $("i").fadeIn(500);
    $("button").slideDown(1000);
    $("h1, p, button").removeClass("hide");
    

$("button").click(function (){
    $('i').addClass('hide');
    if(gameEnded){
        playOn();
    }
    playerFunc($(this));
});


function playerFunc(value){  
    if(value.prop('disabled') === false){
        $("#"+value.attr('id')).text("X").prop('disabled', true);
        check(value);
        
        if(!gameEnded){
            setTimeout(function (){
                compFunc();
            }, 500);
        }
    }
}

function compFunc(){
        let randNum = 1 + Math.floor(Math.random() * 9);
        if($("#"+randNum).prop('disabled') === false){
            $("#"+randNum).text("O").addClass("red-text").prop('disabled', true);
            check($("#"+randNum));
        }
        else{
            compFunc();
        }
}

function check(param){
    disabledCount++;
    for(let i = 0; i < idList.length; i++){
        if(param.hasClass(idList[i])){
            if(param.text() === 'X'){
                ++playerIds[i];
                console.log('Player\n'+idList[i] +" "+ playerIds[i]);
            }
            if(param.text() === 'O'){
                ++compIds[i];
                console.log('computer\n'+idList[i] +" "+ compIds[i]);
            }
            if(playerIds[i] === 3 || compIds[i] === 3 ){
                winner(param.attr('id'));
            }
        }
    }
    console.log(disabledCount +' '+won);
    if(disabledCount === 9 && won == false) {
        tieGame();
    }
}

function winner(id){
    $('h2').removeClass('hide');
    if($('#'+id).text() === 'X'){
        $('h2').html("You Win! 🥳");
        $('#player-score').text(++playerScore);
    }
    else {    
        $('h2').html("<span>Computer Wins!</span> 🥳");
        $('#comp-score').text(++compScore);
   }
   won = true;
   finishGame();
}

function tieGame(){
    $('h2').removeClass('hide');
    $('h2').html("<span>Tie</span> Game! 🤝");
    $('#tie-score').text(++tieScore);
    finishGame();
}

function finishGame(){
    gameEnded = true;
    $('i').removeClass('hide').text('Click on the board to continue');
    $('button').prop('disabled', false);
}


function playOn (){
    disabledCount = 0;
    playerIds.fill(0), compIds.fill(0);
    $('h2').addClass('hide');
    $("button").removeClass('red-text').html('');
    gameEnded = false;
    won = false;
}
