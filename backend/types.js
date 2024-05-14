const z = require("zod")

const createTodo = z.object({
    task: z.string()
})

module.exports = {
    createTodo: createTodo,
}