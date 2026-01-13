
import { Order } from './order.model';

export enum BotStatus {
  IDLE = 'IDLE',
  BUSY = 'BUSY'
}

export interface Bot {
  id: number;
  status: BotStatus; // Add this line
  busy: boolean;
  currentOrder?: Order;
  timer?: any;
}
