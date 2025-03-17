const express = require("express");
const agentController = require("../controllers/agentController");
const router = express.Router();

router.get("/tasks/:agentId", agentController.getAssignedTasks);
router.put("/task/:taskId/status", agentController.updateTaskStatus);

module.exports = router;
