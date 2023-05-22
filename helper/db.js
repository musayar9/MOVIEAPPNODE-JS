const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set("strictQuery", true)
    mongoose.connect('mongodb://127.0.0.1:27017/movies');
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected')
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err)
    });

    mongoose.Promise = global.Promise;
}