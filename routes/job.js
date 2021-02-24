const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job");
router.post("/job", jobController.createJob);
router.get("/jobs", jobController.getJobs);
router.get("/job-filter", jobController.advancedFilter);
router.delete("/job/:id", jobController.removeJob);
// router.put("/job/:id", jobController.updatejob);
module.exports = router;