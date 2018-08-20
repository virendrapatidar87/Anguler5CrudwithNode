const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const TestCaseSchema = new Schema({

    description: { type: String },
    givenStatement: {type: String},
    whenStatement: {type: String},
    thanStatement: {type: String}, 
    isBlocked: {type: String},
    reasonOfBlocker: {type : String},
    scenarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'scenario' },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }
    
}, { toJSON:{virtuals:true}, versionKey: false });

/* TestCaseSchema.virtual('parentScenario', {
    ref: 'scenario', // The model to use
    localField: 'scenarioId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
   // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  }); */

module.exports = mongoose.model('testcase', TestCaseSchema, 'testcase'); 
