import { useEffect, useState } from 'react';
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [modalUpdated, setModalUpdated] = useState(false);

  const handleModalUpdate = () => {
    setModalUpdated(!modalUpdated);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5173/todos/");
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const json = await response.json();
        setTodos(json.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
    const intervalId = setInterval(fetchTodos, 10000);
    return () => clearInterval(intervalId);
  }, [modalUpdated]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 min-h-screen bg-gray-100 shadow-lg shadow-gray-500">
        <header className="flex justify-between items-center bg-green-500 p-4 w-full">
          <h1 className="text-white text-3xl font-bold">Todo App</h1>
        </header>

        <div className="container mx-auto mt-3 sm:mt-8">
          <CreateTodo handleModalUpdate={handleModalUpdate} />
          <Todos todos={todos} handleModalUpdate={handleModalUpdate} />
        </div>
      </div>
    </div>
  );
}

export default App;
