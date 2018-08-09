const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

 const NoteSchema = new Schema({      
 name: { type: String   },       
 note: { type: String   },   
},{ versionKey: false });  
   
 module.exports  = mongoose.model('notes', NoteSchema, 'notes'); 
