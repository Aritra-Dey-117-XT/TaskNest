import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    checked: Boolean
})

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema)
export default Todo