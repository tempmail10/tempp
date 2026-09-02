# 🍕 VIVA ANSWERS — Project Explanation & Flow

---

## Q1. Explain your project end to end

> **Full Answer (practice this for 5 minutes):**

My project is a **full-stack online pizza ordering web application** called Pizzeria.

**Tech Stack:**
- **Frontend:** Angular 19 (TypeScript, Angular Signals, RxJS)
- **Backend:** Node.js + Express.js (TypeScript)
- **Database:** MongoDB (via Mongoose)

**How it works end to end:**

1. The user opens the app at `localhost:4200` — this is the Angular frontend.
2. The Angular app has **4 pages**: Home, Order Pizza, Build Your Pizza, and Cart.
3. When the user visits the **Order Pizza** page, Angular makes an HTTP GET request to the Express server at `localhost:3000/api/pizzas`.
4. The Express server receives the request, uses **Mongoose** to query the MongoDB database, and sends back the pizza data as JSON.
5. Angular receives the JSON, stores it in a **Signal** (reactive state), and renders the pizza cards on screen.
6. The user clicks **"Add to Cart"** — this updates the CartService Signal (no API call needed, it's client-side state).
7. On the **Build Your Pizza** page, Angular fetches ingredients from `/api/ingredients`, lets the user select toppings, calculates the price dynamically, and adds a custom pizza to the cart.
8. On the **Cart** page, the user sees all items, adjusts quantities, and clicks **Pay** — which shows a confirmation and clears the cart.

**The key data flow:**
```
User Action → Angular Component → Service (API call) → Express Server → MongoDB → JSON back → Signal updated → UI re-renders
```

---

## Q2. What difficulties did you face while building the project?

> **Good honest answers:**

1. **CORS Error** — When Angular (port 4200) tried to call Express (port 3000), the browser blocked it. Fixed by adding `app.use(cors())` in Express.

2. **Mongoose Connection Async Issue** — The server was trying to handle requests before the database connected. Fixed by `await connectionDB()` inside an async `startServer()` function.

3. **Angular Signals learning curve** — Signals are a new Angular feature. Understanding the difference between `set()`, `update()`, and `computed()` took time.

4. **TypeScript strict mode** — With `strict: true`, TypeScript forced proper type annotations everywhere. Initially got many type errors that had to be resolved.

5. **State management** — Keeping the cart count in sync across all pages (PizzaList, Custom, Cart, Header) — solved using a singleton `CartService` with Signals.

---

## Q3. Explain the complete flow of the project (data flow)

```
BROWSER (Angular - port 4200)
        |
        | HTTP GET /api/pizzas
        ↓
EXPRESS SERVER (Node.js - port 3000)
        |
        | Pizza.find() - Mongoose query
        ↓
MONGODB DATABASE (Atlas Cloud)
        |
        | Returns JSON documents
        ↑
EXPRESS SERVER
        |
        | res.status(200).json(pizzaMenu)
        ↑
ANGULAR (HttpClient Observable)
        |
        | .subscribe({ next: data => pizzas.set(data) })
        ↓
SIGNAL UPDATED → UI RE-RENDERS AUTOMATICALLY
```

---

## Q4. If Express is stopped, will Angular still get data?

> **Answer: NO.**

Angular fetches pizza data by making HTTP requests to the Express server. If Express is stopped:
- The HTTP request will **fail** with a network error (ERR_CONNECTION_REFUSED)
- The `error` callback in `.subscribe()` fires
- Angular shows the error message: *"Could not load pizzas"*

**However** — once the data is already loaded and stored in the Angular Signal, the user can still *see* the loaded data (it's in memory). But refreshing the page would fail.

---

## Q5. If MongoDB is stopped, will Angular still get data?

> **Answer: NO.**

If MongoDB goes down:
- Express is still running, but when it runs `Pizza.find()`, Mongoose throws an error
- Express catches it in the `try/catch` block and returns an error response
- Angular receives the error response and shows the error message

**The data flow breaks at the database layer.** Angular cannot bypass Express to get data directly from MongoDB.

---

## Q6. If you want to change the port number, which files do you need to change?

> **Backend change (Express port):**
> - `.env` file: change `PORT=3000` to your new port
> - The `config.ts` reads `process.env.PORT`, so it auto-picks it up

> **Frontend change (Angular service URLs):**
> - `src/app/services/pizza.service.ts` — update `http://localhost:3000/api/pizzas`
> - `src/app/services/ingredient.service.ts` — update `http://localhost:3000/api/ingredients`

So you need to change the **`.env`** on the backend and the **two service files** on the frontend.

> **Best practice:** Use Angular `environment.ts` files to store the base URL so you only change one place.

---

## Q7. If you call an API in Postman without sending any data (empty body), what will it return?

> **Answer (for this project):**

For `GET /api/pizzas` — it doesn't need a body. It will return **all pizzas from the database** (200/201 OK with JSON array).

For a hypothetical `POST /api/orders` with empty body:
- Mongoose would try to create a document from `{}`
- Schema validation would fail (required fields missing)
- The `catch` block would return an error response with the validation error message

---

## Q8. How much of the project did you develop yourself vs with AI?

> **Suggested honest answer:**

*"I used GitHub Copilot as an autocomplete assistant — it helped with boilerplate and syntax. However, the architecture decisions, data models, component structure, and understanding of how everything connects — that was my design. Copilot doesn't understand your project requirements; you have to direct it."*

---

## Q9. What is token.json used for?

> **Answer for this project:**

This project does not use `token.json`. However, in general, `token.json` is used to store authentication tokens (like OAuth access tokens/refresh tokens) locally, commonly seen in Google API integrations.

---

## Q10. Can Angular directly insert data into MongoDB?

> **Answer: NO — absolutely not.**

Angular runs in the **browser**. Browsers cannot connect directly to MongoDB because:
1. MongoDB uses TCP connections, not HTTP — browsers only speak HTTP/HTTPS
2. It would be a massive security risk (anyone could access your database)

The correct flow is:
```
Angular → HTTP POST to Express API → Express validates data → Mongoose saves to MongoDB
```

Angular only talks to Express (REST API). Express talks to MongoDB.

---

## Q11. What happens if MongoDB insertion fails after form submission?

> **Answer:**

1. Mongoose throws an error inside the `try` block
2. The `catch(err)` block catches it
3. Express sends back an error response (e.g., `res.status(500).json({ message: err.message })`)
4. On Angular's side, the `error` callback in `.subscribe()` fires
5. You show the user an error message

In this project, since there's no POST endpoint yet, this is a future enhancement scenario.

---
