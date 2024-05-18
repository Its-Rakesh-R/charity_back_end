const {MongoClient} = require('mongodb');
const url = "mongodb+srv://rocky:rocky123@charity.1g7epba.mongodb.net/?retryWrites=true&w=majority&appName=charity";
let client ={};
try{
    client = new MongoClient(url);
    // client = new MongoClient(url, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});
    console.log('DB connected');
}
catch(err){
    console.log(err);
    console.log('error happens to connect database')
}
module.exports = client
