const sqlite = require('sqlite3');

exports.createDb = () => {
	exports.db = new sqlite.Database('cetusfood.db', sqlite.OPEN_READWRITE, err => {
		if(err)
			console.error(`Failed to create database: ${err}`);
		else
			console.log(`Successfully create the database`);
	});
}
