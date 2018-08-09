const note = require('../../../models/note'),
verifytoken = require('../../../config/verifytoken');
class NoteController {

	constructor(router) {
	  router.get('/getNote', verifytoken,this.getNote.bind(this));
    router.post('/SaveNote', verifytoken,this.saveNote.bind(this));
    router.post('/deleteNote',verifytoken, this.deleteNote.bind(this));
    router.get('/getNote/:id',verifytoken, this.getNoteById.bind(this));
  }

  saveNote(req, res, next) {
    var mod = new note(req.body);
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
    	note.findByIdAndUpdate(req.body.id, {
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

  deleteNote(req, res, next) {
	 console.log("Delete Note ----------------------------")
	  note.remove({
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
  getNoteById(req,res, next){
    const id = req.params.id;
    note.findById(id,function(err,data){
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });

  }

  getNote(req, res, next) {
	  console.log("data --------------------------------")
    note.find({}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
    	  console.log("data --------------------------------")
        res.send(data);
      }
    });

  }
}

module.exports = NoteController;