const Queue = require('bull');
const Task = require('../models/task');
const { parseExcel } = require('../services/excelParser');

const taskQueue = new Queue('taskQueue', { redis: { host: '127.0.0.1', port: 6379 } });

taskQueue.process(async (job, done) => {
    const { taskId, fileBuffer } = job.data;
    const task = await Task.findById(taskId);
    if (!task) return done(new Error('Tarea no encontrada'));

    try {
        task.status = 'processing';
        await task.save();

        const buffer = Buffer.from(fileBuffer, 'base64');

        const { parsedData, validationErrors } = parseExcel(buffer);

        task.parsedData = parsedData;
        task.validationErrors = validationErrors;
        task.status = 'done';
        await task.save();

        done();
    } catch (error) {
        task.status = 'failed';
        await task.save();
        console.error("❌ Error en taskQueue:", error);
        done(error);
    }
});

module.exports = taskQueue;
