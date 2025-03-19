const Task = require('../entities/Task');

class TaskRepository {
    async findById(taskId) {
        return await Task.findById(taskId);
    }

    async create(taskData) {
        const task = new Task(taskData);
        return await task.save();
    }

    async update(taskId, updateData) {
        return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    }
}

module.exports = TaskRepository;