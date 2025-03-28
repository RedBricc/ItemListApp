import React from 'react';
import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onCopyItem: (text: string) => Promise<void>;
  onDeleteItem: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onCopyItem, onDeleteItem }) => (
  <div className="item-list-container">
    <div className="item-list-overlay"></div>
    <ul className="item-list">
      {items.map((item) => (
        <li
          key={item.id}
          className="item"
          onClick={() => onCopyItem(item.text)}
        >
          <span className="item-text">
            {item.text}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDeleteItem(item.id);
            }}
            className="delete-button"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ItemList; 