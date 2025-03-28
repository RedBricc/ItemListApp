import { useState, useEffect } from 'react';
import { List, Item } from '../types';

function useListsManager() {
  const [lists, setLists] = useState<List[]>(() => {
    const savedLists = localStorage.getItem('lists');
    return savedLists ? JSON.parse(savedLists) : [{ id: Date.now(), name: 'Default List', items: [] }];
  });
  
  const [selectedListId, setSelectedListId] = useState<number>(() => lists[0]?.id || Date.now());
  
  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);
  
  const selectedList = lists.find(list => list.id === selectedListId);
  
  const addItem = (text: string): void => {
    if (text.trim() && selectedList) {
      setLists(lists.map(list => 
        list.id === selectedListId
          ? { ...list, items: [...list.items, { id: Date.now(), text: text.trim() }] }
          : list
      ));
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
      const newList: List = {
        id: Date.now(),
        name: name.trim(),
        items: []
      };
      setLists([...lists, newList]);
      setSelectedListId(newList.id);
    }
  };
  
  return {
    lists,
    selectedList,
    selectedListId,
    setSelectedListId,
    addItem,
    deleteItem,
    createList
  };
}

export default useListsManager; 