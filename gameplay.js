/* 
 Author     : danielschroeder
 UVID       : 10520096
 */
window.addEventListener("load", addListeners, false);
//.getElementById("gameboardDiv");
//x.addEventListener("load", showGameboard, false);
function addListeners() {
    //console.log("addListeners fired");
    var gameDiv = document.getElementById("gameboardDiv");
    if (gameDiv != null) {//load listeners for the game page
        showGameboard();
        //console.log("add game listeners fired");
        var userInfo = document.getElementById("userInfo").innerHTML = "Logged in user and timestamp: " + localStorage.getItem("cs2550timestamp");
        document.getElementById("newGame").onclick = startNewGame;
        document.getElementById("toJSON").onclick = saveGameData;
        document.getElementById("loadJSON").onclick = loadGameData;
        document.getElementById("clearLocalStorage").onclick = clearLocalStorage;
        
    }
    var gameDesign = document.getElementById("gameDesign");
    if (gameDesign != null) {//load listeners for the design/rules page
        showDiv(event, "gameRules");
        document.getElementById("password").onkeyup = function(){if(event.keyCode == 13){userLogin();}};
        //console.log("add rules listeners fired");
    }
}



function showGameboard() {
    //console.log("showGameboard fired");
    var gameDiv = document.getElementById("gameboardDiv");
    gameDiv.innerHTML = genGameboard(75);
    placeGamepieces();
    var table = document.getElementById("gameboard");
    var tableCells = table.getElementsByTagName("td");
    var i = 0;
    while (tableCells[i]) {
        tableCells[i].onclick = function () {
            clickedCell(this);
        };
        //console.log(tableCells[i]);
        i++;
    }
}

function startNewGame() {
    location.reload();
}

function genGameboard(size) {
    var html = "";
    var i = 0;
    var rows = "";
    var data = "";
    for (i = 0; i < 8; i++) {
        data = genRow(i, size);
        rows += "<tr id=\"row" + i + "\">" + data + "</tr>";
    }
    html += "<table id=gameboard align=\"center\">" + rows + "</table>";
    return html;
}

function genRow(rowCount, sizeOfSpaces) {//creates the gameboard rows and sets the id accordingly.
    var row = "";
    var i = 0;
    var n = 0;
    if (rowCount % 2 === 0) {//if even# row
        for (i = 0; i < 4; i++) {
            row += "<td class=\"tan\" id=\"row" + rowCount + "\column" + n + "\" height=\"" + sizeOfSpaces + "px\" width=\"" + sizeOfSpaces + "px\" ></td>";
            n++;
            row += "<td class=\"brown\" id=\"row" + rowCount + "\column" + n + "\" height=\"" + sizeOfSpaces + "px\" width=\"" + sizeOfSpaces + "px\" ></td>";
            n++;
        }
    } else {
        for (i = 0; i < 4; i++) {
            row += "<td class=\"brown\" id=\"row" + rowCount + "\column" + n + "\" height=\"" + sizeOfSpaces + "px\" width=\"" + sizeOfSpaces + "px\" ></td>";
            n++;
            row += "<td class=\"tan\" id=\"row" + rowCount + "\column" + n + "\" height=\"" + sizeOfSpaces + "px\" width=\"" + sizeOfSpaces + "px\"></td>";
            n++;
        }
    }
    return row;
}

function placeGamepieces() {//places both teams gamepieces on the board after the board has loaded.
    var loc = "currentLocation";
    for (var x in whiteTeam) {
        var obj = whiteTeam[x];
        var row = document.getElementById(obj[loc]);
        var piece;
        if (isNaN(obj.name.slice(-1))) {
            piece = obj.name;
            //console.log(obj.name + " is not a number" + obj.name.slice(-1));
        } else {
            piece = obj.name.slice(0, -1);
            //console.log(obj.name + " is a number"+ obj.name.slice(-1));
        }
        row.innerHTML = "<img src=\"images/gamepieces/" + obj.team + "/" + piece + ".png\" alt=\"" + obj.team + obj.name + "\" >"; //obj["name"];
        //window.alert(row);
        //console.log(whiteTeam[x]);
    }
    for (var x in blackTeam) {
        var obj = blackTeam[x];
        var row = document.getElementById(obj[loc]);
        var piece;
        if (isNaN(obj.name.slice(-1))) {
            piece = obj.name;
            //console.log(obj.name + " is not a number" + obj.name.slice(-1));
        } else {
            piece = obj.name.slice(0, -1);
            //console.log(obj.name + " is a number"+ obj.name.slice(-1));
        }
        row.innerHTML = "<img src=\"images/gamepieces/" + obj.team + "/" + piece + ".png\" alt=\"" + obj.team + obj.name + "\" >";
        //window.alert(row);
    }
    updateStats();
}


function clickedCell(cell) {
    //console.log("clickedCell Fired");
    //console.log(cell);
    //console.log(game.selectedPiece);
    if (game.selectedPiece == null && cell.innerHTML != "")//no piece selected and clickpoint contains a valid piece.
    {
        var piece = cell.getElementsByTagName("img");
        console.log(piece[0]);
        selectPiece(piece[0]);
        console.log(game.selectedPiece);
    } else if (game.selectedPiece != null)
    {
        //console.log();
        if (game.nextToMove == "white" && isValidMove("white", getRow(cell.id), getColumn(cell.id))) {
            game.nextToMove = "black";
        } else if (game.nextToMove == "black" && isValidMove("black", getRow(cell.id), getColumn(cell.id))) {
            game.nextToMove = "white";
        }
        document.getElementById(game.selectedPiece.currentLocation).innerHTML = "";
        game.selectedPiece.currentLocation = cell.id;
        placeGamepieces();
        game.selectedPiece = null;
    }
    updateStats();
}

function isValidMove(team, destRow, destColumn) {
    var currRow = getRow(game.selectedPiece.currentLocation);
    var currColumn = getColumn(game.selectedPiece.currentLocation);
    var currentTotal = currRow + currColumn;
    var destTotal = destRow + destColumn;
    switch (game.selectedPiece) {
        case "king":
            if (currentTotal - 1 < destTotal < currentTotal + 1) {

            }
        case "queen":
        case "rook":
        case "pawn":
        case "knight":
        case "bishop":
    }
    return true;

}

function selectPiece(id) {
    //console.log("selectPiece Fired");
    //console.log(id.alt);
    var team = id.alt.slice(0, 5);
    var piece = id.alt.slice(5);
    if (team == game.nextToMove)//validate that clicked piece is on the next team to move.
    {
        if (team == "white") {
            //console.log(whiteTeam[piece].currentRow);
            game.selectedPiece = whiteTeam[piece];

        }
        if (team == "black") {
            game.selectedPiece = blackTeam[piece];

        }

    } else {
        window.alert("It's not this teams turn to move bro!");
    }
}
function updateStats() {
    var html = document.getElementById("whiteTeam");
    html.innerHTML = "<h3>White Teams Stats</h3>" + genTeamStats(whiteTeam);
    html = document.getElementById("blackTeam");
    html.innerHTML = "<h3>Black Teams Stats</h3>" + genTeamStats(blackTeam);
    document.getElementById("gameStats").innerHTML = genGameStats();
}
function genGameStats() {
    var row = "";
    //console.log(obj["name"]);
    //var row = document.getElementById(obj[loc]);
    row += "<tr><td>Next to Move</td><td>" + game.nextToMove + "</td></tr><tr><td>Last Move</td><td>" + game.moveDescription + "</td></tr><tr><td>Check</td><td>" + game.check + "</td></tr><tr><td>Check Mate</td><td>" + game.checkMate + "</td></tr>";
    if (game.selectedPiece != null) {
        row += "<tr><td>Selected Piece</td><td>" + game.selectedPiece["name"] + "</td></tr>";
    }
    //"</td></tr><tr><td>Selected Piece</td><td>" + game.selectedPiece["name"] + 
    //window.alert(row);
    //console.log(whiteTeam[x]);

    return "<table align=\"center\">" + row + "</table>";
}
function genTeamStats(team) {

    var row = "";
    for (var x in team) {
        var obj = team[x];
        //console.log(obj["name"]);
        //var row = document.getElementById(obj[loc]);
        row += "<tr><td>" + obj["name"] + "</td><td>" + obj["status"] + "</td><td>" + obj["currentLocation"] + "</td></tr>";
        //window.alert(row);
        //console.log(whiteTeam[x]);
    }
    return "<table><tr><th>Piece</th><th>Status</th><th>Location</th></tr>" + row + "</table>";
}
function showDiv(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function userLogin() {
    //console.log(document.getElementById('username').value);
    //console.log(document.getElementById('password').value);
    var usr = document.getElementById('username').value;
    var pswd = document.getElementById('password').value;
    var localRequest = new XMLHttpRequest();
    localRequest.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //console.log("userName=" + usr + "&password=" + pswd);
    localRequest.send("userName=" + usr + "&password=" + pswd);

    var responseJSON = JSON.parse(localRequest.responseText);
    //console.log(responseJSON);
    document.getElementById('loginResponse').innerHTML = localRequest.responseText;
    if (responseJSON["result"] == "invalid") {
        document.getElementById('loginResponse').innerHTML = "ERROR: The server responded with " + localRequest.responseText + " Please doublecheck your username and password and try again.";
    } else if (responseJSON["result"] == "valid") {
        document.getElementById('loginResponse').innerHTML = "LOGIN SUCCESS: The server responded with " + localRequest.responseText;
        //var loginInfo = responseJSON["userName"]+" "+responseJSON["timestamp"];
        localStorage.setItem("cs2550timestamp", responseJSON["userName"] + " " + responseJSON["timestamp"])
        window.location.hash = "";
        window.location.pathname = "/CS2550assignment1/chess.html"

        //console.log();
    } else {
        document.getElementById('loginResponse').innerHTML = "UNKNOWN ERROR: The server responded with " + localRequest.responseText;
    }
}

function clearLocalStorage() {
    localStorage.clear();
    document.getElementById("userInfo").innerHTML = "Logged in user and timestamp: " + localStorage.getItem("cs2550timestamp");;
}
function getRow(id) {
    return id.slice(-8, -7);
}
function getColumn(id) {
    return id.slice(10);
}

function saveGameData(){
    var gameData = "{\"game\":"+JSON.stringify(game)+",\"whiteTeam\":"+JSON.stringify(whiteTeam)+",\"blackTeam\":"+JSON.stringify(blackTeam)+"}";
    console.log(gameData);
}

function loadGameData(){
    var localRequest = new XMLHttpRequest();
    localRequest.open("GET", "gamedata.txt",false);
    localRequest.send(null);
    //console.log(localRequest.responseText);
    var responseJSON = JSON.parse(localRequest.responseText);
    game = responseJSON["game"];
    whiteTeam = responseJSON["whiteTeam"];
    blackTeam = responseJSON["blackTeam"];
    showGameboard();
}
