import { useState, useEffect } from 'react';
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
    createList,
    deleteList
  } = useListsManager();
  
  const [showNewListForm, setShowNewListForm] = useState<boolean>(false);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);
  
  // Handle URL changes (e.g., when user uses browser navigation buttons)
  useEffect(() => {
    const handleUrlChange = (): void => {
      const params = new URLSearchParams(window.location.search);
      const listId = params.get('listId');
      
      if (listId && lists.some(list => list.id === Number(listId))) {
        setSelectedListId(Number(listId));
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [lists, setSelectedListId]);
  
  // Hide copy notification after timeout
  useEffect(() => {
    if (copyNotification) {
      const timer = setTimeout(() => {
        setCopyNotification(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copyNotification]);
  
  const handleCopyItem = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyNotification(`Copied: ${text}`);
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
          onDeleteList={deleteList}
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

        {copyNotification && (
          <div className="copy-notification">
            {copyNotification}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;