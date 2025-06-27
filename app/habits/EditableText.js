'use client';
import React, { useState, useEffect } from 'react';

const EditableText = ({
    text,
    onSave,
    className = '',
    textClassName = ''
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);

    useEffect(() => {
        setInputValue(text);
    }, [text]);

    const handleBlur = () => {
        setIsEditing(false);
        if (inputValue !== text) {
            onSave(inputValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            if (inputValue !== text) {
                onSave(inputValue);
            }
        }
    };

    return isEditing ? (
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`border rounded px-2 py-1 ${className}`}
            autoFocus
        />
    ) : (
        <span
            onClick={() => setIsEditing(true)}
            className={`cursor-pointer ${className} ${textClassName}`}
            title={text}
        >
            {text || 'Click to edit'}
        </span>
    );
};

export default EditableText;
