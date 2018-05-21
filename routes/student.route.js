var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var StudentSchema = require('../models/db.schema');
var myschema =  StudentSchema.Schema;
var bcrypt = require('bcrypt');
const saltRounds = 10;

var url = 'mongodb://127.0.0.1:2701/Miracle';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', function(){
  console.log("Error connecting to Database");	
  });
  
db.on('open',function(){	
  console.log("Database Connected");	
  });




router.get('/getStudents',function(req,res){
    res.send('Response from server is'+data);
    myschema.find(function(err,result){
        if(err)
        {
            res.send('Failed to fetch data');
        }
        else
        {
            res.send(result);
        }
    })
})

router.post('/login',function(req,res){
    
    myschema.find({'email':req.body.email},function(err,result){
        if(err)
        {
            res.send('Failed to fetch data')
        }
        else
        {
            if(result.length > 0)
            {
                bcrypt.compare(req.body.password,result.password , function(err, data) {
                    // data == true
                    if(data == true)
                    {
                        res.send({'msg':'Login Success'})
                    }
                    else
                    {
                        res.send('Invalid password');
                    }
                });
            }
            else
            {
                res.send('User not found');
            }
        }
    })
})

router.post('/create',function(req,res){
    var data = new myschema();
    data.name = req.body.name;
    data.email = req.body.email;
    data.phoneno = req.body.phoneno;
    data.rollno = req.body.rollno;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        data.password = hash;
        data.save(function(err,result){
            if(err)
            {
                res.send('Failed to Insert data')
            }
            else
            {
                res.send({'msg':'Success'});
            }
        })
      });
    
})

module.exports = router;