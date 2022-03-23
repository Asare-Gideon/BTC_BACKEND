const express = require('express');
const mongoose = require('mongoose');
const app = express();
const post = require('./routes/post');
require('dotenv/config');

//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', post);

app.get('/', (req, res) => {
	res.send('hello there');
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true }, () => {
	console.log('connected to db');
});
app.listen(PORT, (err) => {
	console.log(`app running on port ${PORT}`);
});
