import {ExtraItem} from './ExtraItem';

export class PreOrderDetail {
  productId: number;
  productName: string;
  category: string;
  qty: number;
  unit: string;
  itemPrice: number;
  tax: number;
  hasRecipe: boolean;
  extraItems: ExtraItem[];
}
