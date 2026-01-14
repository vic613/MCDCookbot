🍔 MCDCookbot

MCDCookbot is an Angular-based simulation of McDonald’s automated cooking bot system, designed to demonstrate event-driven order processing, VIP prioritization, and dynamic bot scaling during high-demand scenarios such as the COVID-19 period.

Demo Page :
https://vic613.github.io/MCDCookbot/

🚀 Features

VIP & Normal order prioritization

Concurrent cooking bot processing

Dynamic add/remove bots

Real-time order & bot status updates

Event-driven, reactive architecture

No backend required (frontend-only prototype)

GitHub Pages deployable

🧱 System Architecture
High-Level Architecture Diagram
```text
┌────────────────────┐
│   UI Components    │
│────────────────────│
│ • Order Board      │
│ • Bot Dashboard    │
│ • Control Buttons  │
└─────────┬──────────┘
          │ User Actions
          ▼
┌──────────────────────────┐
│ OrderControllerService   │
│──────────────────────────│
│ • Order Queue Management │
│ • VIP Priority Logic     │
│ • Bot Assignment Engine  │
│ • Lifecycle Control      │
└─────────┬──────────┬─────┘
          │          │
          │          │ RxJS Streams
          ▼          ▼
┌────────────────┐  ┌────────────────┐
│ Order Streams  │  │ Bot Streams    │
│ (BehaviorSubj) │  │ (BehaviorSubj) │
└───────┬────────┘  └───────┬────────┘
        │                   │
        ▼                   ▼
┌──────────────────────────────────┐
│     Bot Timers (10s per order)    │
│──────────────────────────────────│
│ • Concurrent execution           │
│ • Auto-complete handling         │
│ • Reassignment on availability   │
└──────────────────────────────────┘
```

Architectural Pattern

Event-Driven Architecture

Reactive Programming (RxJS)

Single Source of Truth (Service Layer)

All business logic is centralized inside OrderControllerService, while UI components remain stateless and reactive.

🔁 Order Processing Flow
```text  
Order Created
     ↓
Added to Pending Queue
     ↓
Idle Bot Available?
     ↓
YES ───────────────► Assign to Bot
                          ↓
                    PROCESSING (10s)
                          ↓
                     COMPLETED
```
Priority Rules

VIP Orders

Always placed before Normal orders

FIFO among VIPs

Normal Orders

FIFO processing

📂 Project Folder Structure
```text
MCDCookbot/
src/
├── app/
│   ├── core/                          # Core application logic (singleton layer)
│   │   ├── models/                    # Domain models & enums
│   │   │   ├── order.model.ts
│   │   │   ├── bot.model.ts
│   │   │   └── enums.ts               # OrderType, OrderStatus
│   │   └── services/                  # Business logic & controllers
│   │       └── order-controller.service.ts
│   │
│   ├── features/
│   │   └── order/                     # Order feature (UI + logic)
│   │       ├── order.component.ts
│   │       └── order.component.html
│   │
│   ├── app.config.ts                  # Application configuration (providers)
│   ├── app.routes.ts                  # Application routes
│   ├── app.ts                         # Root standalone component
│   ├── app.html                       # Root template
│   ├── app.css                        # Root styles
│   └── app.spec.ts                    # Root unit test
│
└── index.html                         # Application entry HTML
``` 

📁 Folder Explanation
/components

UI-only components:

Display orders

Show bot status

Provide user controls
⚠️ No business logic here

/services

OrderControllerService (Core Logic):

Order queue management

VIP prioritization

Bot lifecycle handling

Timer-based processing

Event broadcasting (RxJS)

/models

Strongly-typed domain models:

Order

Bot

Enums for status & type

/dist/MCDCookbot/browser

Angular production output (Angular 16+ behavior):

browser/ → actual deployable files

index.html → SPA entry point

404.html → GitHub Pages route fallback

🌐 Routing & Deployment
Base HREF
<base href="/MCDCookbot/">


Required for GitHub Pages and sub-folder hosting.

404 Fallback (SPA Support)
<!-- 404.html -->
<script>
  sessionStorage.redirect = location.pathname;
  location.replace('/MCDCookbot/');
</script>


Ensures refresh & deep links work correctly.

🧪 Local Testing
Development Mode
ng serve


Access:

http://localhost:4200

Production Simulation (Recommended)
ng build --configuration production --base-href=/MCDCookbot/
npx serve dist/MCDCookbot


Access:

http://localhost:3000

⚠️ Known Limitations

No backend persistence

Page refresh resets state

Single restaurant simulation

Timers reset on reload

🔮 Future Enhancements

Backend API integration

Persistent storage (IndexedDB / DB)

WebSocket real-time updates

Multi-branch support

Performance analytics dashboard

🏁 Conclusion

MCDCookbot showcases a scalable, event-driven kitchen automation model using Angular and RxJS. The architecture cleanly separates concerns, supports concurrency, and is fully deployable as a modern SPA.


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

