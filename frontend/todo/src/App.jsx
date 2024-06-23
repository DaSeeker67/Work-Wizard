import React, { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todo } from './components/Todos'; // Ensure the path is correct

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://work-wizard-api.vercel.app/todos");
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const json = await response.json();
        setTodos(json.todos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); 

  const handleTodoCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const handleNewTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Work Wizard 📝</h1>
      <CreateTodo onNewTodo={handleNewTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Todo todos={todos} onTodoCompleted={handleTodoCompleted} />
      )}
    </div>
  );
}

export default App;
