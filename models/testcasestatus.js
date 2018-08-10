const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const TestCaseStatusSchema = new Schema({

    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }

}, { versionKey: false });

module.exports = mongoose.model('testcasestatus', TestCaseStatusSchema, 'testcasestatus'); 
