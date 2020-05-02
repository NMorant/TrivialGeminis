const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: {type: String, required: true},
    solution: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Question", QuestionSchema);