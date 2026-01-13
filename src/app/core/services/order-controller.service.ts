import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Order, OrderType } from '../models/order.model';
import { Bot } from '../models/bot.model';

@Injectable({ providedIn: 'root' })
export class OrderControllerService {
  private orderCounter = 1;
  private botCounter = 1;

  pendingOrders$ = new BehaviorSubject<Order[]>([]);
  completedOrders$ = new BehaviorSubject<Order[]>([]);
  totalOrders$ = new BehaviorSubject<number>(0);

  bots$ = new BehaviorSubject<Bot[]>([]);

  busyBots$ = new BehaviorSubject<number>(0);
  idleBots$ = new BehaviorSubject<number>(0);

  private updateBotCounts() {
    const bots = this.bots$.value;
    const busy = bots.filter((b) => b.busy).length;
    const idle = bots.filter((b) => !b.busy).length;

    this.busyBots$.next(busy);
    this.idleBots$.next(idle);
  }

  // Event bus: all orders emit here
  private orderCreated$ = new Subject<Order>();

  constructor() {
    // Every bot reacts to new orders automatically
    this.orderCreated$.subscribe((order) => {
      this.assignOrderToIdleBot(order);
    });
  }

  // Create a new order
  createOrder(type: OrderType) {
    const order: Order = {
      orderNo: this.orderCounter++,
      type,
      status: 'PENDING',
    };
    this.totalOrders$.next(this.orderCounter - 1);

    // Check if any idle bot is available
    const idleBot = this.bots$.value.find((b) => !b.busy);

    if (idleBot) {
      const pending = [...this.pendingOrders$.value];

      // Assign immediately to idle bot

      setTimeout(() => {
        this.assignOrderToIdleBot(order);
      }, 2000); // 3000 milliseconds = 3 seconds

      this.pendingOrders$.next([...pending, order]);
    } else {
      // No idle bot → push to pending
      const pending = [...this.pendingOrders$.value];
      if (type === 'VIP') {
        const vip = pending.filter((o) => o.type === 'VIP');
        const normal = pending.filter((o) => o.type === 'NORMAL');
        this.pendingOrders$.next([...vip, order, ...normal]);
      } else {
        this.pendingOrders$.next([...pending, order]);
      }
    }
  }

  // Add a bot
  addBot() {
    const bot: Bot = {
      id: this.botCounter++,
      status: 'IDLE',
      busy: false,
    };
    this.bots$.next([...this.bots$.value, bot]);

    // Try to pick up any existing pending orders
    const pending = [...this.pendingOrders$.value];
    pending.forEach((order) => this.orderCreated$.next(order));
    this.updateBotCounts(); // immediately update counts
  }

  // Remove the newest bot
  removeBot() {
    const bots = [...this.bots$.value];
    const bot = bots.pop();
    if (!bot) return;

    // If the bot is processing an order, revert only if PROCESSING
    if (bot.busy && bot.currentOrder && bot.currentOrder.status === 'PROCESSING') {
      clearTimeout(bot.timer);
      bot.currentOrder.status = 'PENDING';
      this.pendingOrders$.next([bot.currentOrder, ...this.pendingOrders$.value]);
      this.orderCreated$.next(bot.currentOrder); // let another bot pick it
    }

    this.bots$.next(bots);
    this.updateBotCounts(); // immediately update counts
  }

  // Assign an order to the first available idle bot
  private assignOrderToIdleBot(order: Order) {
    const bots = this.bots$.value;
    const idleBot = bots.find((b) => !b.busy);
    if (!idleBot) return; // no idle bot

    // Remove from pending

    const pending = this.pendingOrders$.value.filter((o) => o.orderNo !== order.orderNo);
    this.pendingOrders$.next(pending);

    // Assign order
    idleBot.busy = true;
    idleBot.status = 'BUSY';
    idleBot.currentOrder = order;
    order.status = 'PROCESSING';
    // <-- add this line to immediately update counts
    this.updateBotCounts();

    // Process order
    idleBot.timer = setTimeout(() => {
      order.status = 'COMPLETE';
      this.completedOrders$.next([...this.completedOrders$.value, order]);

      // Bot becomes idle
      idleBot.busy = false;
      idleBot.status = 'IDLE';
      idleBot.currentOrder = undefined;

      this.updateBotCounts(); // update busy/idle count

      // Pick next pending order if any
      const nextPending = [...this.pendingOrders$.value];
      if (nextPending.length > 0) {
        this.orderCreated$.next(nextPending[0]);
      }
    }, 10000);
  }
}
