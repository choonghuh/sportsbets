var http = require('http');
var fs = require('fs');
var sqlite3 = require('sqlite3')
// populate db from a text?

var dbFileName = 'tempdb';
var db = new sqlite3.Database(dbFileName);

db.serialize(function() {
	var createBetsTableQuery = 'CREATE TABLE bets (';
	// Add columns to table - COLUMN DATATYPE ETC,
	createBetsTableQuery += 'id INTEGER PRIMARY KEY AUTOINCREMENT, ';
	createBetsTableQuery += 'amount INT NOT NULL, ';
	createBetsTableQuery += 'bet CHAR(50) NOT NULL, ';
	createBetsTableQuery += 'username CHAR(20) NOT NULL )';
	db.run(createBetsTableQuery);

	var insertBetQuery = 'INSERT INTO bets VALUES ';
	db.run(insertBetQuery + '(NULL, 5, "I win", "betking")');

	db.each("SELECT * FROM bets", function(err, row) {
		console.log(row);
	});

});

db.close();

// then create a server
// http.createServer(function(req, res){
// 
// }).listen(8000);