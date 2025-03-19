const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../frameworks/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, upload.single('file'), uploadController.uploadFile);
router.get('/task/:taskId', authMiddleware, taskController.getTaskStatus);
router.get('/task/:taskId/data', authMiddleware, taskController.getTaskData);
router.get('/task/:taskId/errors', authMiddleware, taskController.getTaskErrors);

module.exports = router;
