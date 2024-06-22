import React from 'react';

export function Todo({ todos, onTodoCompleted }) {
    const prioritizeTodos = (todo) => {
        return {
            ...todo,
            priority: todo.priority || 1, 
        };
    };

    const sortedTodos = todos.map(prioritizeTodos).sort((a, b) => b.priority - a.priority);
    const deleteTodo = async(id) => {
        try {
            const response = await fetch('http://localhost:3000/delete',{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    id: id,
                }),
            });
            if(response.ok){
                alert("Todo Cleared")

            }   else {
                alert("Failed to mark Todo as completed");
            }
        } catch (error) {
            alert("An error occurred");
        }
    };

    const markCompleted = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/completed/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });

            if (response.ok) {
                alert("Todo marked as completed");
                // Optionally update state or refresh todos
            } else {
                alert("Failed to mark Todo as completed");
            }
        } catch (error) {
            alert("An error occurred");
        }
    };

    // Styles object for inline styles
    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: '1fr', /* Single column initially */
            gridGap: '20px',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            padding: '30px',
            borderRadius: '10px',
            width: '100%', /* Initial width for responsiveness */
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif',
        },
        // Media queries for responsiveness
        '@media (min-width: 768px)': {
            container: {
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', /* Two columns on larger screens */
            }
        },
        todoItem: {
            backgroundColor: '#2a2a2a',
            borderRadius: '10px',
            padding: '40px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s',
        },
        titleBox: {
            backgroundColor: '#092880',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            width: '100%', // Ensure the title box stretches to full width
        },
        title: {
            fontSize: '30px',
            margin: '0',
            color: '#5bc0de',
        },
        description: {
            fontSize: '18px',
            margin: '0 0 10px 0',
            color: 'white',
        },
        priority: {
            fontSize: '16px',
            margin: '0 0 10px 0',
            color: '#f0ad4e',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        completeButton: {
            backgroundColor: '#5cb85c',
            color: '#fff',
        },
        completedButton: {
            backgroundColor: '#0275d8',
            color: '#fff',
        },
    };

    return (
        <div style={styles.container}>
            {sortedTodos.map((todo, index) => (
                <div key={index} style={styles.todoItem}>
                    <div style={styles.titleBox}>
                        <h1 style={styles.title}>{todo.title}</h1>
                    </div>
                    <h2 style={styles.description}>{todo.description}</h2>
                    <div style={styles.priority}>Priority: {todo.priority}</div>
                    <button
                        onClick={() => markCompleted(todo._id)} // Pass todo._id to markCompleted function
                        style={{ ...styles.button, ...(todo.completed ? styles.completedButton : styles.completeButton) }}
                    >
                        {todo.completed ? "Completed" : "Complete"}
                    </button>
                    <button
                        onClick={() => deleteTodo(todo._id)} // Pass todo._id to markCompleted function
                        style={{ ...styles.button, ...(todo.completed ? styles.completedButton : styles.completeButton) }}
                    >
                        Clear
                    </button>
                </div>
            ))}
        </div>
    );
}
