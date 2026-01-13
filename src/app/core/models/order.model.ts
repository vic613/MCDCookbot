
// export type OrderType = 'VIP' | 'NORMAL';

export enum OrderType {
  VIP = 'VIP',
  NORMAL = 'NORMAL'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE'
}

export interface Order {
  orderNo: number;
  type: OrderType;
  status: OrderStatus;
}
