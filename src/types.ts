export interface Item {
  id: number;
  text: string;
}

export interface List {
  id: number;
  name: string;
  items: Item[];
} 