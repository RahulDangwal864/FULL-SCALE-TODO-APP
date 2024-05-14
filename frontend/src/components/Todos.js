import React from 'react';


function Todos({ todos, handleModalUpdate }) {
    async function markComplete(todo) {
        try {
            const response = await fetch("http://localhost:5173/completed", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: todo._id })
            });

            if (!response.ok) {
                throw new Error("Failed to mark todo as completed");
            }

            handleModalUpdate();
        } catch (error) {
            console.error("Error marking todo as completed:", error);
        }
    }

    async function deleteTodo(todo) {
        try {
            const response = await fetch("http://localhost:5173/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: todo._id })
            });

            if (!response.ok) {
                throw new Error("Failed to mark todo as completed");
            }

            handleModalUpdate();
        } catch (error) {
            console.error("Error marking todo as completed:", error);
        }
    }

    return (
        <div className="grid grid-cols-1 sm:gap-0 mt-4 sm:mt-8">
            {todos
                .slice()
                .reverse()
                .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
                .map((todo, index) => (
                    <div key={index} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mx-2 mb-1 sm:m-12 sm:mt-1 sm:mb-0 relative cursor-pointer" onClick={() => markComplete(todo)}>
                        <input type="checkbox" checked={todo.completed} onChange={() => markComplete(todo)} className="h-4 w-4 cursor-pointer rounded-md" />
                        <div className="flex-1 ml-4 overflow-auto">
                            <p className={`text-lg font-bold ${todo.completed ? 'line-through text-gray-500' : 'text-black'}`}>{todo.task}</p>
                        </div>
                        <svg onClick={() => deleteTodo(todo)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                ))}
        </div>

    );
}

export default Todos;
