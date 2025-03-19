const TaskRepository = require('../repositories/TaskRepository');

class GetTaskErrors {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskId, page = 1, limit = 10) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }

        const startIndex = (page - 1) * limit;
        const paginatedErrors = task.validationErrors.slice(startIndex, startIndex + parseInt(limit));

        const errorsWithoutId = paginatedErrors.map(error => {
            const { _id, ...rest } = error.toObject();
            return rest;
        });

        return { errors: errorsWithoutId, totalErrors: task.validationErrors.length };
    }
}

module.exports = GetTaskErrors;