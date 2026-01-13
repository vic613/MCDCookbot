
export type OrderType = 'VIP' | 'NORMAL';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETE';

export interface Order {
  orderNo: number;
  type: OrderType;
  status: OrderStatus;
}
