const express = require('express')
const cors = require('cors')
const { createTodo } = require('./types')
const { db } = require('./utils/db')
const app = express()
const port = 5173

app.use(express.json())
app.use(cors({}))

app.post("/add", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You send the wrong inputs",
        })
        return;
    }

    await db.create({
        task: createPayload.task,
        completed: false
    })

    res.json({
        msg: "Todo Created"
    })
})

app.get("/todos", async (req, res) => {
    const todos = await db.find({})
    res.json({
        todos
    })
})

app.put("/completed", async (req, res) => {
    const todoId = req.body.id;
    try {
        // Find the todo by its ID and update its completed status
        const updatedTodo = await db.findOneAndUpdate({ _id: todoId }, { completed: true }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        return res.json({ msg: "Todo marked as completed", todo: updatedTodo });
    } catch (error) {
        console.error("Error marking todo as completed:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.delete("/delete", async (req, res) => {
    const todoId = req.body.id;
    try {
        const deleteTodo = await db.findOneAndDelete({ _id: todoId });
        if (!deleteTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json({ msg: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error while deleting todo:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})