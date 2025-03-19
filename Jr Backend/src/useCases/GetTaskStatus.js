const TaskRepository = require('../repositories/TaskRepository');

class GetTaskStatus {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        return { status: task.status, errors: task.validationErrors.length };
    }
}

module.exports = GetTaskStatus;