const bcrypt = require("bcrypt");
const multer = require("multer");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Agent = require("../model/User");
const Task = require("../model/task");

const adminController = {};
const upload = multer({ dest: "uploads/" });
const ALLOWED_FILE_TYPES = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

// Assign a Task to an Agent
adminController.assignTaskToAgent = async (req, res) => {
  const { taskId, agentId } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const agent = await Agent.findById(agentId);
    if (!agent || agent.role !== "agent") {
      return res.status(404).json({ message: "Agent not found" });
    }

    task.assignedTo = agentId;
    await task.save();

    res.status(200).json({ message: "Task assigned successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a New Agent
adminController.createAgent = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "agent",
    });
    await newAgent.save();
    res.status(201).json({ message: "Agent created successfully", agent: newAgent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Agent Details
adminController.updateAgent = async (req, res) => {
  const { agentId } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      return res.status(400).json({ message: "Invalid agent ID" });
    }
    const agent = await Agent.findById(agentId);
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    if (name) agent.name = name;
    if (email) agent.email = email;
    if (phone) agent.phone = phone;
    if (password) agent.password = await bcrypt.hash(password, 10);
    await agent.save();
    res.status(200).json({ message: "Agent updated successfully", agent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Upload and Distribute Tasks from CSV/XLSX
adminController.uploadCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });
    if (!ALLOWED_FILE_TYPES.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type. Only CSV, XLSX, and XLS are allowed." });
    }
    let items = [];
    const filePath = req.file.path;

    if (req.file.mimetype === "text/csv") {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          if (row.FirstName && row.Phone && row.Notes) {
            items.push({
              firstName: row.FirstName,
              phone: row.Phone,
              notes: row.Notes,
            });
          }
        })
        .on("end", async () => await distributeTasks(items, res, filePath));
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      items = worksheet.map((row) => ({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
      }));
      await distributeTasks(items, res, filePath);
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Server error while processing the file." });
  }
};

// Distribute Tasks Among Available Agents (Helper Function)
const distributeTasks = async (items, res, filePath) => {
  try {
    const agents = await Agent.find();
    if (agents.length === 0) return res.status(400).json({ message: "No agents available to distribute tasks." });

    let agentIndex = 0;
    const distributedTasks = items.map((item) => {
      const assignedAgent = agents[agentIndex];
      agentIndex = (agentIndex + 1) % agents.length;
      return new Task({ firstName: item.firstName, phone: item.phone, notes: item.notes, assignedTo: assignedAgent._id });
    });

    await Task.insertMany(distributedTasks);
    fs.unlinkSync(filePath);
    res.status(201).json({ message: "Tasks distributed successfully.", tasks: distributedTasks });
  } catch (error) {
    res.status(500).json({ message: "Server error while distributing tasks." });
  }
};

// Distribute Unassigned Tasks (API Endpoint)
adminController.distributeTasks = async (req, res) => {
  try {
    // Fetch all unassigned tasks
    const tasks = await Task.find({ assignedTo: { $exists: false } });
    // Fetch all agents
    const agents = await Agent.find();

    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents available to distribute tasks." });
    }

    // Distribute tasks in a round-robin fashion
    let agentIndex = 0;
    for (const task of tasks) {
      task.assignedTo = agents[agentIndex]._id;
      await task.save();
      agentIndex = (agentIndex + 1) % agents.length;
    }

    res.status(200).json({ message: "Tasks distributed successfully.", tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error while distributing tasks.", error: error.message });
  }
};

// Get All Tasks
adminController.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email phone");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Agents
adminController.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = adminController;