import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [showTasks, setShowTasks] = useState(false); // New state to control task visibility

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5141/task');
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [refresh]);

    const addTask = async (task) => {
        try {
            await axios.post('http://localhost:5141/task', task);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (task) => {
        try {
            await axios.put(`http://localhost:5141/task/${task.id}`, task);
            setRefresh(!refresh);
            setCurrentTask(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5141/task/${id}`);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const printToPDF = () => {
        window.print(); // Open the print dialog
    };

    return (
        <div>
            <h2>Task Form</h2>
            <TaskForm
                addTask={addTask}
                updateTask={updateTask}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                setShowTasks={setShowTasks} // Pass down setShowTasks
            />
            <button type="button" onClick={() => setShowTasks(prev => !prev)}>
                {showTasks ? 'Hide Tasks' : 'View Tasks'}
            </button>
            <button type="button" onClick={printToPDF}>
                Print to PDF
            </button>
            {showTasks && ( // Conditional rendering based on showTasks state
                <div>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        <ul>
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    deleteTask={deleteTask}
                                    setCurrentTask={setCurrentTask}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;
