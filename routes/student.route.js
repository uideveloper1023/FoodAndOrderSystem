// importing express module
var express = require('express');
var router = express.Router();

// importing mongoose module
var mongoose = require('mongoose');

// importing schema file 
var StudentSchema = require('../models/db.schema');

// assinging model to mySchema variable
var myschema =  StudentSchema.Schema;

// importing bcrypt 
var bcrypt = require('bcrypt');
const saltRounds = 10;

// mongodb url
var url = 'mongodb://127.0.0.1:27017/Miracle';

mongoose.connect(url);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', function(){
  console.log("Error connecting to Database");	
  });
 
  // to get notification if connected to db
db.on('open',function(){	
  console.log("Database Connected");	
  });

// creating get api to retrieve students information form db
router.get('/getStudents',function(req,res){

    // mySchema is model of your db
    // find is used to retrieve data from db
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

// post api for checking login functionality
router.post('/login',function(req,res){
    
    // mySchema is model of your db
    // find is used to retrieve data from db
    // we are passing email to our find method to fetch the information
    myschema.find({'email':req.body.email},function(err,result){
        if(err)
        {
            res.send('Failed to fetch data')
        }
        else
        {
            // checking condition if we get user data
            if(result.length > 0)
            {
                // comparing the user entered password and encrypted password from database
                // result[0].password is encrypted password from database
                bcrypt.compare(req.body.password,result[0].password , function(err, data) {
                    // data == true
                    // checking for matching the password if data == true our password is matched
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

// post api to insert data
router.post('/create',function(req,res){
    // creating object for our model
    var data = new myschema();
    // assigning data to our model
    data.name = req.body.name;
    data.email = req.body.email;
    data.phoneno = req.body.phoneno;
    data.rollno = req.body.rollno;

    // encrypting our password
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        // assigning encrypted password to our model
        data.password = hash;

        // data.save function is used to store our data in db
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

// exporting our router
module.exports = router;