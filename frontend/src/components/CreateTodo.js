import React, { useState } from 'react';

function CreateTodo({ handleModalUpdate }) {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5173/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            });

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            handleModalUpdate();
            setTask('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mx-2 mb-1 sm:m-12 sm:mt-1 sm:mb-2">
            <h2 className="text-lg font-bold sm:mb-4 ">Create Todo</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="block mb-2">Task</label>
                <input name="title" id="Create-todo-title" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" type="text" placeholder="Enter your task here" value={task} onChange={(e) => setTask(e.target.value)} required />
                <button className="bg-green-500 hover:bg-green-800 text-white px-4 py-3 rounded-md w-full" type="submit">Done</button>
            </form>
        </div>
    );
}

export default CreateTodo;
