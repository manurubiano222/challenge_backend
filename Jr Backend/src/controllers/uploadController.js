const UploadFile = require('../useCases/UploadFile');
const TaskRepository = require('../repositories/TaskRepository');
const taskQueue = require('../frameworks/taskQueue');

const taskRepository = new TaskRepository();
const uploadFileUseCase = new UploadFile(taskRepository, taskQueue);



const uploadFile = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo o el archivo está vacío' });
        }
        const result = await uploadFileUseCase.execute(req.file.buffer);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en uploadFile:", error);
        res.status(500).json({ message: 'Error al procesar el archivo', error: error.message });
    }
};

module.exports = { uploadFile };