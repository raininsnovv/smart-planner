// TaskForm.jsx
import React, {useState, useEffect} from 'react';

const TaskForm = ({addTask, editingTask, editTask}) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        deadline: '',
    });

    const maxDays = 365;
    const maxDateTime = new Date();
    maxDateTime.setDate(maxDateTime.getDate() + maxDays);
    const maxDateTimeString = maxDateTime.toISOString().slice(0, 16);

    useEffect(() => {
        if (editingTask) {
            setTask(editingTask);
        } else {
            // Если нет редактируемой задачи, очистим форму
            setTask({title: '', description: '', deadline: ''});
        }
    }, [editingTask]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'deadline') {
            const selectedDateTime = new Date(value);
            const currentDateTime = new Date();

            if (selectedDateTime < currentDateTime) {
                alert('Выберите дедлайн, который находится в будущем.');
            } else {
                setTask({...task, [name]: value});
            }
        } else {
            setTask({...task, [name]: value});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingTask) {
            editTask(editingTask.id, {...editingTask, ...task});
        } else {
            if (task.title.trim() !== '' && task.deadline.trim() !== '' && task.description.trim() !== '') {
                const currentDateTime = new Date();
                const taskDateTime = new Date(task.deadline);

                if (taskDateTime < currentDateTime) {
                    alert('Выберите дедлайн, который находится в будущем.');
                } else {
                    addTask({...task, id: Date.now().toString(), done: false});
                    // Очищаем форму после добавления задачи
                    setTask({title: '', description: '', deadline: ''});
                }
            } else {
                alert('Введите заголовок, дедлайн и описание задачи.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Заголовок:
                <input type="text" name="title" value={task.title} onChange={handleInputChange}/>
            </label>
            <label>
                Описание:
                <textarea name="description" value={task.description} onChange={handleInputChange}/>
            </label>
            <label>
                Дедлайн:
                <input
                    type="datetime-local"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleInputChange}
                    max={maxDateTimeString}
                />
            </label>
            <button type="submit" className="add-task">{editingTask ? 'Изменить задачу' : 'Добавить задачу'}</button>
            
        </form>
    );
};

export default TaskForm;
