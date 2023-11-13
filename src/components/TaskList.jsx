// TaskList.jsx
import React, {useState} from 'react';

const TaskList = ({tasks, markTaskAsDone, editTask, deleteTask}) => {
    const [sortType, setSortType] = useState('creationDate');
    const [selectedTask, setSelectedTask] = useState(null);

    const handleSortChange = (type) => {
        setSortType(type);
    };

    const openTaskDetails = (task) => {
        setSelectedTask(task);
    };

    const closeTaskDetails = (e) => {
        setSelectedTask(null);
    };


    const sortedTasks = tasks.slice().sort((a, b) => {
        if (sortType === 'creationDate') {
            return new Date(b.creationDate) - new Date(a.creationDate);
        } else {
            return new Date(a.deadline) - new Date(b.deadline);
        }
    });

    return (
        <div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="creationDate"
                        checked={sortType === 'creationDate'}
                        onChange={() => handleSortChange('creationDate')}
                    />
                    По дате создания
                </label>
                <label>
                    <input
                        type="radio"
                        value="deadline"
                        checked={sortType === 'deadline'}
                        onChange={() => handleSortChange('deadline')}
                    />
                    По сроку выполнения
                </label>
            </div>

            <ul>
                {sortedTasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => markTaskAsDone(task.id)}
                        />

                        <span
                            style={{
                                textDecoration: task.done ? 'line-through' : 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => openTaskDetails(task)}
                        >
              {(task.title).length > 8 ? (task.title).slice(0, 8) + '...' : task.title}
            </span>
                        <span>
              {new Date(task.deadline).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
              })}
            </span>
                        <span>{(task.description).length > 8 ? (task.description).slice(0, 8) + '...' : task.description}</span>
                        <button onClick={() => editTask(task)}>Изменить</button>
                        <button onClick={() => deleteTask(task.id)}>Удалить</button>
                    </li>
                ))}
            </ul>

            {selectedTask && (
                <div className="task-details-modal" onClick={closeTaskDetails}>
                    <div className="task-details-content">
                        <h2>{selectedTask.title}</h2>
                        <p>
                            {new Date(selectedTask.deadline).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </p>
                        <p>{selectedTask.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;