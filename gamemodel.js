/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function gamepiece(nameOfPiece, iconLink, pieceStatus, defaultLocation, pieceLocation) {
    this.name = nameOfPiece;
    this.icon = iconLink;
    this.status = pieceStatus;
    this.currentLocation = pieceLocation;
    this.startingLocation = defaultLocation;
    this.currentRow = currentRow(this.currentLocation);
    this.currentColumn = currentColumn(this.currentLocation);
}

var whiteTeam = {
    king: new gamepiece("king", "<img src=\"images/gamepieces/white/king.png\" alt=\"whiteking\" >", "active", "row7column4", "row7column4"),
    queen: new gamepiece("queen", "<img src=\"images/gamepieces/white/queen.png\" alt=\"whitequeen\" >", "active", "row7column3", "row7column3"),
    rook1: new gamepiece("rook1", "<img src=\"images/gamepieces/white/rook.png\" alt=\"whiterook1\" >", "active", "row7column0", "row7column0"),
    rook2: new gamepiece("rook2", "<img src=\"images/gamepieces/white/rook.png\" alt=\"whiterook2\" >", "active", "row7column7", "row7column7"),
    bishop1: new gamepiece("bishop1", "<img src=\"images/gamepieces/white/bishop.png\" alt=\"whitebishop1\" >", "active", "row7column2", "row7column2"),
    bishop2: new gamepiece("bishop2", "<img src=\"images/gamepieces/white/bishop.png\" alt=\"whitebishop2\" >", "active", "row7column5", "row7column5"),
    knight1: new gamepiece("knight1", "<img src=\"images/gamepieces/white/knight.png\" alt=\"whiteknight1\" >", "active", "row7column1", "row7column1"),
    knight2: new gamepiece("knight2", "<img src=\"images/gamepieces/white/knight.png\" alt=\"whiteknight2\" >", "active", "row7column6", "row7column6"),
    pawn1: new gamepiece("pawn1", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn1\" >", "active", "row6column0", "row6column0"),
    pawn2: new gamepiece("pawn2", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn2\" >", "active", "row6column1", "row6column1"),
    pawn3: new gamepiece("pawn3", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn3\" >", "active", "row6column2", "row6column2"),
    pawn4: new gamepiece("pawn4", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn4\" >", "active", "row6column3", "row6column3"),
    pawn5: new gamepiece("pawn5", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn5\" >", "active", "row6column4", "row6column4"),
    pawn6: new gamepiece("pawn6", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn6\" >", "active", "row6column5", "row6column5"),
    pawn7: new gamepiece("pawn7", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn7\" >", "active", "row6column6", "row6column6"),
    pawn8: new gamepiece("pawn8", "<img src=\"images/gamepieces/white/pawn.png\" alt=\"whitepawn8\" >", "active", "row6column7", "row6column7")
};

var blackTeam = {
    king: new gamepiece("king", "<img src=\"images/gamepieces/black/king.png\" alt=\"blackking\" >", "active", "row0column4", "row0column4"),
    queen: new gamepiece("queen", "<img src=\"images/gamepieces/black/queen.png\" alt=\"blackqueen\" >", "active", "row0column3", "row0column3"),
    rook1: new gamepiece("rook1", "<img src=\"images/gamepieces/black/rook.png\" alt=\"blackrook1\" >", "active", "row0column0", "row0column0"),
    rook2: new gamepiece("rook2", "<img src=\"images/gamepieces/black/rook.png\" alt=\"blackrook2\" >", "active", "row0column7", "row0column7"),
    bishop1: new gamepiece("bishop1", "<img src=\"images/gamepieces/black/bishop.png\" alt=\"blackbishop1\" >", "active", "row0column2", "row0column2"),
    bishop2: new gamepiece("bishop2", "<img src=\"images/gamepieces/black/bishop.png\" alt=\"blackbishop2\" >", "active", "row0column5", "row0column5"),
    knight1: new gamepiece("knight1", "<img src=\"images/gamepieces/black/knight.png\" alt=\"blackknight1\" >", "active", "row0column1", "row0column1"),
    knight2: new gamepiece("knight2", "<img src=\"images/gamepieces/black/knight.png\" alt=\"blackknight2\" >", "active", "row0column6", "row0column6"),
    pawn1: new gamepiece("pawn1", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn1\" >", "active", "row1column0", "row1column0"),
    pawn2: new gamepiece("pawn2", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn2\" >", "active", "row1column1", "row1column1"),
    pawn3: new gamepiece("pawn3", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn3\" >", "active", "row1column2", "row1column2"),
    pawn4: new gamepiece("pawn4", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn4\" >", "active", "row1column3", "row1column3"),
    pawn5: new gamepiece("pawn5", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn5\" >", "active", "row1column4", "row1column4"),
    pawn6: new gamepiece("pawn6", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn6\" >", "active", "row1column5", "row1column5"),
    pawn7: new gamepiece("pawn7", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn7\" >", "active", "row1column6", "row1column6"),
    pawn8: new gamepiece("pawn8", "<img src=\"images/gamepieces/black/pawn.png\" alt=\"blackpawn8\" >", "active", "row1column7", "row1column7")
};
var game = {
    //teams: [whiteTeam, blackTeam],
    selectedPiece: null,
    nextToMove: "white", //white or black
    whiteMovesTotal: 0,//track total# of white moves
    blackMovesTotal: 0,//track total# of black moves
    moveDescription: "",//describe move to display to a log that displays all moves. 
    check: false,
    checkMate: false
    
};

function currentRow(loc){
    return loc.slice(-8,-7);
}
function currentColumn(loc){
    return loc.slice(10);
}


