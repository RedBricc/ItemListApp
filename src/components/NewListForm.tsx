import React, { useState } from 'react';

interface NewListFormProps {
  onSubmit: (name: string) => void;
}

const NewListForm: React.FC<NewListFormProps> = ({ onSubmit }) => {
  const [newListName, setNewListName] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newListName.trim()) {
      onSubmit(newListName);
      setNewListName('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="new-list-form">
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        placeholder="Enter list name..."
        className="input-field"
      />
      <button type="submit" className="add-button">Create List</button>
    </form>
  );
};

export default NewListForm; 