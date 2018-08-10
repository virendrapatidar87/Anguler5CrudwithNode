const category = require('../../../models/category'),
    project = require('../../../models/project'),
    verifytoken = require('../../../config/verifytoken'),
    commonutils = require('../../../config/common'),
    searchOptions = require('../../../config/searchoptions');
class CategoryController {

    constructor(router) {
        router.get('/:projectId', verifytoken, this.getList.bind(this));
        router.post('/', verifytoken, this.save.bind(this));
        router.put('/', verifytoken, this.update.bind(this));
        router.get('/by_id/:id', verifytoken, this.getById.bind(this));

        router.delete('/:id', verifytoken, this.delete.bind(this));
    }

    prepareSearchOption(req) {
        var filter = null;
        var queryParams = req.query.search;
        console.log('queryParams '+queryParams);
        var projectid = req.params.projectId;
        var fieldOption = null;
        if (req.userRole == 'admin') {
            if (queryParams) {
                filter = {projectId: projectid, name: { "$regex":queryParams , "$options": "i" }};
                fieldOption = 'name';
            } else {
                filter = {};
            }

        } else {
            if (queryParams) {
                filter = { projectId: projectid, status: 'A', name: { "$regex":queryParams , "$options": "i" } };
                fieldOption = 'name';
            } else {
                filter = { projectId: projectid, status: 'A' };
            }
        }
        return new searchOptions(filter,fieldOption);
    }

    getList(req, res, next) {
        var projectId = req.params.projectId;
        if (projectId) {
            var options = this.prepareSearchOption(req);
            console.log('options '+options.filter);
        
            category.find(options.filter).populate('projectId','name').exec( function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    //console.log("data --------------------------------")
                    res.send(data);
                }
            });
        } else {
            res.status(404).send('please pass projectId as param');
        }
    }


    save(req, res, next) {
        var cat = new category(req.body);

        cat.createdBy = req.userId;
        if (req.userRole == 'admin') {
            cat.status = 'A';
        } else {
            cat.status = 'N'; //need approval
        }
        var commonUtils = new commonutils();
        cat.createdDate = commonUtils.getCurrnetDate();

        cat.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "Category has been Inserted..!!"
                });
            }
        });
    }

    update(req, res, next) {
        var proj = new project(req.body);
        /*  proj.createdBy = req.userId;
         proj.createdDate = commonutils.getCurrnetDate(); */
        category.findByIdAndUpdate(req.body.id, { name: req.body.name, projectId: req.body.projectId }, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "Category has been updated..!!"
                });
            }
        });
    }

    delete(req, res, next) {
        if (req.userRole == 'admin') {
            category.findByIdAndRemove(req.params.id, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "Category has been deleted..!!"
                    });
                }
            });
        } else {
            res.status(403).send('not authorized user');
        }
    }

    getById(req, res, next) {

        category.findById(req.params.id).populate( 'projectId','name').exec(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send('Requested data not found!');
                }
            }
        });
    }
}

module.exports = CategoryController;