const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({

    name: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }
    
}, { versionKey: false });

module.exports = mongoose.model('category', CategorySchema, 'category'); 
