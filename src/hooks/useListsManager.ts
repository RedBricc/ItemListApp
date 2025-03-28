import { useState, useEffect } from 'react';
import { List, Item } from '../types';

function useListsManager() {
  // Get the next available list ID
  const getNextListId = (existingLists: List[]): number => {
    if (existingLists.length === 0) return 1;
    
    // Find the highest ID and add 1
    const maxId = Math.max(...existingLists.map(list => list.id));
    return maxId + 1;
  };
  
  // Get the next available item ID for a specific list
  const getNextItemId = (items: Item[]): number => {
    if (items.length === 0) return 1;
    
    // Find the highest ID and add 1
    const maxId = Math.max(...items.map(item => item.id));
    return maxId + 1;
  };
  
  const [lists, setLists] = useState<List[]>(() => {
    const savedLists = localStorage.getItem('lists');
    
    if (savedLists) {
      return JSON.parse(savedLists);
    } else {
      // Create first list with ID 1
      return [{ id: 1, name: 'Default List', items: [] }];
    }
  });
  
  // Function to get the list ID from URL query parameter
  const getListIdFromUrl = (): number | null => {
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('listId');
    return listId ? Number(listId) : null;
  };

  // Function to set the list ID in URL query parameter
  const setListIdInUrl = (listId: number): void => {
    const url = new URL(window.location.href);
    url.searchParams.set('listId', listId.toString());
    window.history.replaceState({}, '', url);
  };
  
  const [selectedListId, setSelectedListId] = useState<number>(() => {
    // Try to get list ID from URL first
    const urlListId = getListIdFromUrl();
    
    // If list ID exists in URL and is valid, use it
    if (urlListId) {
      const savedLists = localStorage.getItem('lists');
      const parsedLists = savedLists ? JSON.parse(savedLists) : [];
      
      // Check if the list ID from URL exists in our saved lists
      if (parsedLists.some((list: List) => list.id === urlListId)) {
        return urlListId;
      }
    }
    
    // Otherwise fallback to the first list or create a new ID
    const savedLists = localStorage.getItem('lists');
    const parsedLists = savedLists ? JSON.parse(savedLists) : [];
    const firstListId = parsedLists[0]?.id;
    return firstListId || 1;
  });
  
  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);
  
  // Update URL when selected list changes
  useEffect(() => {
    setListIdInUrl(selectedListId);
  }, [selectedListId]);
  
  const selectedList = lists.find(list => list.id === selectedListId);
  
  // Custom setSelectedListId that also updates URL
  const handleSelectList = (listId: number): void => {
    setSelectedListId(listId);
    setListIdInUrl(listId);
  };
  
  const addItem = (text: string): void => {
    if (text.trim() && selectedList) {
      setLists(lists.map(list => {
        if (list.id === selectedListId) {
          // Get next sequential item ID
          const nextItemId = getNextItemId(list.items);
          return {
            ...list,
            items: [...list.items, { id: nextItemId, text: text.trim() }]
          };
        }
        return list;
      }));
    }
  };
  
  const deleteItem = (id: number): void => {
    setLists(lists.map(list =>
      list.id === selectedListId
        ? { ...list, items: list.items.filter(item => item.id !== id) }
        : list
    ));
  };
  
  const createList = (name: string): void => {
    if (name.trim()) {
      // Get the next sequential ID
      const nextId = getNextListId(lists);
      
      const newList: List = {
        id: nextId,
        name: name.trim(),
        items: []
      };
      setLists([...lists, newList]);
      handleSelectList(newList.id);
    }
  };
  
  const deleteList = (id: number): void => {
    // Don't delete if it's the only list
    if (lists.length <= 1) {
      return;
    }
    
    // Remove the list
    const newLists = lists.filter(list => list.id !== id);
    setLists(newLists);
    
    // If the deleted list was selected, select another list
    if (selectedListId === id) {
      // Find closest list to select (previous or next)
      const currentIndex = lists.findIndex(list => list.id === id);
      const newIndex = Math.max(0, currentIndex - 1);
      handleSelectList(newLists[newIndex].id);
    }
  };
  
  return {
    lists,
    selectedList,
    selectedListId,
    setSelectedListId: handleSelectList,
    addItem,
    deleteItem,
    createList,
    deleteList
  };
}

export default useListsManager; 