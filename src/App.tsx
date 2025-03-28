import React, { useState } from 'react';
import type { JSX } from 'react';
import './App.css';

// Hooks
import useListsManager from './hooks/useListsManager';

// Components
import ListSelector from './components/ListSelector';
import NewListForm from './components/NewListForm';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';

function App(): JSX.Element {
  const {
    lists,
    selectedList,
    selectedListId,
    setSelectedListId,
    addItem,
    deleteItem,
    createList
  } = useListsManager();
  
  const [showNewListForm, setShowNewListForm] = useState<boolean>(false);
  
  const handleCopyItem = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
      alert('Failed to copy item to clipboard');
    }
  };
  
  const handleCreateList = (name: string): void => {
    createList(name);
    setShowNewListForm(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Item List Coppier</h1>
        
        <ListSelector 
          lists={lists}
          selectedListId={selectedListId}
          onSelectList={setSelectedListId}
          onToggleNewListForm={() => setShowNewListForm(!showNewListForm)}
          showNewListForm={showNewListForm}
        />

        {showNewListForm && (
          <NewListForm onSubmit={handleCreateList} />
        )}

        <AddItemForm onAddItem={addItem} />

        {selectedList && (
          <ItemList 
            items={selectedList.items}
            onCopyItem={handleCopyItem}
            onDeleteItem={deleteItem}
          />
        )}
      </div>
    </div>
  );
}

export default App; 