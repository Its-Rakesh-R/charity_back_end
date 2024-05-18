const express = require('express');
const admin = require('./routes/adminuser')
const enduser = require('./routes/enduser')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3003;

// const client = require('../connection')
const multer = require("multer");

app.use(cors())
app.use(express.json())
// // Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // Parse application/json
// app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/enduser',enduser)
app.use('/admin',admin)


// const storage = multer.diskStorage({

//     destination: function(req,file,cb){
//         return cb(null,'./public')
//     },
//     filename: function (req, file, cb) {
//         return cb(null,`${Date.now()}_${file.originalname}`)
//         // Date.now() + '-' +file.originalname 
//     }
//     })
    
    
// const upload = multer({ storage: storage });

// ,upload.single('file')
// app.post('/ok',upload.single('file'),(req,res)=>{
//     res.send('ok')
//     console.log(req.body)
//     console.log(req.file)
//     console.log(req.file.filename)
// })

app.listen(port,()=>{
    console.log('server started')
})
