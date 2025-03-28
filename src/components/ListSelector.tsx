import React from 'react';
import { List } from '../types';

interface ListSelectorProps {
  lists: List[];
  selectedListId: number;
  onSelectList: (id: number) => void;
  onDeleteList: (id: number) => void;
  onToggleNewListForm: () => void;
  showNewListForm: boolean;
}

const ListSelector: React.FC<ListSelectorProps> = ({ 
  lists, 
  selectedListId, 
  onSelectList, 
  onDeleteList,
  onToggleNewListForm, 
  showNewListForm 
}) => {
  // Prevent delete button from triggering dropdown change
  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    
    if (lists.length > 1) {
      const confirmed = window.confirm('Are you sure you want to delete this list?');
      if (confirmed) {
        onDeleteList(id);
      }
    } else {
      alert('Cannot delete the only list. Create another list first.');
    }
  };

  return (
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
        onClick={() => onToggleNewListForm()}
        className="new-list-button list-button"
      >
        {showNewListForm ? 'Cancel' : 'New List'}
      </button>
      <button 
        onClick={(e) => handleDeleteClick(e, selectedListId)}
        className="delete-list-button list-button"
        disabled={lists.length <= 1}
        title={lists.length <= 1 ? "Cannot delete the only list" : "Delete current list"}
      >
        Delete List
      </button>
    </div>
  );
};

export default ListSelector; 