const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post('/upload', uploadMiddleware.single('file'), uploadController.uploadFile);
router.get('/task/:taskId', taskController.getTaskStatus);
router.get('/task/:taskId/data', taskController.getTaskData);
router.get('/task/:taskId/errors', taskController.getTaskErrors);

module.exports = router;