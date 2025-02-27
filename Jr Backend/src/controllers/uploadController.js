const multer = require('multer');
const Task = require('../models/task');
const taskQueue = require('../queue/taskQueue');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }


    const task = new Task({ status: 'pending' });
    await task.save();

    taskQueue.add({
      taskId: task._id,
      fileBuffer: req.file.buffer.toString('base64') 
    });

    res.status(200).json({
      taskId: task._id,
      message: 'Archivo en proceso'
    });
  } catch (error) {
    console.error("❌ Error en uploadFile:", error);
    res.status(500).json({ message: 'Error al procesar el archivo', error });
  }
};

module.exports = { uploadFile, upload };
