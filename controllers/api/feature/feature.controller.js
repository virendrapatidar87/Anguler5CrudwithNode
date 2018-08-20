const feature = require('../../../models/feature'),
    project = require('../../../models/project'),
    verifytoken = require('../../../config/verifytoken'),
    commonutils = require('../../../config/common'),
    searchOptions = require('../../../config/searchoptions');
class FeatureController {

    constructor(router) {
        router.get('/list', verifytoken, this.getList.bind(this));
        router.get('/select/:projectId', verifytoken, this.getSelectList.bind(this));
        router.get('/select', verifytoken, this.getSelectList.bind(this));
        router.post('/', verifytoken, this.save.bind(this));
        router.put('/', verifytoken, this.update.bind(this));
        router.get('/by_id/:id', verifytoken, this.getById.bind(this));

        router.delete('/:id', verifytoken, this.delete.bind(this));
    }

    prepareSearchOption(req) {
        var filter = null;
        var queryParams = req.query.search;
        console.log('queryParams ' + queryParams);

        if (req.userRole == 'admin') {
            if (queryParams) {
                filter = { name: { "$regex": queryParams, "$options": "i" } };
            }
            else {
                filter = {};
            }
        } else {
            if (queryParams) {

                filter = { status: 'A', name: { "$regex": queryParams, "$options": "i" } };
            }
            else {
                filter = { status: 'A' };
            }
        }

        return new searchOptions(filter, '');
    }

    getList(req, res, next) {
        var projectIds = req.query.projectId;

        var options = this.prepareSearchOption(req);
        console.log('options ' + options.filter);
        feature.schema.options = {toJson : {virtuals:false}};
        project.schema.options = {toJson : {virtuals:false}};
        feature.find(options.filter).populate('projects', 'name').exec(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                //console.log("data --------------------------------")
                res.send(data);
            }
        });

    }
    getSelectList(req, res, next) {
        console.log('options ----- ');
        //var projectId = req.params.projectId;

        var options = this.prepareSearchOption(req);
        console.log('options ----- ' + options.filter);

        feature.find(options.filter, 'name').populate('projects', 'name').exec(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                //console.log("data --------------------------------")
                res.send(data);
            }
        });
    }

    save(req, res, next) {
        var featureObject = new feature(req.body);

        featureObject.createdBy = req.userId;
        if (req.userRole == 'admin') {
            featureObject.status = 'A';
        } else {
            featureObject.status = 'N'; //need approval
        }
        var commonUtils = new commonutils();
        featureObject.createdDate = commonUtils.getCurrnetDate();
        featureObject.projects.push();
        featureObject.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "feature has been Inserted..!!"
                });
            }
        });
    }

    update(req, res, next) {
        feature.findByIdAndUpdate(req.body.id, { name: req.body.name, projects: req.body.projects }, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: "feature has been updated..!!"
                });
            }
        });
    }

    delete(req, res, next) {
        if (req.userRole == 'admin') {
            feature.findByIdAndRemove(req.params.id, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        data: "feature has been deleted..!!"
                    });
                }
            });
        } else {
            res.status(403).send('not authorized user');
        }
    }

    getById(req, res, next) {

        feature.findById(req.params.id).populate('projects', 'name').exec(function (err, data) {
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

module.exports = FeatureController;