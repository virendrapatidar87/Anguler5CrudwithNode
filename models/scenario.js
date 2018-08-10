const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ScenarioSchema = new Schema({

    name: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }
    
}, { versionKey: false });

module.exports = mongoose.model('scenario', ScenarioSchema, 'scenario'); 
