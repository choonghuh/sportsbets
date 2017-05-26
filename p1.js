var http = require('http');
var fs = require('fs');
var sqlite3 = require('sqlite3')
// populate db from a text?

var dbFileName = 'tempdb';
var db = new sqlite3.Database(dbFileName);

var dbTextSource = 'static/bets_source';
var betArray = [];

function buildFromTextFile(sourcefile){
	console.log('buildFromTextFile');
	fs.readFile(sourcefile ,function(err, data){
		var betStrings = data.toString().split('\n');
		for(i in betStrings){
			temp = betStrings[i].split(',');
			betArray.push([
				temp[0],
				temp[1],
				temp.slice(2,temp.length).join() //In case when the string has a comma...
			]);
		}
		console.log(betArray);
		for (i in betArray){
			console.log('INSERT INTO bets VALUES (NULL, ' + betArray[i].join(', ') +' )');
			db.run('INSERT INTO bets VALUES (NULL, ' + betArray[i].join(', ') +' )');
		}
		db.each("SELECT * FROM bets", function(err, row) {
			console.log(row);
		});

		db.close();
	});
}
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

	console.log("Initial DB Population");
	buildFromTextFile(dbTextSource);

	// db.each("SELECT * FROM bets", function(err, row) {
	// 	console.log(row);
	// });

});

// db.close();

// then create a server
// http.createServer(function(req, res){
// 
// }).listen(8000);