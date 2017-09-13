$(document).ready(function(){
  //Set global variables
  var boardArr = [
    [$("#box1"),$("#box2"),$("#box3")],
    [$("#box4"),$("#box5"),$("#box6")],
    [$("#box7"),$("#box8"),$("#box9")]
  ];

  var turn = "X";

  var oWins = 0;

  var xWins = 0;

  //Set event listeners
  for(var r = 0; r < 3; r++){
    for(var c = 0; c < 3; c++){
      boardArr[r][c].click(boxClicked);
    }
  }

  $(".newGameBtn").click(newGame);
  $("#clearScoresBtn").click(clearScores);
  $("#switchTurn").click(switchTurn)

  //Fill box with x or o
  function boxClicked(box){
    $("#switchTurn").prop("disabled", true);

    if (turn == "X" && $(box.target).attr("taken") == "false"){
      $(box.target).css('background-image','url(./img/X.png)');
      $(box.target).attr("taken", "true");
      $(box.target).attr("value", "X");
      checkWin("X");
    }else if(turn == "O" && $(box.target).attr("taken") == "false"){
      $(box.target).css('background-image','url(./img/O.png)');
      $(box.target).attr("taken", "true");
      $(box.target).attr("value", "O");
      checkWin("O");
    }
  }

  //Checks for 3 in a row
  function checkWin(xo){
    var xoCount = 0;
    //check rows
    for(var r = 0; r < 3; r++){
      for(var c = 0; c < 3; c++){
        if($(boardArr[r][c]).attr("value") == xo) {
          xoCount++;
        }
        if(xoCount == 3){
          gameWin(xo);
          return;
        }
      }
      xoCount = 0;
    }
    //check cols
    for(var c = 0; c < 3; c++){
      for(var r = 0; r < 3; r++){
        if($(boardArr[r][c]).attr("value") == xo) {
          xoCount++;
        }
        if(xoCount == 3){
          gameWin(xo);
          return;
        }
      }
      xoCount = 0;
    }
    //check diags
    if($(boardArr[0][0]).attr("value") == xo && $(boardArr[1][1]).attr("value") == xo && $(boardArr[2][2]).attr("value") == xo){
      gameWin(xo);
      return;
    }
    if($(boardArr[0][2]).attr("value") == xo && $(boardArr[1][1]).attr("value") == xo && $(boardArr[2][0]).attr("value") == xo){
      gameWin(xo);
      return;
    }

    //Checks if board is filled
    for(var r = 0; r < 3; r++){
      for(var c = 0; c < 3; c++){
        if($(boardArr[r][c]).attr("taken") == "true") {
          xoCount++;
        }
        if(xoCount == 9){
          gameDraw();
          return;
        }
      }
    }

    //If no win, change turn
    if(xo == "X"){
      turn = "O";
      $("#turn").html("Turn: O");
    } else{
      turn = "X";
      $("#turn").html("Turn: X");
    }
  }

  //Shows win modal on winning game
  function gameWin(xo){
    $("#winMsg").html("'" + xo + "' WINS!!!");
    $("#winModal").modal("show");
    if(xo == "X"){
      xWins++;
      $(".x-wins").html(xWins);
    }else{
      oWins++;
      $(".o-wins").html(oWins);
    }
  }

  //Shows draw modal if board is filled
  function gameDraw(){
    $("#winMsg").html("Game is a draw!");
    $("#winModal").modal("show");
  }

  //Clears board for new game
  function newGame(){
    for(var r = 0; r < 3; r++){
      for(var c = 0; c < 3; c++){
        $(boardArr[r][c]).attr("value", "");
        $(boardArr[r][c]).attr("taken", "false");
        $(boardArr[r][c]).css("background-image", "none");
      }
    }
    $("#switchTurn").prop("disabled", false);
  }

  function clearScores(){
    xWins = 0;
    oWins = 0;
    $(".x-wins").html(xWins);
    $(".o-wins").html(oWins);
  }

  function switchTurn(){
    if(turn == "O"){
      turn = "X";
    } else{
      turn = "O";
    }
    $("#turn").html("Turn: " + turn);
  }
});
