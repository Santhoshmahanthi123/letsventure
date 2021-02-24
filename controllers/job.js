const Job = require("../models/job");
const uuid = require("uuid");
// action to create a job
const createJob = async (req, res) => {
    req.body.skills = JSON.parse(req.body.skills)
    if(req.body.job_id){
        req.body.job_id = req.body.job_id  
    }else{
        req.body.job_id = uuid.v4();
    }
    
    const job = new Job(req.body);
    try {
        const job_status = await job.save();
        var success = {status: true, message: "Job created",job_status, duplicate:false}
        statusResponse(200,success,res);
    } catch (error) {
        console.log(error)
        var fail = {status: false, message: "Job creation failed",error:error.message}
        statusResponse(200,success,res);
    }
  };
  // action to list all jobs
  const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        if(jobs){
            const job = {status: true, jobs}
            statusResponse(200,job,res);
        }
      else{
          const no_jobs = {status: false, message: "no jobs found"}
          statusResponse(200,jobs,res);      }
    } catch (error) {
        console.log(error)
        const issue = {status: false, message: error.message, status_code: 500 };
        statusResponse(500,issue,res);
  
    }
  };
// advanced search
  const advancedFilter = async (req, res) => {
    try {
        if(req.body.location){
            const jobs = await Job.find({"location":req.body.location});
            const location_based_jobs = {status: true, jobs}
            statusResponse(200,location_based_jobs,res);

        }

        else if(req.body.min_experience || req.body.max_experience ){
            console.log(req.body.min_experience,req.body.max_experience)
            const min_jobs = await Job.find({"min_experience":{ $gte: req.body.min_experience }}).sort({_id:1});
            const max_jobs = await Job.find({"max_experience":{ $lte: req.body.max_experience }}).sort({_id:1});
            // const j = await Job.aggregate([{
            //     $match : { min_experience: { $gte : req.body.min_experience },max_experience:{$lte : req.body.max_experience } }
            //   }]);
            var result = [...min_jobs, ...max_jobs]
            const out_put = {status: true, result}
            statusResponse(200,result,res);

        }
        else{
            const jobs = await Job.find();
            const job = {status: true, jobs}
            statusResponse(200,job,res);
        }
        
    } catch (error) {
        console.log(error)
        const issue = {status: false, message: error.message, status_code: 500 };
        statusResponse(500,issue,res);
  
    }
  };

// action to remove job
  const removeJob = async (req, res) => {
    const { id } = req.params;
    try {
        const remove_job = await Job.findByIdAndDelete({ _id: id })
        if (!remove_job) {
            res.status(404).json({status: false, message: "Job doesn't exists or have been already removed."});
        } else {
            res.status(200).json({status: true, message: "Successfully removed Job."});
        }

    } catch (err) {
        return res.status(500).json({ status: false,message: err.message });

    }
};
  function statusResponse(status,obj,res){
    return  res.status(status).json(obj);
  }


  module.exports = {
    createJob,
    getJobs,
    removeJob,
    advancedFilter
  };