import React, { useState, useEffect } from 'react';
import './App.css';

interface Item {
  id: number;
  text: string;
}

function App(): JSX.Element {
  const [items, setItems] = useState<Item[]>(() => {
    // Initialize state from localStorage
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState<string>('');

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), text: newItem.trim() }]);
      setNewItem('');
    }
  };

  const handleCopyItem = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
      alert('Failed to copy item to clipboard');
    }
  };

  const handleDeleteItem = (id: number): void => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Item List Coppier</h1>
        <form onSubmit={handleAddItem} className="add-form">
          <input
            type="text"
            value={newItem}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)}
            placeholder="Add a new item..."
            className="input-field"
          />
          <button type="submit" className="add-button">Add Item</button>
        </form>
        <div className="item-list-container">
          <div className="item-list-overlay"></div>
          <ul className="item-list">
            {items.map((item) => (
              <li
                key={item.id}
                className="item"
                onClick={() => handleCopyItem(item.text)} 
              >
                <span className="item-text">
                  {item.text}
                </span>
                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
