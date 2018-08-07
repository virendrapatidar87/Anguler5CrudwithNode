const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

 const UsersSchema = new Schema({      
 name: { type: String   },       
 note: { type: String   },   
},{ versionKey: false });  
   
 module.exports  = mongoose.model('users', UsersSchema, 'users'); 
