const taskRepository = require('../repositories/TaskRepository');
const taskQueue = require('../frameworks/taskQueue');

class UploadFile {
    constructor(taskRepository, taskQueue) {
        this.taskRepository = taskRepository;
        this.taskQueue = taskQueue;
    }

    async execute(fileBuffer) {
        const task = await this.taskRepository.create({ status: 'pending' });
        try {
            await this.taskQueue.add({ 
                taskId: task._id, 
                fileBuffer: fileBuffer.toString('base64') 
            });
        } catch (error) {
            console.error("❌ Error al agregar a la cola:", error);
        }
    
        return { taskId: task._id, message: 'Archivo en proceso' };
    }
    
}

module.exports = UploadFile;