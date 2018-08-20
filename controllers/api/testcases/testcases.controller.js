const category = require('../../../models/category'),
    project = require('../../../models/project'),
    scenario = require('../../../models/scenario'),
    testcase = require('../../../models/testcases')
verifytoken = require('../../../config/verifytoken'),
    commonutils = require('../../../config/common'),
    searchOptions = require('../../../config/searchoptions');
class TestCaseController {

    constructor(router) {
        router.get('/list/:projectId/:categoryId/:scenarioId', verifytoken, this.getList.bind(this));
        router.get('/list', verifytoken, this.getList.bind(this));

        router.post('/', verifytoken, this.save.bind(this));
        router.put('/', verifytoken, this.update.bind(this));
        router.get('/by_id/:id', verifytoken, this.getById.bind(this));

        router.delete('/:id', verifytoken, this.delete.bind(this));
    }

    prepareSearchOption(req) {
        var filter = null;
        var queryParams = req.query.search;
        console.log('queryParams ' + queryParams);
        var scenarioid = req.params.scenarioId;
        //var projectid = req.params.projectId;
        if (req.userRole == 'admin') {
            if (queryParams) {
                if (scenarioid) {
                    filter = { scenarioId: scenarioid, name: { "$regex": queryParams, "$options": "i" } };
                } else {
                    filter = { name: { "$regex": queryParams, "$options": "i" } };
                }
                // fieldOption = 'name';
            } else {
                if (scenarioid) {
                    filter = { scenarioId: scenarioid };
                } else {
                    filter = {};
                }
            }

        } else {
            if (queryParams) {
                if (scenarioid) {
                    filter = { scenarioId: scenarioid, status: 'A', name: { "$regex": queryParams, "$options": "i" } };
                } else {
                    filter = { status: 'A', name: { "$regex": queryParams, "$options": "i" } };
                }

            } else {
                if (scenarioid) {
                    filter = { scenarioId: scenarioid, status: 'A' };
                } else {
                    filter = { status: 'A' };
                }
            }
        }
        return new searchOptions(filter, '');
    }

    getList(req, res, next) {
        //scenario.remove({}).exec(function(err,data){})        
        // var categoryId = req.params.categoryId;
        // var projectId = req.params.projectId;
        // console.log('project id'+ projectId)

        /* if(projectId!=null && projectId!='0'){

            category.find({'projectId':projectId },'_id').exec(function (err, data) {
              
                scenario.find({'categoryId':categoryId }).populate({
            
                    path: 'categoryId',
            select: 'name projectId',
            populate: { path: 'projectId', select: 'name', model: project }
            }).exec(function (err, data) {
                res.send(data);
            })
        })

        } */

        var filterOption = this.prepareSearchOption(req);
        /*  scenario.remove({},function(err,data){
             console.log(data);
         });  */
        console.log(JSON.stringify(filterOption.filter))
        testcase.find(filterOption.filter).populate({

            path: 'scenarioId',
            select: 'name categoryId',
            model: scenario,
            populate: {
                path: 'categoryId',
                select: 'name projectId',
                model : category ,
                populate: {
                    path: 'projectId',
                    select: 'name ',
                   /*  model : project */
                }
            },
            //populate: { path: 'projectId', select: '_id', model: project }

        }).exec(function (err, data) {
            res.send(data);
        })

        /* if (categoryId) {
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
        } */
    }


    save(req, res, next) {
        console.log(JSON.stringify(req.body));
        var testC = new testcase(req.body);

        testC.createdBy = req.userId;
        if (req.userRole == 'admin') {
            testC.status = 'A';
        } else {
            testC.status = 'N'; //need approval
        }
        var commonUtils = new commonutils();
        testC.createdDate = commonUtils.getCurrnetDate();

        testC.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "Test Case has been Inserted..!!"
                });
            }
        });
    }

    update(req, res, next) {
        // var proj = new scenario(req.body);
        /*  proj.createdBy = req.userId;
         proj.createdDate = commonutils.getCurrnetDate(); */
        testcase.findByIdAndUpdate(req.body.id, {
            name: req.body.name, scenarioId: req.body.scenarioId, description: req.body.description,
            givenStatement: req.body.givenStatement,
            whenStatement: req.body.whenStatement,
            thanStatement: req.body.thanStatement,
            isBlocked: req.body.isBlocked,
            reasonOfBlocker: req.body.reasonOfBlocker
        }, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "Test Case has been updated..!!"
                });
            }
        });
    }

    delete(req, res, next) {
        if (req.userRole == 'admin') {
            testcase.findByIdAndRemove(req.params.id, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "Test Case has been deleted..!!"
                    });
                }
            });
        } else {
            res.status(403).send('not authorized user');
        }
    }

    getById(req, res, next) {

        testcase.findById(req.params.id).populate({
            path: 'scenarioId', select: 'categoryId',
            populate: {
                path: 'categoryId', select: 'projectId', model: category,
                populate: { path: 'projectId', select: '_id', model: project }
            }
        }).exec(function (err, data) {
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

module.exports = TestCaseController;