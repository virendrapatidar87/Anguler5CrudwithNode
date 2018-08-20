const project = require('../../../models/project'),
    verifytoken = require('../../../config/verifytoken'),
    commonutils = require('../../../config/common'),
    searchOptions = require('../../../config/searchoptions');

class ProjectController {

    constructor(router) {
        router.get('/', verifytoken, this.getList.bind(this));
        router.get('/select', verifytoken, this.getSelectList.bind(this));
        router.post('/', verifytoken, this.save.bind(this));
        router.put('/', verifytoken, this.update.bind(this));
        router.get('/:id', verifytoken, this.getById.bind(this));
        
        router.delete('/:id', verifytoken, this.delete.bind(this));
    }

    prepareSearchOption(req){
        var filter = null;
        var queryParams = req.query.search;
        var fieldOption = null;
        if(req.userRole == 'admin'){
            if(queryParams){
                filter = {name: { "$regex":queryParams , "$options": "i" }};
                fieldOption = 'name';
            }else{
                filter = {};
            }
            
        }else{
            if(queryParams){
             filter = {status: 'A',name: { "$regex":queryParams , "$options": "i" }};
             fieldOption = 'name';
            }else{
             filter = {status: 'A'} ;
            }
        }
     return new searchOptions(filter,fieldOption);
    }

    getList(req, res, next) {
       
        var options=    this.prepareSearchOption(req);
        project.schema.options = {toJason: {virtuals:false}};
        project.find(options.filter,'name')/* .populate('name') */.exec( function (err, data) {
            if (err) {
                res.send(err);
            } else {
                //console.log("data --------------------------------")
                res.send(data);
            }
        });
        
    }
    getSelectList(req, res, next) {
       // var options=    this.prepareSearchOption(req);
         project.find({},'name', function (err, data) {
             if (err) {
                 res.send(err);
             } else {
                 //console.log("data --------------------------------")
                 res.send(data);
             }
         });
     }
    
    save(req, res, next) {
        var proj = new project(req.body);
        
        proj.createdBy = req.userId;
        if(req.userRole == 'admin'){
            proj.status = 'A';
        }else{
            proj.status = 'N'; //need approval
        }
        var commonUtils = new commonutils();
        proj.createdDate = commonUtils.getCurrnetDate();

        proj.save(function (err, data) {
               if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "Project has been Inserted..!!"
                    });
                }
            });
    } 
    
    update(req, res, next) {
        var proj = new project(req.body);
       /*  proj.createdBy = req.userId;
        proj.createdDate = commonutils.getCurrnetDate(); */
        project.findByIdAndUpdate(req.body.id,{name: req.body.name},function (err, data) {
               if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "Project has been updated..!!"
                    });
                }
            });
    } 
    
    delete(req, res, next) {
        if(req.userRole == 'admin'){
        project.findByIdAndRemove(req.params.id,function (err, data) {
               if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "Project has been deleted..!!"
                    });
                }
            });
        }else{
            res.status(403).send('not authorized user');
        }
    } 

    getById(req, res, next) {

        project.findById(req.params.id, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                if(data){
                res.send(data);
                }else{
                    res.status(404).send('Requested data not found!');
                }
            }
        });
    }
}

module.exports = ProjectController;