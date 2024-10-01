import React from 'react';

const TaskItem = ({ task, deleteTask, setCurrentTask }) => {
    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : 'No due date';
    };

    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {formatDate(task.duedate)}</p>
            <button onClick={() => setCurrentTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;
