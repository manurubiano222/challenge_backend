const Task = require('../models/task');

const getTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ status: task.status, errors: task.validationErrors.length });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getTaskData = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json({ data: task.parsedData });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getTaskErrors = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        const startIndex = (page - 1) * limit;
        const paginatedErrors = task.validationErrors.slice(startIndex, startIndex + parseInt(limit));

        const errorsWithoutId = paginatedErrors.map(error => {
            const { _id, ...rest } = error.toObject(); 
            return rest;
        });

        res.json({ errors: errorsWithoutId, totalErrors: task.validationErrors.length });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getTaskStatus, getTaskErrors, getTaskData };
