
import { Order } from './order.model';

export type BotStatus = 'IDLE' | 'BUSY';

export interface Bot {
  id: number;
  status: BotStatus; // Add this line
  busy: boolean;
  currentOrder?: Order;
  timer?: any;
}
