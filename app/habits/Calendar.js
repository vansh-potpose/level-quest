'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import EditableText from './EditableText';

const Calendar = ({ tasks, setTasks }) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    // Use ISO date (YYYY-MM-DD) for selectedDate and today
    const [selectedDate, setSelectedDate] = useState(dayjs().toISOString().split('T')[0]);
    const today = dayjs().toISOString().split('T')[0];

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    // Generate days for the calendar grid, using ISO date (YYYY-MM-DD)
    const days = [...Array(42)].map((_, index) => {
        const day = index - startDay + 1;
        const date =
            day > 0 && day <= daysInMonth
                ? currentDate.date(day).toISOString().split('T')[0]
                : null;
        return { day, date };
    });

    const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    // Filter tasks for the selected date (compare only YYYY-MM-DD)
    const tasksForDate = tasks.filter(task => {
        if (!task.date) return false;
        const taskDate = dayjs(task.date).toISOString().split('T')[0];
        return taskDate === selectedDate;
    });

    const toggleTaskCompletion = (taskId) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const updateTaskName = (taskId, newName) => {
        if (!newName.trim()) return;
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, name: newName } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    const addTask = () => {
        const newTask = {
            id: `task-${Date.now()}`,
            name: 'New Task',
            isCompleted: false,
            date: selectedDate // already in ISO YYYY-MM-DD
        };
        setTasks(prev => [...prev, newTask]);
    };

    const areAllTasksCompleted = (daysTasks) => {
        return daysTasks.length > 0 && daysTasks.every((task) => task.isCompleted);
    };

    // Helper: get tasks for a given date (compare only YYYY-MM-DD)
    const getTasksForDate = (date) => {
        if (!date) return [];
        return tasks.filter(task => {
            if (!task.date) return false;
            const taskDate = dayjs(task.date).toISOString().split('T')[0];
            return taskDate === date;
        });
    };

    return (
        <div className="flex flex-col 2xl:flex-row md:flex-row lg:flex-col w-fit gap-4">
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
                        const dayTasks = getTasksForDate(dayObj.date);

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

                        // Format day label as dd (number only)
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
            <div className="TaskList p-8 xs:w-[28rem] w-[22rem]  rounded-2xl shadow-lg flex-1"
                style={{
                    background: "var(--muted-background-color)",
                    color: "var(--foreground)"
                }}
            >
                <div className="TaskList__header text-xl font-bold mb-8 tracking-wide flex items-center gap-2">
                    <svg width="22" height="22" fill="none" stroke="var(--active-element)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {/* Format selectedDate as dd/mm/yyyy for UI */}
                    Tasks for <span className="ml-1 text-md font-medium" style={{ color: "var(--active-element)" }}>{selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY') : 'No date selected'}</span>
                </div>
                <div>
                    {tasksForDate.length === 0 && (
                        <div className="text-base text-center py-8" style={{ color: "var(--muted-color)" }}>
                            No tasks for this day.
                        </div>
                    )}
                    <ul className="space-y-3">
                        {tasksForDate.map((task) => (
                            <li
                                key={task.id}
                                className={`TaskList__task flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm group transition
                                    ${task.isCompleted
                                        ? "bg-gradient-to-r from-green-900/60 to-green-800/40 opacity-70"
                                        : "bg-gradient-to-r from-[var(--element-background-color)] to-[var(--overlay-bg-color)]"
                                    }
                                `}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!task.isCompleted}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                    className="form-checkbox h-5 w-5 accent-[#3cb371] transition"
                                    aria-label={`Mark ${task.name} as completed`}
                                />
                                <span
                                    className="flex-1 text-md truncate"
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
                                        onSave={(newName) => updateTaskName(task.id, newName)}
                                        className="bg-transparent border-none outline-none w-full"
                                        textClassName="w-full"
                                    />
                                </span>
                                <button
                                    onClick={() => deleteTask(task.id)}
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
};

export default Calendar;
