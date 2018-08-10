const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      config = require('../config/config');

// define the schema for our user model
const userSchema = mongoose.Schema({      
    username: { type: String   },       
    email: { type: String   },
    password: { type: String   },
    userRole: { type: String   }    
   },{ versionKey: false });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.genrateToken = function(user){
    var token = jwt.sign({ id: user._id, username : user.username, userrole : user.userRole  }, config.secret, {
        expiresIn: 82000 // expires in 24 hours
      });
return token;
};

userSchema.methods.comparPass = function(password,dbpass){
    console.log('current pass '+password + 'db pass' + dbpass);
    var passwordIsValid = bcrypt.compareSync(password,dbpass );
return passwordIsValid;
};
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema,'user');
