# 🍕 VIVA ANSWERS — Angular & Frontend

---

## Q1. What is Dependency Injection (DI)?

> **Answer:**

Dependency Injection is a design pattern where a class **receives its dependencies from outside** rather than creating them itself.

**Without DI (bad):**
```typescript
export class PizzaList {
  // Creates its own instance — tightly coupled, hard to test
  private pizzaService = new PizzaService();
}
```

**With DI (good):**
```typescript
export class PizzaList {
  // Angular injects the instance — Angular manages it
  private pizzaService = inject(PizzaService);
}
```

**How Angular DI works:**
1. You mark a service with `@Injectable({ providedIn: 'root' })`
2. Angular creates **one instance** (singleton) of that service for the entire app
3. Any component that calls `inject(PizzaService)` gets **the same instance**
4. This is how `CartService` shares state — all components get the same cart!

**Benefits:**
- Loose coupling (components don't create services)
- Easy to test (inject mock services in tests)
- Singleton services enable shared state

---

## Q2. What is an Observable?

> **Answer:**

An Observable (from RxJS) is like a **stream of data over time** that you can subscribe to. Think of it like a YouTube channel — you subscribe, and whenever a new video (data) arrives, you get notified.

```typescript
// Observable returned by HttpClient
this.pizzaService.getPizzas().subscribe({
  next: (data) => {        // Called when data arrives
    this.pizzas.set(data);
  },
  error: (error) => {      // Called if error occurs
    console.error(error);
  },
  complete: () => {        // Called when stream ends
    this.loading.set(false);
  }
});
```

**Observable vs Promise:**

| Feature | Observable | Promise |
|---------|-----------|---------|
| Values | Multiple over time | Single value |
| Cancellable | ✅ Yes (unsubscribe) | ❌ No |
| Lazy | ✅ Only runs when subscribed | ❌ Runs immediately |
| Operators | ✅ map, filter, tap, etc. | ❌ Limited |

**In this project:** `HttpClient.get()` returns an Observable. We use `.pipe(finalize(...)).subscribe()` to handle it.

---

## Q3. What are Observables in Angular?

> **Same as above — extended version:**

Angular uses RxJS Observables heavily:

1. **HttpClient** — All HTTP calls return Observables
2. **Router events** — Navigation changes are Observable streams
3. **Forms (valueChanges)** — Form value changes are Observable

**The key concept — subscribe/unsubscribe:**
```typescript
// Subscribe — starts listening
const sub = this.service.getData().subscribe(data => { ... });

// Unsubscribe — stop listening (prevent memory leaks)
sub.unsubscribe();
```

> *"In my project, when PizzaList component initializes, it subscribes to `getPizzas()`. When the data arrives from the server, the `next` callback fires and we update the Signal. The `finalize()` operator ensures `loading` is set to false whether success or error."*

---

## Q4. Why do we use Services in Angular?

> **Answer:**

Services are used for:

1. **Sharing data between components** — CartService shares cart state between PizzaList, Custom, and Cart components
2. **API communication** — Keeping HTTP calls out of components (PizzaService, IngredientService)
3. **Business logic** — Cart calculations, price totals
4. **Reusability** — Write once, use in many components
5. **Separation of Concerns** — Components handle UI; services handle data

**Without services:**
- Each component would make its own API calls (duplicate code)
- Cart data couldn't be shared between pages

**With services:**
```
CartService (singleton)
    ↑                   ↑
PizzaList          Custom        Cart
(writes to cart) (writes)    (reads cart)
```

---

## Q5. Can Angular directly access MongoDB?

> **Answer: ABSOLUTELY NO.**

Angular runs in the **browser**. MongoDB is a server-side database. There are multiple layers of separation:

1. **Security** — Exposing MongoDB directly to browsers would expose all your data
2. **Protocol mismatch** — MongoDB uses binary TCP protocol; browsers speak HTTP
3. **Architecture** — The whole point of a backend is to be the gatekeeper

```
✅ CORRECT: Angular → HTTP → Express → Mongoose → MongoDB
❌ WRONG:   Angular → MongoDB (impossible and dangerous)
```

> *"Angular communicates only with the Express REST API. Express is the secure middleware that validates requests before touching the database."*

---

## Q6. What is Two-Way Data Binding?

> **Answer:**

Two-way data binding means the **UI and the component class stay in sync automatically** — when one changes, the other updates.

**In Angular using `[(ngModel)]`:**
```html
<input [(ngModel)]="userName" />
<p>Hello, {{ userName }}</p>
```

If the user types in the input → `userName` variable updates automatically.
If `userName` changes in code → the input field updates automatically.

**How it works internally:**
`[(ngModel)]` is shorthand for:
```html
<input [value]="userName" (input)="userName = $event.target.value" />
```
- `[value]` → property binding (class → template) — one direction
- `(input)` → event binding (template → class) — other direction
- Combined = two-way!

**In this project:** Two-way binding isn't heavily used (no forms). The app uses Signals instead, which achieve similar reactivity.

**One-way vs Two-way:**
- `[value]="x"` → One-way (class → template)
- `(click)="fn()"` → One-way (template → class)
- `[(ngModel)]="x"` → Two-way (both directions)

---

## Q7. What is Dependency Injection (repeated — critical topic)?

> **Short version to memorize:**

DI = **"Don't create it, receive it."**

Angular creates service instances and injects them into components that need them. `@Injectable({ providedIn: 'root' })` = one shared instance for the whole app.

```typescript
// Angular DI in action
private cartService = inject(CartService);
// Angular gives you THE SAME CartService instance that every other component uses
```

---

## Q8. What is the difference between Angular and React?

> **Answer:**

| Feature | Angular | React |
|---------|---------|-------|
| **Type** | Full framework | UI Library |
| **Language** | TypeScript (enforced) | JavaScript/TypeScript |
| **Data binding** | Two-way (ngModel) | One-way (state → UI) |
| **State management** | Signals / RxJS (built-in) | useState, Redux (external) |
| **Routing** | Angular Router (built-in) | React Router (external) |
| **Forms** | Reactive Forms (built-in) | Formik, React Hook Form (external) |
| **Learning curve** | Steeper (opinionated) | Easier to start |
| **Architecture** | MVC/MVVM enforced | Flexible |
| **HTTP** | HttpClient (built-in) | Axios/fetch (external) |
| **Company** | Google | Meta (Facebook) |

> *"Angular is a complete, opinionated framework — everything you need is built in. React is a lightweight library for building UIs; you need to add routing, state management, and HTTP libraries separately."*

---

## Q9. What is `package.json` in the Angular project?

> **Answer:**

Same concept as backend `package.json` but for the Angular frontend:

```json
{
  "name": "pizzeria-client",
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "vitest"
  },
  "dependencies": {
    "@angular/core": "^21.2.0",
    "@angular/router": "^21.2.0",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "@angular/cli": "^21.2.21",
    "typescript": "^5.9.2"
  }
}
```

Running `npm install` installs all Angular packages listed here.

---

## Q10. What happens if you don't unsubscribe from an Observable?

> **Answer (Memory Leak):**

If a component subscribes to an Observable and doesn't unsubscribe when destroyed, the subscription keeps running in the background — this is a **memory leak**.

**Fix:** Use `takeUntilDestroyed()`:
```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

this.pizzaService.getPizzas()
  .pipe(
    takeUntilDestroyed(),  // auto-unsubscribes when component destroys
    finalize(() => this.loading.set(false))
  )
  .subscribe({ ... });
```

> *"In my current project, HttpClient Observables auto-complete after one response, so there's no persistent leak. But for long-running observables, cleanup is essential."*

---

## Q11. Why can't we give direct access to a numerical request to the server coming from Angular?

> **Answer:**

This question is likely about **CORS and the browser's security model**.

Browsers enforce restrictions because:
- If any website could freely call any server, it would enable **Cross-Site Request Forgery (CSRF)** attacks
- A malicious site could use your active sessions to make unauthorized requests

**Angular (browser) → Server:**
- Browser sends a **preflight OPTIONS request** first
- Server must respond with CORS headers allowing it
- Only then does the actual request go through

The word "numerical" might refer to requests coming from non-browser clients (like Postman) — those **don't** have CORS restrictions because CORS is a **browser** security mechanism, not a server one.

---
