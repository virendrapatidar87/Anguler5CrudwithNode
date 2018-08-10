const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ProjectSchema = new Schema({

    name: { type: String },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }

}, { versionKey: false });

module.exports = mongoose.model('project', ProjectSchema, 'project'); 
