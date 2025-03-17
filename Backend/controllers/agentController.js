const User = require("../model/User"); 
const Task = require("../model/task"); 

const agentController = {};

agentController.getAssignedTasks = async (req, res) => {
  const agentId = req.params.agentId; 

  try {
    const tasks = await Task.find({ assignedTo: agentId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

agentController.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = agentController;