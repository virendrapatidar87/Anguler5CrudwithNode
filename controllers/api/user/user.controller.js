const user = require('../../../models/user');

class UserController {

	constructor(router) {
	 //router.get('/getNote', this.getPerson.bind(this));
    router.post('/register', this.register.bind(this));
    router.post('/login', this.login.bind(this));
    //router.get('/getNote/:id', this.getNoteById.bind(this));
  }

  register(req,res){
    console.log(req.body)
   var reqUser = new user(req.body);
   console.log("data --------------------------------"+ reqUser);
   reqUser.password = reqUser.generateHash(reqUser.password);
   reqUser.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({value : 'registration done'});
      }
    });
  }   
  login(req,res){
    //var reqUser = new user(req.body);
    user.findOne({username : req.body.username}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
    	  console.log("data --------------------------------"+ data);
        var newUser = new user(data);
        console.log("data --------------------------------"+ newUser);
        var passwordIsValid = newUser.comparPass(req.body.password, newUser.password);
        if(passwordIsValid){
         var genToken = newUser.genrateToken(newUser);
          res.status(200).send({auth : true , token : genToken});
        }else{
          return res.status(401).send({ auth: false, token: null });
        }

      }
    });
  }   
}
module.exports = UserController;