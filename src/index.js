const express = require('express');
const app = express();
const db = require('./db.js');

app.post('/admin/addRestaurant', (req, res) => {
	res.send('test');
	res.end();
});

app.listen(8688, () => {
	db.createDb();
});
