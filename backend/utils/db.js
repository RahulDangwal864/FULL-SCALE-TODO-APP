const mongoose = require("mongoose");

try {
    mongoose.connect("mongodb+srv://rahuldangwal864:rahul008@cluster0.2treo2j.mongodb.net/todos")
    const todoSchema = mongoose.Schema({
        task: String,
        completed: Boolean
    });

    const db = mongoose.model('todos', todoSchema);

    console.log("MongoDB connected successfully");

    module.exports = {
        db
    }
} catch (error) {
    console.error(error);
}


