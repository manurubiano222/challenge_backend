const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'done', 'failed'], 
        default: 'pending' 
    },
    validationErrors: [{  
        row: { type: Number, min: 1 }, 
        col: { type: Number, min: 1 }  
    }],
    parsedData: [{ 
        name: String,
        age: Number,
        nums: [Number]
    }],
    createdAt: { 
        type: Date, 
        default: Date.now,
        validate: {
            validator: function(v) {
                return v instanceof Date && !isNaN(v); 
            },
            message: 'La fecha de creación no es válida'
        }
    }
});

module.exports = mongoose.model('Task', TaskSchema);