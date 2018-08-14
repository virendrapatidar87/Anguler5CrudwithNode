const category = require('../../../models/category'),
    scenario = require('../../../models/scenario'),
    verifytoken = require('../../../config/verifytoken'),
    commonutils = require('../../../config/common'),
    searchOptions = require('../../../config/searchoptions');
class ScenarioController {

    constructor(router) {
        router.get('/:categoryId', verifytoken, this.getList.bind(this));
        router.post('/', verifytoken, this.save.bind(this));
        router.put('/', verifytoken, this.update.bind(this));
        router.get('/by_id/:id', verifytoken, this.getById.bind(this));

        router.delete('/:id', verifytoken, this.delete.bind(this));
    }

    prepareSearchOption(req) {
        var filter = null;
        var queryParams = req.query.search;
        console.log('queryParams '+queryParams);
        var categoryid = req.params.categoryId;
        var fieldOption = null;
        if (req.userRole == 'admin') {
            if (queryParams) {
                filter = {categoryId: categoryid, name: { "$regex":queryParams , "$options": "i" }};
                fieldOption = 'name';
            } else {
                filter = {};
            }

        } else {
            if (queryParams) {
                filter = { categoryId: categoryid, status: 'A', name: { "$regex":queryParams , "$options": "i" } };
                fieldOption = 'name';
            } else {
                filter = { categoryId: categoryid, status: 'A' };
            }
        }
        return new searchOptions(filter,fieldOption);
    }

    getList(req, res, next) {
        var categoryId = req.params.categoryId;
        if (categoryId) {
            var options = this.prepareSearchOption(req);
            console.log('options '+options.filter);
        
            scenario.find(options.filter).populate('categoryId','name').exec( function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    //console.log("data --------------------------------")
                    res.send(data);
                }
            });
        } else {
            res.status(404).send('please pass categoryId as param');
        }
    }


    save(req, res, next) {
        var scen = new scenario(req.body);

        scen.createdBy = req.userId;
        if (req.userRole == 'admin') {
            scen.status = 'A';
        } else {
            scen.status = 'N'; //need approval
        }
        var commonUtils = new commonutils();
        scen.createdDate = commonUtils.getCurrnetDate();

        scen.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "Scenario has been Inserted..!!"
                });
            }
        });
    }

    update(req, res, next) {
       // var proj = new scenario(req.body);
        /*  proj.createdBy = req.userId;
         proj.createdDate = commonutils.getCurrnetDate(); */
         scenario.findByIdAndUpdate(req.body.id, { name: req.body.name, projectId: req.body.projectId }, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "Scenario has been updated..!!"
                });
            }
        });
    }

    delete(req, res, next) {
        if (req.userRole == 'admin') {
            scenario.findByIdAndRemove(req.params.id, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "Scenario has been deleted..!!"
                    });
                }
            });
        } else {
            res.status(403).send('not authorized user');
        }
    }

    getById(req, res, next) {

        scenario.findById(req.params.id).populate( 'categoryId','name').exec(function (err, data) {
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

module.exports = ScenarioController;