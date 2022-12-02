//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/miniwall_rest_api';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;