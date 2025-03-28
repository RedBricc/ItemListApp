import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import './App.css';

interface Item {
  id: number;
  text: string;
}

interface List {
  id: number;
  name: string;
  items: Item[];
}

function App(): JSX.Element {
  const [lists, setLists] = useState<List[]>(() => {
    const savedLists = localStorage.getItem('lists');
    return savedLists ? JSON.parse(savedLists) : [{ id: Date.now(), name: 'Default List', items: [] }];
  });
  const [selectedListId, setSelectedListId] = useState<number>(() => lists[0]?.id || Date.now());
  const [newItem, setNewItem] = useState<string>('');
  const [newListName, setNewListName] = useState<string>('');
  const [showNewListForm, setShowNewListForm] = useState<boolean>(false);

  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const selectedList = lists.find(list => list.id === selectedListId);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newItem.trim() && selectedList) {
      setLists(lists.map(list => 
        list.id === selectedListId
          ? { ...list, items: [...list.items, { id: Date.now(), text: newItem.trim() }] }
          : list
      ));
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
    setLists(lists.map(list =>
      list.id === selectedListId
        ? { ...list, items: list.items.filter(item => item.id !== id) }
        : list
    ));
  };

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newListName.trim()) {
      const newList: List = {
        id: Date.now(),
        name: newListName.trim(),
        items: []
      };
      setLists([...lists, newList]);
      setSelectedListId(newList.id);
      setNewListName('');
      setShowNewListForm(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Item List Coppier</h1>
        
        <div className="list-selector">
          <select 
            value={selectedListId} 
            onChange={(e) => setSelectedListId(Number(e.target.value))}
            className="list-dropdown"
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
          <button 
            onClick={() => setShowNewListForm(!showNewListForm)}
            className="new-list-button"
          >
            {showNewListForm ? 'Cancel' : 'New List'}
          </button>
        </div>

        {showNewListForm && (
          <form onSubmit={handleCreateList} className="new-list-form">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name..."
              className="input-field"
            />
            <button type="submit" className="add-button">Create List</button>
          </form>
        )}

        <form onSubmit={handleAddItem} className="add-form">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new item..."
            className="input-field"
          />
          <button type="submit" className="add-button">Add Item</button>
        </form>

        <div className="item-list-container">
          <div className="item-list-overlay"></div>
          <ul className="item-list">
            {selectedList?.items.map((item) => (
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
