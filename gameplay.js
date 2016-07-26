/* 
 Author     : danielschroeder
 UVID       : 10520096
 */

function showGameboard() {
    var gameDiv = document.getElementById("gameboardDiv");
    gameDiv.innerHTML = genGameboard(75);
    placeGamepieces("startingLocation");
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
    for (var x in whiteTeam){
        var obj = whiteTeam[x];
        obj["currentLocation"] = obj["startingLocation"];
        obj["status"] = "active";
    }
    for (var x in blackTeam){
        var obj = blackTeam[x];
        obj["currentLocation"] = obj["startingLocation"];
        obj["status"] = "active";
    }
    game.nextToMove = "white";
    game.selectedPiece = null;
    game.moveDescription = "";
    game.check = false;
    game.checkMate = false;
    showGameboard();
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

function placeGamepieces(loc) {//places both teams gamepieces on the board after the board has loaded.
    for (var x in whiteTeam) {
        var obj = whiteTeam[x];
        var row = document.getElementById(obj[loc]);
        row.innerHTML = obj["icon"];
        //window.alert(row);
        //console.log(whiteTeam[x]);
    }
    for (var x in blackTeam) {
        var obj = blackTeam[x];
        var row = document.getElementById(obj[loc]);
        row.innerHTML = obj["icon"];
        //window.alert(row);
    }
    updateStats();
}


function clickedCell(cell) {
    console.log("clickedCell Fired");
    console.log(cell);
    console.log(game.selectedPiece);
    if (game.selectedPiece == null && cell.innerHTML != "")//no piece selected and clickpoint contains a valid piece.
    {
        var piece = cell.getElementsByTagName("img");
        console.log(piece[0]);
        selectPiece(piece[0]);
        console.log(game.selectedPiece);
    }
    else if (game.selectedPiece != null)
    {
        console.log();
        if (game.nextToMove == "white" && isValidMove("white", game.selectedPiece.name)){
            game.nextToMove = "black";
        } 
        else if (game.nextToMove == "black" && isValidMove("black",game.selectedPiece.name)){
            game.nextToMove = "white";
        }
        document.getElementById(game.selectedPiece.currentLocation).innerHTML = "";
        game.selectedPiece.currentLocation = cell.id;
        placeGamepieces("currentLocation");
        game.selectedPiece = null;
        console.log(game.selectedPiece);
        
//        switch (piece.slice(4)) {
//                case "pawn":
//          
//                    break;
//            }

    }
}

function isValidMove(team, piece) {
    return true;

}

function selectPiece(id) {
    console.log("selectPiece Fired");
    console.log(id.alt);
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