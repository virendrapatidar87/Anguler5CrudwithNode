const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ProjectSchema = new Schema({

    name: { type: String },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }

}, {toJSON: { virtuals: true } , versionKey: false });

ProjectSchema.virtual('categories', {
    ref: 'category', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'projectId', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
   // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });
  ProjectSchema.virtual('features', {
    ref: 'feature', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'projects', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
   // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });
module.exports = mongoose.model('project', ProjectSchema, 'project'); 
