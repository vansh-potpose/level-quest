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
    <div className="flex flex-col md:flex-row  w-fit"
        style={{
            background: "var(--muted-background-color)",
            border: "1px solid var(--border-color)",
            color: "var(--foreground)",
            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)",
            borderRadius: "1rem",
            padding: "1.5rem"
        }}
    >
        {/* Calendar */}
        <div
            className="h-fit p-6 rounded-2xl max-w-sm shadow-lg"
            style={{
                background: "var(--element-background-color)",
                border: "1px solid var(--border-color)",
                color: "var(--foreground)"
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevMonth}
                    className="hover:text-[var(--active-element)] transition-transform transform hover:scale-125 duration-200 p-2 rounded-full hover:bg-[var(--muted-bg-color)]"
                    aria-label="Previous Month"
                    style={{ color: "var(--foreground)" }}
                >
                    &lt;
                </button>
                <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-lg"
                    style={{ color: "var(--foreground)" }}
                >
                    {currentDate.format('MMMM YYYY')}
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="hover:text-[var(--active-element)] transition-transform transform hover:scale-125 duration-200 p-2 rounded-full hover:bg-[var(--muted-bg-color)]"
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
                        bg = "linear-gradient(135deg, var(--active-element), #0d9488)";
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
                            className="h-10 w-10 flex items-center justify-center rounded-xl relative shadow-inner cursor-pointer transition duration-200 ease-in-out"
                            style={{
                                background: dayObj.date ? bg : "transparent",
                                border: dayObj.date ? border : "none",
                                color: dayObj.date ? color : "inherit",
                                fontWeight: (isToday || isSelected) ? "bold" : "normal"
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

        {/* Divider for large screens */}
        <div className="hidden md:block w-px mx-4 rounded-full"
            style={{
                background: "linear-gradient(to bottom, var(--border-color), var(--muted-background-color), var(--background))"
            }}
        ></div>

        {/* Task List */}
        <div className="TaskList p-6 xs:w-96 rounded-2xl shadow-lg flex-1"
            style={{
                background: "var(--muted-background-color)",
                border: "1px solid var(--border-color)",
                color: "var(--foreground)"
            }}
        >
            <div className="TaskList__header text-xl font-extrabold mb-6 tracking-wide flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="#3cb371" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
                </svg>
                Tasks for <span className="ml-1" style={{ color: "var(--active-element)" }}>{selectedDate || 'No date selected'}</span>
            </div>
            <div>
                {(tasks[selectedDate] || []).map((task, index) => (
                    <div
                        key={`${selectedDate}-${index}`}
                        className="TaskList__task flex items-center gap-3 mb-3 px-3 py-2 rounded-xl transition shadow-sm"
                        style={{
                            background: task.isCompleted
                                ? "linear-gradient(to right, var(--element-background-color), var(--muted-bg-color))"
                                : "linear-gradient(to right, var(--element-background-color), var(--overlay-bg-color))",
                            opacity: task.isCompleted ? 0.7 : 1
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => toggleTaskCompletion(index)}
                            className="form-checkbox h-5 w-5 transition"
                            style={{
                                accentColor: "#3cb371"
                            }}
                        />
                        <span
                            className="flex-1 text-base"
                            style={{
                                textDecoration: task.isCompleted ? "line-through" : "none",
                                color: task.isCompleted ? "var(--muted-color)" : "inherit"
                            }}
                        >
                            {task.name}
                        </span>
                        <button
                            onClick={() => deleteTask(index)}
                            className="text-xs hover:underline"
                            title="Delete Task"
                            style={{ color: "#ef4444" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#ef4444"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        </button>
                    </div>
                ))}
                {!(tasks[selectedDate] || []).length && (
                    <div className="text-sm" style={{ color: "var(--muted-color)" }}>No tasks for today</div>
                )}
                <button
                    onClick={addTask}
                    className="py-2 px-4 mt-4 rounded-xl w-full"
                    style={{
                        background: "var(--element-background-color)",
                        color: "var(--foreground)"
                    }}
                >
                    Add Task
                </button>
            </div>
        </div>
    </div>
);
}
export default Calendar;