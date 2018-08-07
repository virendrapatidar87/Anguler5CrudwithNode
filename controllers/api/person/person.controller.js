const user = require('../../../models/user');

class PersonController {

	constructor(router) {
	  router.get('/getUser', this.getPerson.bind(this));
    router.post('/SaveUser', this.saveUser.bind(this));
    router.post('/deleteUser', this.deleteUser.bind(this));
    router.get('/getUser/:id', this.getUserById.bind(this));
  }

  
  
  saveUser(req, res) {
    var mod = new user(req.body);
    if (req.body.mode == "Save") {
      mod.save(function(err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            data: "Record has been Inserted..!!"
          });
        }
      });
    } else {
    	user.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        note: req.body.note
      },
        function(err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send({
              data: "Record has been Updated..!!"
            });
          }
        });
    }
  }

  deleteUser(req, res) {
	 console.log("Delete User ----------------------------")
	  user.remove({
      _id: req.body.id
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          data: "Record has been Deleted..!!"
        });
      }
    });
  }
  getUserById(req,res){
    const id = req.params.id;
    user.findById(id,function(err,data){
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });

  }

  getPerson(req, res) {
	  console.log("data --------------------------------")
    user.find({}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
    	  console.log("data --------------------------------")
        res.send(data);
      }
    });

  }
}

module.exports = PersonController;