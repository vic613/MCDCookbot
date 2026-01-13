import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderControllerService } from '../../core/services/order-controller.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
})
export class OrderComponent {
  private ctrl = inject(OrderControllerService);

  pending$ = this.ctrl.pendingOrders$;
  completed$ = this.ctrl.completedOrders$;
  bots$ = this.ctrl.bots$;
  totalOrders$ = this.ctrl.totalOrders$;

  totalBots$ = this.ctrl.bots$; // total number of bots
  busyBots$ = this.ctrl.busyBots$;
  idleBots$ = this.ctrl.idleBots$;

  normal() {
    this.ctrl.createOrder('NORMAL');
  }
  vip() {
    this.ctrl.createOrder('VIP');
  }
  addBot() {
    this.ctrl.addBot();
  }
  removeBot() {
    this.ctrl.removeBot();
  }
}
