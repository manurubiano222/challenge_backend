const TaskRepository = require('../repositories/TaskRepository');

class GetTaskData {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        return { data: task.parsedData };
    }
}

module.exports = GetTaskData;