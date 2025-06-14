'use client';
import React, { useState,useEffect } from 'react';

const EditableText = ({ value, onChange, className = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onChange(inputValue);
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
      className={`cursor-pointer ${className}`}
    >
      {inputValue || 'Click to edit'}
    </span>
  );
};

export default EditableText;
