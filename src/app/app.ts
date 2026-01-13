import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderComponent } from './features/order/order.component';

@Component({
  selector: 'app-root',
  imports: [OrderComponent],
  template: '<app-order></app-order>',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('MCDCookbot');
}
