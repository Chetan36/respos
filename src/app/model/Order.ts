export class Order {
  id: number;
  createdAt: any;
  clerkName: string;
  orderType: string;
  waiterName: string;
  deliveryAgent: string;
  tableNumber: number;
  numberOfPersons: number;
  customerName: string;
  customerContactNbr: string;
  customerAddress: string;
  taxAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  totalBasePrice: number;
  discount: number;
  totalPrice: number;
  netPrice: number;
  orderStatus: string;
  settlementMethod: string;
  settled: boolean;
  amountPaid: number;
  cashBack: number;
  cardReceiptNumber: string;
}
