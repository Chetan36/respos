import {Product} from './Product';

export class Recipe {
  id: number;
  itemId: number;
  name: string;
  masterCategory: string;
  qty: number;
  unitAbbreviation: string;
  available: boolean;
  extra: boolean;
  tax: number;
  price: number;
  product: Product;
  checked: false;
}
