import {PreOrderDetail} from './PreOrderDetail';

export class PreOrder {
  id: number;
  orderType: string;
  clerkName: string;
  waiterName: string;
  deliveryAgent: string;
  tableNumber: string;
  numberOfPersons: number;
  customerName: string;
  customerContactNbr: string;
  customerAddress: string;
  preOrderDetails: PreOrderDetail[];
}
