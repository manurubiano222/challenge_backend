const Queue = require('bull');
const TaskRepository = require('../repositories/TaskRepository');
const { parseExcel } = require('./excelParser');

const taskQueue = new Queue('taskQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    }
});

taskQueue.process(async (job, done) => {
    const { taskId, fileBuffer } = job.data;
    const taskRepository = new TaskRepository();
    const task = await taskRepository.findById(taskId);

    if (!task) return done(new Error('Tarea no encontrada'));

    try {
        await taskRepository.update(taskId, { status: 'processing' });

        const buffer = Buffer.from(fileBuffer, 'base64');
        const { parsedData, validationErrors } = parseExcel(buffer);    

        await taskRepository.update(taskId, { parsedData, validationErrors, status: 'done' });
        done();
    } catch (error) {
        await taskRepository.update(taskId, { status: 'failed' });
        console.error("Error en taskQueue:", error);
        done(error);
    }
});

module.exports = taskQueue;
