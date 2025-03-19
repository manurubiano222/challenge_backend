const GetTaskStatus = require('../useCases/GetTaskStatus');
const GetTaskData = require('../useCases/GetTaskData');
const GetTaskErrors = require('../useCases/GetTaskErrors');
const TaskRepository = require('../repositories/TaskRepository');

const taskRepository = new TaskRepository();

const getTaskStatus = async (req, res) => {
    const getTaskStatus = new GetTaskStatus(taskRepository);
    try {
        const result = await getTaskStatus.execute(req.params.taskId);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getTaskData = async (req, res) => {
    const getTaskData = new GetTaskData(taskRepository);
    try {
        const result = await getTaskData.execute(req.params.taskId);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getTaskErrors = async (req, res) => {
    const getTaskErrors = new GetTaskErrors(taskRepository);
    try {
        const result = await getTaskErrors.execute(req.params.taskId, req.query.page, req.query.limit);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { getTaskStatus, getTaskData, getTaskErrors };