'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import EditableText from './EditableText';

const Calendar = ({ tasks, setTasks }) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs().format('D-M-YY'));
    const today = dayjs().format('D-M-YY');

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    const days = [...Array(42)].map((_, index) => {
        const day = index - startDay + 1;
        const date =
            day > 0 && day <= daysInMonth
                ? currentDate.date(day).format('D-M-YY')
                : null;
        return { day, date };
    });

    const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    // ...task handlers (same as before, omitted for brevity)

    const toggleTaskCompletion = (taskIndex) => {
        setTasks((prev) => {
            const updatedTasks = [...(prev[selectedDate] || [])];
            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                isCompleted: !updatedTasks[taskIndex].isCompleted,
            };
            // Save updated tasks
            service
                .updateTasks({ ...prev, [selectedDate]: updatedTasks })
                .catch((error) => {
                    console.error('Error saving tasks:', error);
                });
            return { ...prev, [selectedDate]: updatedTasks };
        });
    };

    const updateTaskName = (taskIndex, newName) => {
        if (!newName.trim()) return;
        setTasks((prev) => {
            const updatedTasks = [...(prev[selectedDate] || [])];
            updatedTasks[taskIndex].name = newName;
            service
                .updateTasks({ ...prev, [selectedDate]: updatedTasks })
                .catch((error) => {
                    console.error('Error saving tasks:', error);
                });
            return { ...prev, [selectedDate]: updatedTasks };
        });
    };

    const deleteTask = (taskIndex) => {
        setTasks((prev) => {
            const updatedTasks = [...(prev[selectedDate] || [])];
            updatedTasks.splice(taskIndex, 1);
            service
                .updateTasks({ ...prev, [selectedDate]: updatedTasks })
                .catch((error) => {
                    console.error('Error saving tasks:', error);
                });
            return { ...prev, [selectedDate]: updatedTasks };
        });
    };

    const addTask = () => {
        setTasks((prev) => {
            const updatedTasks = [
                ...(prev[selectedDate] || []),
                { isCompleted: false, name: 'New Task' },
            ];
            service
                .updateTasks({ ...prev, [selectedDate]: updatedTasks })
                .catch((error) => {
                    console.error('Error saving tasks:', error);
                });
            return { ...prev, [selectedDate]: updatedTasks };
        });
    };

    const areAllTasksCompleted = (daysTasks) => {
        return daysTasks.every((task) => task.isCompleted);
    };

    
return (            
    <div className="flex flex-col md:flex-row w-fit gap-4">
        {/* Calendar */}
        <div
            className="h-fit p-6 rounded-xl max-w-sm shadow-lg border border-[#3d444d]"
            style={{
                background: "black", 
                color: "var(--foreground)"
            }}
        >
            <div className="flex items-center justify-between mb-5">
                <button
                    onClick={handlePrevMonth}
                    className="hover:text-[var(--active-element)] transition-transform transform hover:scale-110 duration-200 p-2 rounded-full hover:bg-[var(--muted-bg-color)]"
                    aria-label="Previous Month"
                    style={{ color: "var(--foreground)" }}
                >
                    &lt;
                </button>
                <h2 className="text-xl font-extrabold tracking-wide drop-shadow-lg"
                    style={{ color: "var(--foreground)" }}
                >
                    {currentDate.format('MMMM YYYY')}
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="hover:text-[var(--active-element)] transition-transform transform hover:scale-110 duration-200 p-2 rounded-full hover:bg-[var(--muted-bg-color)]"
                    aria-label="Next Month"
                    style={{ color: "var(--foreground)" }}
                >
                    &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                        key={day}
                        className="text-xs font-bold text-center uppercase tracking-wide"
                        style={{ color: "var(--muted-color)" }}
                    >
                        {day}
                    </div>
                ))}
                {days.map((dayObj, index) => {
                    const isToday = dayObj.date === today;
                    const isSelected = dayObj.date === selectedDate;
                    const dayTasks = tasks[dayObj.date] || [];
                 
                    let bg = "var(--element-background-color)";
                    let border = "1px solid var(--border-color)";
                    let color = "var(--foreground)";
                    if (isToday) {
                        bg = "var(--overlay-background-color)";
                        border = "2px solid var(--active-element)";
                        color = "#fff";
                    }
                    if (isSelected) {
                        bg = "var(--active-element)";
                        border = "2px solid var(--active-element)";
                        color = "#fff";
                    }
                    if (dayTasks.length > 0) {
                        border = areAllTasksCompleted(dayTasks)
                            ? "2px solid #3cb371"
                            : "2px solid #ffcc00";
                    }

                    return (
                        <div
                            key={index}
                            onClick={() => {
                                if (!dayObj.date) return;
                                setSelectedDate(dayObj.date);
                            }}
                            className="h-9 w-9 flex items-center justify-center rounded-lg relative shadow-inner cursor-pointer transition duration-200 ease-in-out"
                            style={{
                                background: dayObj.date ? bg : "transparent",
                                border: dayObj.date ? border : "none",
                                color: dayObj.date ? color : "inherit",
                                fontWeight: (isToday || isSelected) ? "bold" : "normal",
                                fontSize: "14px"
                            }}
                            title={
                                dayTasks.length > 0
                                    ? dayTasks.map((task) => task.name).join('\n')
                                    : ''
                            }
                        >
                            {dayObj.day > 0 && dayObj.day <= daysInMonth ? dayObj.day : ''}
                            {dayTasks.length > 0 && (
                                <div
                                    className="absolute top-1 right-1 h-2 w-2 rounded-full shadow-md"
                                    style={{
                                        background: areAllTasksCompleted(dayTasks)
                                            ? "#3cb371"
                                            : "#ffcc00"
                                    }}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Task List */}
        <div className="TaskList p-8 xs:w-[28rem] w-[20rem]  rounded-2xl shadow-lg flex-1"
            style={{
                background: "var(--muted-background-color)",
           
                color: "var(--foreground)"
            }}
        >
            <div className="TaskList__header text-lg font-semibold mb-8 tracking-wide flex items-center gap-2">
               
                Tasks for <span className="ml-1" style={{ color: "var(--active-element)" }}>{selectedDate || 'No date selected'}</span>
            </div>
            <div>
                {(tasks[selectedDate] || []).length === 0 && (
                    <div className="text-base text-center py-8" style={{ color: "var(--muted-color)" }}>
                        No tasks for this day.
                    </div>
                )}
                <ul className="space-y-3">
                    {(tasks[selectedDate] || []).map((task, index) => (
                        <li
                            key={`${selectedDate}-${index}`}
                            className={`TaskList__task flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm group transition
                                ${task.isCompleted
                                    ? "bg-gradient-to-r from-green-900/60 to-green-800/40 opacity-70"
                                    : "bg-gradient-to-r from-[var(--element-background-color)] to-[var(--overlay-bg-color)]"
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleTaskCompletion(index)}
                                className="form-checkbox h-5 w-5 accent-[#3cb371] transition"
                                aria-label={`Mark ${task.name} as completed`}
                            />
                            <span
                                className="flex-1 text-lg truncate"
                                style={{
                                    textDecoration: task.isCompleted ? "line-through" : "none",
                                    color: task.isCompleted ? "var(--muted-color)" : "inherit",
                                    fontWeight: task.isCompleted ? 400 : 500,
                                    letterSpacing: "0.01em"
                                }}
                                title={task.name}
                            >
                                <EditableText
                                    text={task.name}
                                    onSave={(newName) => updateTaskName(index, newName)}
                                    className="bg-transparent border-none outline-none w-full"
                                    textClassName="w-full"
                                />
                            </span>
                            <button
                                onClick={() => deleteTask(index)}
                                className="opacity-60 group-hover:opacity-100 transition p-1 rounded hover:bg-red-100/10"
                                title="Delete Task"
                                aria-label="Delete Task"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="22px"
                                    viewBox="0 0 24 24"
                                    width="22px"
                                    fill="#ef4444"
                                >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={addTask}
                    className="py-3 px-5 mt-8 rounded-xl w-full font-semibold text-base shadow-md hover:bg-[var(--active-element)] hover:text-white transition"
                    style={{
                        background: "var(--element-background-color)",
                        color: "var(--foreground)"
                    }}
                >
                    + Add Task
                </button>
            </div>
        </div>
    </div>
);
}
export default Calendar;