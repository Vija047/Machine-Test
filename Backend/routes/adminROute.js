const express = require("express");
const adminController = require("../controllers/adminController");
const upload = require("../middleware/upload"); // Multer middleware for file uploads
const router = express.Router();

// Define routes
router.post("/create", adminController.createAgent);
router.post("/upload", upload.single("file"), adminController.uploadCSV);
router.post("/distribute-tasks", adminController.distributeTasks);
router.get("/tasks", adminController.getAllTasks);
router.get("/agents", adminController.getAllAgents);
router.put("/update/:agentId", adminController.updateAgent);
router.post("/assign-task", adminController.assignTaskToAgent);

module.exports = router;