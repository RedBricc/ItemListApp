import React from 'react';
import { List } from '../types';

interface ListSelectorProps {
  lists: List[];
  selectedListId: number;
  onSelectList: (id: number) => void;
  onToggleNewListForm: () => void;
  showNewListForm: boolean;
}

const ListSelector: React.FC<ListSelectorProps> = ({ 
  lists, 
  selectedListId, 
  onSelectList, 
  onToggleNewListForm, 
  showNewListForm 
}) => (
  <div className="list-selector">
    <select 
      value={selectedListId} 
      onChange={(e) => onSelectList(Number(e.target.value))}
      className="list-dropdown"
    >
      {lists.map(list => (
        <option key={list.id} value={list.id}>
          {list.name}
        </option>
      ))}
    </select>
    <button 
      onClick={onToggleNewListForm}
      className="new-list-button"
    >
      {showNewListForm ? 'Cancel' : 'New List'}
    </button>
  </div>
);

export default ListSelector; 