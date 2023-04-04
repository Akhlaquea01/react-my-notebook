const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/myNotebook";

const connectToMongo = async() => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected Successfully to DB");
      } catch (error) {
        console.log(error);
      }
};

module.exports = connectToMongo;