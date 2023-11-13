// App.jsx
import React, {useState, useEffect} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const markTaskAsDone = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? {...task, done: !task.done} : task
        );
        setTasks(updatedTasks);
    };


    const editTask = (taskId, updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? updatedTask : task
        );
        setTasks(updatedTasks);
        setEditingTask(null);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const startEditingTask = (task) => {
        setEditingTask(task);
    };

    return (
        <div>
            <h1>Планировщик задач</h1>
            <TaskForm addTask={addTask} editingTask={editingTask} editTask={editTask}/>
            <TaskList
                tasks={tasks}
                markTaskAsDone={markTaskAsDone}
                editTask={startEditingTask}
                deleteTask={deleteTask}
            />
        </div>
    );
};

export default App;
