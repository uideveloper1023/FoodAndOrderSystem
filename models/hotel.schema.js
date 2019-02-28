var mongoose = require('mongoose');

//defining Schema for Hotel Collection 
var HotelSchema = mongoose.model('hotel_collection', {
    _id: String,
  hotel_name: String,
  hotel_email: String,
  hotel_id : String,
  hotel_password: String,
  hotel_phoneno: String,
  hotel_address: String,
  hotel_pincode: String,
  hotel_location: String,
  hotel_img:String
});

// schema for Auth Collection
var AuthSchema = mongoose.model('auth_collection', {
    _id: String,
  email:String,
  password:String,
  role:String
});

// Schema for Customer Collection
var CustomerSchema = mongoose.model('customer_collection', {
    _id: String,
  name: String,
  email: String,
  custid : String,
  password: String,
  phoneno: String,
  address: String,
  pincode: String,
  location: String,
  img: String
});

//schema for Itemsmenu Collection

var MenuItemsSchema = mongoose.model('menuitems_collection', {
_id: String,
hotel_email:String,
item_name: String,
item_id: String,
item_type : String,
item_price : String,
item_description: String,
item_img:String
});
var TransactionSchema = mongoose.model('usertransactions_collection',{
 hotel_email:String,
item_name: String,
item_id: String,
item_type : String,
item_price : String,
item_description: String,
//item_img:String,
quantity:String
});

var cartSchema = mongoose.model('cart_collection',{

  item_details:[{
         _id:String,
          hotel_email:String,
          item_id:String,
          item_img:String,
          item_name:String,
          item_price:String,
          item_type:String,
          quantity:String

  }],
  hotelName:String,
  hotelAddress:String,
  hotelLocation:String,
  deliveryStatus:String,
  
  TotalPrice:String,
  CustomerEmail: String,
  hotelEmail: String,

 });
 

// exporting our schema
module.exports.HotelSchema=HotelSchema;
module.exports.AuthSchema=AuthSchema;
module.exports.CustomerSchema=CustomerSchema;
module.exports.MenuItemsSchema=MenuItemsSchema;
module.exports.TransactionSchema=TransactionSchema;
module.exports.cartSchema=cartSchema;