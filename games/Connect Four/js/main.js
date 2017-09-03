$(document).ready(function(){

  //Global variables
  var boardArr = [[],[],[],[],[],[],[]];
  var piecesArr = [];
  var boardhtml = "";
  var piece = "url(img/red.png)";
  var turn = "red";
  var redWins = 0;
  var blackWins = 0;

  $("#switchTurn").css("background-color", "red");
  $("#switchTurn").css("color", "black");


  //Create board
  for(var i = 0; i < 7; i++){
    boardhtml += "<div id='box"+i+"' class='aboveBoardSection' col="+i+"></div>";
  };
  for(var i = 7; i < 49; i++){
    boardhtml += "<img id='box"+i+"' class='boardSection img-responsive' src='img/ConnectFour.png' taken='false' player=''>";
  };
  $(".board").html(boardhtml);

  //Populate board Array
  for(var r = 0; r < 7; r++){
    for(var c = 0; c < 7; c++){
      boardArr[r].push($("#box" + (c+(7*r))));
    };
  };

  //Show piece above board
  $(".aboveBoardSection").hover(function(){
    $(this).css("background-image", piece);
  }, function(){
    $(this).css("background-image", "none");
  });

  //Drop a piece, make a turn
  $(".aboveBoardSection").click(function(){
    $("#switchTurn").prop("disabled", true);
    var col = $(this).attr("col");

    var beginTop = $(this).offset().top - $(".game").scrollTop();
    var beginLeft = $(this).offset().left - $(".game").scrollLeft();
    var endTop;
    var height = $(this).height();
    var width = $(this).width();
    var noURLPiece = piece.replace("url(", "");
    noURLPiece = noURLPiece.replace(")", "");

    for(var r = 6; r > 0; r--){
      if(r == 1 && $(boardArr[r][col]).attr("taken") == "true"){
        return;
      }
      if($(boardArr[r][col]).attr("taken") != "true"){
        endTop = $(boardArr[r][col]).offset().top - $(".game").scrollTop();
        $(".pieces").append("<img id='piece"+r+col+"' class='piece img-responsive' row='"+r+"' col='"+col+"' src='"+noURLPiece+"'>");
        $("#piece"+r+col+"").offset({top:beginTop, left: beginLeft});
        $("#piece"+r+col+"").height(height);
        $("#piece"+r+col+"").width(width);
        $("#piece"+r+col+"").animate({top: endTop},200).animate({top: (endTop-30)},75).animate({top: endTop},75).animate({top: (endTop-20)},75).animate({top: endTop},75).animate({top: (endTop-10)},75).animate({top: endTop},75);

        piecesArr.push($("#piece"+r+col+""));

        $(boardArr[r][col]).attr("taken", "true");
        $(boardArr[r][col]).attr("player", turn);
        break;
      };

    };
    $(this).css("background-image", "none");
    if(checkWin() == true){
      gameWin(turn);
    } else{
      changeTurn();
    }
  });

  //Resize/align elements on browser window resize
  $(window).resize(function(){
    for(var r = 0; r < 7; r++){
      for(var c = 0; c < 7; c++){
        $("#piece"+r+c+"").height($(boardArr[r][c]).height());
        $("#piece"+r+c+"").width($(boardArr[r][c]).width());
        $("#piece"+r+c+"").offset({top:$(boardArr[r][c]).offset().top - $(".game").scrollTop(), left: $(boardArr[r][c]).offset().left - $(".game").scrollLeft()});
      };
    };
  });

//Change turns
  function changeTurn(){
    if(turn == "red"){
      piece = "url(img/black.png)";
      turn = "black";
      $("#switchTurn").css("background-color", "black");
      $("#switchTurn").css("color", "white");
      return;
    };
    if(turn == "black"){
      piece = "url(img/red.png)";
      turn = "red";
      $("#switchTurn").css("background-color", "red");
      $("#switchTurn").css("color", "black");
      return;
    };
  };

  //Click new game button
  $(".newGameBtn").click(function(){
    newGame();
  });

  //New Game/Clear board
  function newGame(){
    for(var r = 1; r < 7; r++){
      for(var c = 0; c < 7; c++){
        $(boardArr[r][c]).attr("taken", "");
        $(boardArr[r][c]).attr("player", "");
      }
    }

    $(".pieces").html("");

    $("#switchTurn").prop("disabled", false);
  };

  //Check win
  function checkWin(){
    var counter = 0;

    //Check if board is full
    for(var r = 1; r < 7; r++){
      for(var c = 0; c < 7; c++){
        if($(boardArr[r][c]).attr("taken") == "true"){
          counter++;
        };
      };
      if(counter == 42){
        gameDraw();
        return;
      };
    };
    counter = 0;

    //Check rows for win
    for(var r = 6; r > 0; r--){
      for(var c = 6; c >= 0; c--){
        if($(boardArr[r][c]).attr("player") == turn){
          counter++;
        } else{
          counter = 0;
        };
        if(counter == 4){

          return true;
        };
      };
      counter = 0;
    };

    //Check columns for win
    for(var c = 6; c >= 0; c--){
      for(var r = 6; r > 0; r--){
        if($(boardArr[r][c]).attr("player") == turn){
          counter++;
        } else{
          counter = 0;
        };
        if(counter == 4){

          return true;
        };
      };
      counter = 0;
    };

    //Check diagnals for win
    for(var r = 1; r < 4; r++){
      for(var c = 0; c < 7; c++){
        if($(boardArr[r][c]).attr("player") == turn){
          if(c < 3){
            if($(boardArr[r+1][c+1]).attr("player") == turn){
              if($(boardArr[r+2][c+2]).attr("player") == turn){
                if($(boardArr[r+3][c+3]).attr("player") == turn){

                  return true;
                };
              };
            };
          };
          if(c > 3){
            if($(boardArr[r+1][c-1]).attr("player") == turn){
              if($(boardArr[r+2][c-2]).attr("player") == turn){
                if($(boardArr[r+3][c-3]).attr("player") == turn){

                  return true;
                };
              };
            };
          };
          if(c == 3){
            //check to left
            if($(boardArr[r+1][c+1]).attr("player") == turn){
              if($(boardArr[r+2][c+2]).attr("player") == turn){
                if($(boardArr[r+3][c+3]).attr("player") == turn){

                  return true;
                };
              };
            };
            //check to right
            if($(boardArr[r+1][c-1]).attr("player") == turn){
              if($(boardArr[r+2][c-2]).attr("player") == turn){
                if($(boardArr[r+3][c-3]).attr("player") == turn){

                  return true;
                };
              };
            };
          };
        };
      };
    };
  };

  //Game has been won
  function gameWin(player){
    var playerColor = player.toUpperCase();
    $("#winMsg").html(playerColor + " WINS!!!");
    $("#winModal").modal("show");
    if(player == "red"){
      redWins++;
      $(".redWins").html(redWins);
      turn = "red";
    }else{
      blackWins++;
      $(".blackWins").html(blackWins);
      turn = "black";
    }
  };

  //Shows win modal if all sections filled
  function gameDraw(){
    $("#winMsg").html("Game is a draw!!  Play Again!");
    $("#winModal").modal("show");
  }

  //Clear scoreboard when button is pressed
  $("#clearScoresBtn").click(function(){
    redWins = 0;
    blackWins = 0;
    $(".redWins").html(0);
    $(".blackWins").html(0);
  });

  //Switch turns at start of game
  $("#switchTurn").click(function(){
    changeTurn();
  });
});
