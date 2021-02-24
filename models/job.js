  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = new Schema({
    company_name: { type: String, required: true},
    company_logo:{type: String,default:null},
    location: { type: String, required: true },
    job_id: { type: String, required: true},
    job_title: { type: String, required: true},
    skills:{type: Array, required: true},
    min_experience:{ type: Number, required: true },
    max_experience: { type: Number, required: true}
});
module.exports = mongoose.model('Job', jobSchema);