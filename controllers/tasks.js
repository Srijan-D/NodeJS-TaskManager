const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const error = require("../middleware/errorHandler");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTasks = asyncWrapper(async (req, res) => {
  // try {
  // const task = await Task.create({ name: "first task", completed: false });
  //instead of hard coding this use this instead
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTasks = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOne({ _id: TaskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with id ${TaskID}was found ` });
    //make sure to use return here else even if task is not found it will go on to the read the next line of code and return
  }
  res.status(200).json({ task });
});
const updateTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    // custom error using the middleware express has its own error handler but in order to get custom errors we use middleware to access it
    const error = new Error("not Found");
    error.status = 404;
    return next(error);
    return res
      .status(404)
      .json({ msg: `no task with such id ${taskID} was found` });
  }
  res.status(200).json({ task });
});
const deleteTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}was found ` });
  }
  res.status(200).json({ task });
});
module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
