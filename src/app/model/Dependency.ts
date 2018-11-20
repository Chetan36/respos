import {Product} from './Product';

export class Dependency {
  id: number;
  product: Product;
  dependencyTypeAbbreviation: string;
  itemName: string;
  qty: number;
  unitAbbreviation: string;
  price: number;
  currencyCode: string;
}
