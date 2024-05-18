const expres = require('express')
const router = expres.Router();
const client = require('../connection')
const {ObjectId} = require('mongodb')

// Testing
router.get('/',function(req,res){
    res.send("welcome end user")
});

// Send Donation data
router.post('/',function(req,res){
    client.db('charity').collection('donation').insertOne(req.body)
    .then(()=>{
        res.send('successfully inserted')
    })
    .catch((err)=>{
        console.log(err)
        res.send('not inserted')
    })
})

// Get Feed data
router.get('/feed',((req,res)=>{
    client.db('charity').collection('feed_data').find({}).toArray()
    .then((records)=>{
        res.send(records)
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error')
    })
}))

// Send Feed data
router.post('/feed',((req,res)=>{
    client.db('charity').collection('feed_data').insertOne(req.body)
    .then(()=>{
        res.send('successfully inserted')
    })
    .catch((err)=>{
        console.log(err)
        res.send('not inserted')
    })
}))

router.get('/:age/:region',async (req,res)=>{
    try{
        let result = await client.db('charity').collection('children_data').find({age:req.params.age,region:req.params.region,sponsor:"no"}).toArray()
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.send('Error')
    }
})

// Send Occasion data
router.post('/occasion',((req,res)=>{
    client.db('charity').collection('occasion_data').insertOne(req.body)
    .then(()=>{
        res.send('successfully inserted')
    })
    .catch((err)=>{
        console.log(err)
        res.send('not inserted')
    })
}))

//sponsor data
router.post('/sponsor',((req,res)=>{
    client.db('charity').collection('sponsor_data').insertOne(req.body)
    client.db('charity').collection('children_data').updateOne(
        {_id:new ObjectId(req.body.child_id)},
        // update value
        {$set:{sponsor:"yes"}}
    )
    .then(()=>{
        res.send('successfully inserted')
        // .then(()=>{
        //     res.send('successfully inserted')
        // })
        // .catch((err)=>{
        //     console.log(err)
        //     res.send('not inserted')
        // })
    })
    .catch((err)=>{
        console.log(err)
        res.send('not inserted')
    })
    
}))
module.exports = router