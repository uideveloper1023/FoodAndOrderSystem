// importing express module
var express = require('express');
const fs = require('fs');
var app = express();
var router = express.Router();
var multer = require('multer');
// importing mongoose module
var mongoose = require('mongoose');

// importing schema file 
var Schema = require('../models/hotel.schema');

// assinging model to variable
var HotelSchema =  Schema.HotelSchema;
var AuthSchema = Schema.AuthSchema;
var CustSchema = Schema.CustomerSchema;
var MenuSchema = Schema.MenuItemsSchema;
var TransactionSchema = Schema.TransactionSchema
var cartSchema = Schema.cartSchema

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
// importing bcrypt 
var bcrypt = require('bcrypt');
const saltRounds = 10;

// mongodb url
var url = 'mongodb://127.0.0.1:27017/Hoteldb';

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


// router.get('/getStudents',function(req,res){

//     // mySchema is model of your db
//     // find is used to retrieve data from db
//     myschema.find(function(err,result){
//         if(err)
//         {
//             res.send('Failed to fetch data');
//         }
//         else
//         {
//             res.send(result);
//         }
//     })
// })


///////getTransactions

router.post('/postTransactions',(req,res)=> 
{
    var hotel_email = req.body.hotelEmail;
    if(hotel_email)
    {
        TransactionSchema.find({'hotel_email':hotelEmail},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            console.log(output.hotel_email);
               res.json({'response':output});
           }
        })
    }
    else
     {
        TransactionSchema.find((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   
})





/////// MyCart

  router.post('/cart',function(req,res){
    
    // item=req.body.item_details
    // console.log(item);
	
    var data = new cartSchema();
    //  for(var i=0;i<req.body.item_details.length;i++){

        data.item_details = req.body.item_details;
    //  }
    data.hotelLocation=req.body.hotelLocation
    data.hotelName=req.body.hotelName
    data.hotelAddress=req.body.hotelAddress
     console.log( data.item_details);
	data.TotalPrice=req.body.TotalPrice
	data.CustomerEmail=req.body.CustomerEmail
	data.hotelEmail=req.body.hotelEmail
    data.deliveryStatus="Pending";
	console.log(data.TotalPrice)
	console.log(data.CustomerEmail);
	console.log(data.hotelEmail);
	data.save(function(err,result){
           if(result){
				console.log("success");
				res.send("Saved in Db");
			}
       })
	
 });

//////////////Show My cart 2 customer/////

router.post('/Mycart',(req,res)=> 
{
    var CustomerEmail = req.body.CustomerEmail;
    console.log(CustomerEmail)
    if(CustomerEmail)
    {
        cartSchema.find({'CustomerEmail':CustomerEmail},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            console.log(output.CustomerEmail);
               res.json({'response':output});
           }
        })
    }
    else
     {
        cartSchema.find((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   
})


//////////////Show My cart 2 Restaurant/////

router.post('/Mycart2',(req,res)=> 
{
    var hotelEmail = req.body.email;
    console.log(hotelEmail)
    if(hotelEmail)
    {
        cartSchema.find({'hotelEmail':hotelEmail},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            console.log(output.hotelEmail);
               res.json({'response':output});
           }
        })
    }
    else
     {
        cartSchema.find((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   
})



////// update Delivery staus from restaurant
router.post('/updateDeliveryStatus',(req,res)=> 
{   var _id=req.body.id;
    var status = req.body.deliveryStatus;
    
    //var myquery = { _id : "910" };
    var newvalues = {$set:{deliveryStatus :status }};
   
    if(status)
    {
        cartSchema.update({_id :_id} ,newvalues,(err,output)=> {
            res.send("updated");
        }).catch(function(error,records,response){

            console.log(error)
        })
        
    }
    
})



///// Restaurant Show Menu
router.post('/ShowMenu',(req,res)=> 
{
    var hotelEmail = req.body.email;
    console.log(hotelEmail)
    if(hotelEmail)
    {
        MenuSchema.find({'hotel_email':hotelEmail},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            console.log(output.hotel_email);
               res.json({'response':output});
           }
        })
    }
    else
     {
        MenuSchema.find((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   
})




///// Restaurant Delete Individual item
router.post('/delMenuItem',(req,res)=> 
{
    var _id = req.body._id;
    console.log(_id)
    if(_id)
    {
        MenuSchema.remove({'_id':_id},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            console.log(output._id);
               res.json({'response':output});
           }
        })
    }
    else
     {
        MenuSchema.remove((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   
})


////// update working perfectly
router.post('/updateMenuItem',(req,res)=> 
{   var _id=req.body.id;
    var name = req.body.name;
    var type =req.body.type;
    var price=req.body.price;
    var description =req.body.description;
    console.log(name)
    var myquery = { _id : "910" };
    var newvalues = {$set:{ item_name: name ,item_type: type ,item_price: price , item_description :description }};
   
    if(description)
    {
        MenuSchema.update({_id :_id} ,newvalues,(err,output)=> {
            res.send("updated");
        }).catch(function(error,records,response){

            console.log(error)
        })
        
    }
    
})


// ////// update
// router.post('/updateMenuItem',(req,res)=> 
// {
//     var d = req.body.d;
//     console.log(d)
//     var myquery = { _id : "910" };
//     var newvalues = { $push :{ item_name: d }};
//     if(d)
//     {
//         MenuSchema.updateOne({myquery ,newvalues},(err,output)=> {
       

//         }).catch(function(error,records,response){

//             console.log(error)
//         })

//     }


// post api for checking login functionality
router.post('/login',function(req,res){
    
    
    AuthSchema.find({'email':req.body.email},function(err,result){
        if(err)
        {
            res.json({'msg':'Failed to fetch data'})
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
                        res.json({'msg':'Login Success','output' :result })
                    }
                    else
                    {
                        res.json({'msg':'Invalid password'});
                    }
                });
            }
            else
            {
                res.json({'msg':'User Not Found'});
            }
        }
    })
})

// for admin user creation

router.get('/admin',(req,res,next)=> {
    var authSchema = new AuthSchema();
    authSchema._id = 'admin@gmail.com';
    authSchema.email = 'admin@gmail.com';
    authSchema.role = 'Admin';
    bcrypt.hash('admin', saltRounds, function(err, hash) {
        authSchema.password = hash;
        authSchema.save(function(err,output){
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json({'msg':'Success'});
            }
        })
    });
    
   
})

//post api to insert Menu items
router.post('/addmenu',multer({ dest: './public/uploads/'}).single('itemsimg'),function(req,res){
    console.log(req.body);
    // creating object for our model
    var data = new MenuSchema();
    // assigning data to our model
    data.item_name = req.body.itemname;
    data._id = Math.floor(Math.random()*1000)
    data.item_id = data._id;
    data.item_type = req.body.itemtype;
    data.item_description = req.body.description;
    data.item_price = req.body.price;
    data.hotel_email = req.body.hotel_email;

    
    data.item_img = req.file.filename;
   

        // data.save function is used to store our data in db
        data.save(function(err,result){
            if(err)
            {try {
                fs.unlinkSync('./public/uploads/'+data.item_img);
            
              } catch (err) {
                // handle the error
              }
              
              res.json({'msg':'Failed','description':'Email Already Exists in DB'});
            }
            else
            {
                res.json({'msg':'Success'});
               
            }
        })
})


// post api to hotelsignup data
router.post('/hotelsignup',multer({ dest: './public/uploads/'}).single('hotelimg'),function(req,res){
    console.log("Hitting");
    // creating object for our model
    var data = new HotelSchema();
    // assigning data to our model
    data.hotel_name = req.body.hotelname;
    data.hotel_email = req.body.email;
    data._id = req.body.email;
    data.hotel_id = Math.floor(Math.random()*10000)
    data.hotel_phoneno = req.body.phoneno;
    data.hotel_address = req.body.address;
    data.hotel_pincode = req.body.pincode;
    data.hotel_location = req.body.location
    data.hotel_img = req.file.filename;
    // encrypting our password
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        // assigning encrypted password to our model
        data.hotel_password = hash;

        // data.save function is used to store our data in db
        data.save(function(err,result){
            if(err)
            {try {
                fs.unlinkSync('./public/uploads/'+data.hotel_img);
            
              } catch (err) {
                // handle the error
              }
              
              res.json({'msg':'Failed','description':'Email Already Exists in DB'});
            }
            else
            {
                var authSchema = new AuthSchema();
                authSchema._id = data.hotel_email;
                authSchema.email =data.hotel_email;
                authSchema.password = data.hotel_password;
                authSchema.role = 'Restaurant'
                authSchema.save(function(err,output){
                    if(err)
                    {

                    }
                    else
                    {
                        res.json({'msg':'Success'});
                    }
                })
               
            }
        })
      });
    
})

// customer signup
router.post('/customersignup',multer({ dest: './public/uploads/'}).single('custimg'),function(req,res){
    console.log(req.body);
    console.log(req.file.filename);
    // creating object for our model
    var data = new CustSchema();
    // assigning data to our model
    data.name = req.body.name;
    data.email = req.body.email;
    data._id = req.body.email;
    data.phoneno = req.body.phoneno;
    
    data.custid = Math.floor(Math.random()*10000);
  
    data.address = req.body.address;
    data.pincode = req.body.pincode;
    data.location = req.body.location;
    data.img = req.file.filename;

    // encrypting our password
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        // assigning encrypted password to our model
        data.password = hash;
        // data.save function is used to store our data in db
        data.save(function(err,result){
            if(err)
            {
                try {
                    fs.unlinkSync('./public/uploads/'+data.img);
                
                  } catch (err) {
                    // handle the error
                  }
                console.log(err);
              
              res.json({'msg':'Failed','description':'Email Already Exists in DB'});
            }
            else
            {
                var authSchema = new AuthSchema();
                authSchema._id = data.email;
                authSchema.email =data.email;
                authSchema.password = data.password;
                authSchema.role = 'Customer'
                authSchema.save(function(err,output){
                    if(err)
                    {
                        res.json({'msg':'Failed','description':'Email Already Exists in DB'});

                    }
                    else
                    {
                        res.json({'msg':'Success'});
                    }
                })
               
            }
        })
      });
    
})

//customer profile

router.post('/getProfile',(req,res)=> {
    var data = req.body.email;
    var role = req.body.role;
    
    if(role === 'Restaurant')
    {
        HotelSchema.find({'hotel_email':data},(err,response) =>
    {
        if(err)
        {

        }
        else
    {
        res.json({'response':response});
    }
    })
    }
    else if(role === 'Admin')
    {

    }
    else if(role === 'Customer')
    {
        
        CustSchema.find({'email':data},(err,response) =>
    {
        if(err)
        {
            res.json(err)
        }
        else
    {
    
        res.json({'response':response});
    }
    })
    }

})
/////Get hotel Details to Customer by there location.
router.get('/getHotels',(req,res)=> {
    var location = req.query.location;
    if(location)
    {
        HotelSchema.find({'hotel_location':location},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            
               res.json({'response':output});
           }
        })
    }
    else
     {
         HotelSchema.find((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   

});




///Hotels display on Home page

router.get('/getHomePageHotels',(req,res)=> {
   
    
        HotelSchema.find((err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            
               res.json({'response':output});
           }
        })
    
    

});




router.get('/getMenu',(req,res)=> {
    var hotelemail = req.query.hotelemail;
    if(hotelemail)
    {
        MenuSchema.find({'hotel_email':hotelemail},(err,output)=> {
            if(err)
            {
               res.json(err);
            }
            else
           {
            
               res.json({'response':output});
           }
        })
    }
    else
     {
        MenuSchema.find((err,output)=> {
             if(err)
             {
                res.json(err);
             }
             else
            {
                console.log(output);
                res.json(output);
            }
         })
     }   
})

////////2nd methog  transactions


router.post('/Transactions',function(req,res){
	
	//data=req.body;
    //console.log(data);
    var data = new TransactionSchema();
    data.hotel_email = req.body.hotel_email
	data.item_description=req.body.item_description
	data.item_id=req.body.item_id
	//data.item_img = req.file.filename;
	data.item_name=req.body.item_name
	data.item_price=req.body.item_price
	data.item_type=req.body.item_type
	data.quantity=req.body.quantity
console.log(data.item_type);
	data.save(function(err,result){
            if(result){
				console.log("success");
				
			}
        });
	
});


// exporting our router
module.exports = router;