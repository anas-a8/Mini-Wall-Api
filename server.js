const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
//const mongoose = require('mongoose');
const mongoose = require('./config/database'); //database configuration
const posts = require('./app/api/routes/post');
const users = require('./app/api/routes/users');
const comments = require('./app/api/routes/comment');
const likes = require('./app/api/routes/like');

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
 res.json({"Project Anass" : "MiniWall REST API"});
});

// public route
app.use('/users', users);

// private route
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/likes', likes);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.listen(3000, function(){ console.log('Node server listening on port 3000');});