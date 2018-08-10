const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const TestCaseSchema = new Schema({

    description: { type: String },
    givenStatement: {type: String},
    whenStatement: {type: String},
    thanStatement: {type: String}, 
    resultStatus: {type: String},
    scenarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'scenario' },
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'testcasestatus' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }
    
}, { versionKey: false });

module.exports = mongoose.model('testcase', TestCaseSchema, 'testcase'); 
