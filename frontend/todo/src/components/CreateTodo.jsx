import React, { useState } from 'react';

export function CreateTodo({ setTodos }) {
    const [priority, setPriority] = useState(1);
    const [loading, setLoading] = useState(false);

    const addTodo = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: document.getElementById("title").value,
                    description: document.getElementById("description").value,
                    priority: priority,
                }),
            });
            console.log(response);

            if (response.ok) {
                const newTodo = await response.json();
                setTodos((prevTodos) => [...prevTodos, newTodo]);
                alert("Todo added ✅");
            } else {
                alert("Failed to add Todo ❌");
            }
        }  finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <input
                    id="title"
                    style={styles.input}
                    type="text"
                    placeholder="Title"
                />
                <input
                    id="description"
                    style={{ ...styles.input, marginBottom: '15px' }}
                    type="text"
                    placeholder="Description"
                />
                <label style={styles.label}>
                    Priority:
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        style={styles.range}
                    />
                </label>
                <div style={styles.priorityContainer}>
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.dot,
                                backgroundColor: index < priority ? '#092880' : '#333',
                            }}
                        />
                    ))}
                </div>
                <button
                    style={styles.button}
                    onClick={addTodo}
                    disabled={loading}
                >
                    {loading ? 'Adding... ⏳' : 'Add a Todo ➕'}
                </button>
            </div>
        </div>
    );
}


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '50px',
        boxSizing: 'border-box',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#2a2a2a',
        borderRadius: '10px',
        padding: '30px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        boxSizing: 'border-box',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#333',
        color: '#fff',
        fontSize: '16px',
        marginBottom: '10px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    label: {
        width: '100%',
        margin: '10px 0',
        color: '#fff',
        fontSize: '16px',
    },
    range: {
        width: '100%',
        marginTop: '5px',
    },
    priorityContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '10px',
    },
    dot: {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        margin: '0 2px',
        transition: 'background-color 0.3s ease',
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#092880',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#1a3ea0',
    },
    '@media (max-width: 600px)': {
        form: {
            padding: '15px',
        },
        input: {
            fontSize: '14px',
            padding: '8px',
        },
        button: {
            fontSize: '14px',
            padding: '8px',
        },
        dot: {
            width: '14px',
            height: '14px',
        },
    },
};

export default CreateTodo;
