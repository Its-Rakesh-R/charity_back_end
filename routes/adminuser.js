const express = require('express')
const router = express.Router();
const client = require('../connection')
const multer = require("multer");
const {ObjectId} = require('mongodb')

// const app = express();
// app.use(express.static('public'));

const storage = multer.diskStorage({

    destination: function(req,file,cb){
        return cb(null,'./public')
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' +file.originalname )
    }
    })
    
    
const upload = multer({ storage: storage });

router.post('/add_child',upload.single('file'),function(req,res){
    
    console.log(req.body)
    console.log(req.file)
    client.db('charity').collection('children_data').insertOne({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        date_of_birth:req.body.date_of_birth,
        age:req.body.age,
        region:req.body.region,
        personal_identity:req.body.personal_identity,
        sponsor:"no",
        profile:req.file.filename
    })
    .then(()=>{
        res.send('successfully inserted')
    })
    .catch((err)=>{
        console.log(err)
        res.send('not inserted')
    })
})



router.get('/sponsors',function(req,res){
    client.db('charity').collection('sponsor_data').find({}).toArray()
    .then((records)=>{
        res.send(records)
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error')
    })
})

router.get('/children',function(req,res){
    client.db('charity').collection('children_data').find({}).toArray()
    .then((records)=>{
        res.send(records)
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error')
    })
})



router.get('/sponsor:id',function(req,res){
    client.db('charity').collection('sponsor_data').findOne({child_id:(req.params.id)})
    .then((record)=>{
        res.send(record)
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get('/donation',function(req,res){
    client.db('charity').collection('donation').find({}).toArray()
    .then((records)=>{
        res.send(records)
        console.log(records)
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error')
    })
})

router.get('/feed',function(req,res){
    client.db('charity').collection('feed_data').find({}).toArray()
    .then((records)=>{
        res.send(records)
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error')
    })
})

router.get('/occasion',function(req,res){
    client.db('charity').collection('occasion_data').find({}).toArray()
    .then((records)=>{
        res.send(records)
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error')
    })
})

router.get('/ordinary:id',function(req,res){
    client.db('charity').collection('donation').findOne({_id:new ObjectId(req.params.id)})
    .then((record)=>{
        res.send(record)
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get('/feed_food:id',function(req,res){
    client.db('charity').collection('feed_data').findOne({_id:new ObjectId(req.params.id)})
    .then((record)=>{
        res.send(record)
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get('/Occassion_deta:id',function(req,res){
    client.db('charity').collection('occasion_data').findOne({_id:new ObjectId(req.params.id)})
    .then((record)=>{
        res.send(record)
    })
    .catch((err)=>{
        res.send(err)
    })
})

module.exports = router