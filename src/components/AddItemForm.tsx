import React, { useState } from 'react';

interface AddItemFormProps {
  onAddItem: (text: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAddItem(newItem);
      setNewItem('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item..."
        className="input-field"
      />
      <button type="submit" className="add-button">Add Item</button>
    </form>
  );
};

export default AddItemForm; 