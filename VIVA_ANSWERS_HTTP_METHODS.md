# 🍕 VIVA ANSWERS — HTTP Methods, REST API & Services

---

## Q1. What are HTTP Methods (GET, POST, PUT, DELETE, PATCH)?

> **Answer:**

HTTP methods define **what action** you want to perform on a resource. This is the foundation of REST APIs.

| Method | Purpose | Has Body? | Idempotent? |
|--------|---------|-----------|-------------|
| **GET** | Fetch/read data | ❌ No | ✅ Yes |
| **POST** | Create new resource | ✅ Yes | ❌ No |
| **PUT** | Replace entire resource | ✅ Yes | ✅ Yes |
| **PATCH** | Update part of resource | ✅ Yes | ✅ Yes |
| **DELETE** | Remove resource | ❌ Usually no | ✅ Yes |

---

### 📥 GET — Fetch Data

```
GET /api/pizzas          → returns ALL pizzas
GET /api/pizzas/pizza_001 → returns ONE pizza by ID
```

In Express:
```typescript
app.get('/api/pizzas', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);  // 200 OK
});
```

In Angular (HttpClient):
```typescript
this.http.get<Pizza[]>('http://localhost:3000/api/pizzas')
```

> **Used in this project** — fetching pizza menu and ingredients list.

---

### 📤 POST — Create New Data

```
POST /api/pizzas
Body: { "name": "Margherita", "price": 299, "type": "veg" }
→ creates a new pizza, returns 201 Created
```

In Express:
```typescript
app.post('/api/pizzas', async (req, res) => {
  try {
    const newPizza = await Pizza.create(req.body);  // req.body has the data
    res.status(201).json(newPizza);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

In Angular:
```typescript
this.http.post<Pizza>('http://localhost:3000/api/pizzas', pizzaData)
```

> **Not in this project yet** — would be used to add new pizzas or place orders.

---

### 🔄 PUT — Replace Entire Resource

```
PUT /api/pizzas/pizza_001
Body: { "name": "Margherita", "price": 350, "type": "veg", "image": "..." }
→ replaces the ENTIRE pizza document
```

In Express:
```typescript
app.put('/api/pizzas/:id', async (req, res) => {
  const updated = await Pizza.findByIdAndUpdate(
    req.params.id,
    req.body,          // replace all fields
    { new: true }      // return updated document
  );
  res.json(updated);
});
```

**Key difference from PATCH:** PUT requires sending the **complete** resource. If you omit a field, it gets removed.

---

### 🩹 PATCH — Update Part of a Resource

```
PATCH /api/pizzas/pizza_001
Body: { "price": 350 }
→ only updates the price, all other fields stay unchanged
```

In Express:
```typescript
app.patch('/api/pizzas/:id', async (req, res) => {
  const updated = await Pizza.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },  // only update provided fields
    { new: true }
  );
  res.json(updated);
});
```

**PATCH vs PUT:**
- `PUT` → replace everything → like deleting and re-creating
- `PATCH` → update only what you send → more efficient

---

### 🗑️ DELETE — Remove a Resource

```
DELETE /api/pizzas/pizza_001
→ removes the pizza with that ID, returns 204 No Content
```

In Express:
```typescript
app.delete('/api/pizzas/:id', async (req, res) => {
  await Pizza.findByIdAndDelete(req.params.id);
  res.status(204).send(); // 204 = success, no content to return
});
```

In Angular:
```typescript
this.http.delete(`http://localhost:3000/api/pizzas/${id}`)
```

---

## Q2. What are the correct HTTP Status Codes?

> **Answer — critical to know:**

| Code | Meaning | When to use |
|------|---------|-------------|
| **200** | OK | Successful GET, PUT, PATCH |
| **201** | Created | Successful POST (resource created) |
| **204** | No Content | Successful DELETE |
| **400** | Bad Request | Invalid input from client |
| **401** | Unauthorized | Not logged in / no auth token |
| **403** | Forbidden | Logged in but no permission |
| **404** | Not Found | Resource doesn't exist |
| **500** | Internal Server Error | Server/database error |

> **In this project:** GET routes return `201` which is technically incorrect — GET success should return `200`. The error handler returns `401` which should be `500` for server errors. These are bugs to acknowledge if asked.

---

## Q3. What is a REST API?

> **Answer:**

**REST = Representational State Transfer**

REST is an **architectural style** for designing APIs. A REST API uses:
1. **HTTP methods** to define actions (GET = read, POST = create, etc.)
2. **URLs/endpoints** to identify resources (`/api/pizzas`)
3. **JSON** as the data format
4. **Stateless** requests — server doesn't remember previous requests

**This project's REST API:**
```
GET    /api/pizzas      → Read all pizzas
GET    /api/ingredients → Read all ingredients
POST   /api/orders      → Create an order (future)
DELETE /api/pizzas/:id  → Delete a pizza (future)
```

---

## Q4. What is `req.params` vs `req.query` vs `req.body`?

> **Answer:**

These are three ways data can arrive at your Express route:

### `req.params` — URL Path Parameters
```typescript
// Route: /api/pizzas/:id
app.get('/api/pizzas/:id', (req, res) => {
  const id = req.params.id;  // extracts 'pizza_001' from URL
});

// Request: GET /api/pizzas/pizza_001
```

### `req.query` — URL Query String Parameters
```typescript
app.get('/api/pizzas', (req, res) => {
  const type = req.query.type;   // 'veg'
  const page = req.query.page;   // '1'
});

// Request: GET /api/pizzas?type=veg&page=1
```

### `req.body` — Request Body (POST/PUT/PATCH)
```typescript
app.post('/api/pizzas', (req, res) => {
  const name = req.body.name;    // 'Margherita'
  const price = req.body.price;  // 299
});

// Request: POST /api/pizzas
// Body: { "name": "Margherita", "price": 299 }
// Requires: app.use(express.json()) middleware
```

---

## Q5. What are Angular Services and why are they used for API calls?

> **Answer:**

**Services** in Angular are TypeScript classes decorated with `@Injectable`. They are used for:

1. **HTTP API calls** — keeps HTTP logic out of components
2. **State management** — CartService holds cart state
3. **Shared functionality** — any component can inject and use them
4. **Singleton pattern** — `providedIn: 'root'` = one instance for the whole app

**Why services for API calls — not in components directly?**

```typescript
// ❌ BAD — API call in component (not reusable)
export class PizzaList {
  private http = inject(HttpClient);
  getPizzas() { return this.http.get('/api/pizzas'); }
}

// ✅ GOOD — API call in service (reusable from any component)
@Injectable({ providedIn: 'root' })
export class PizzaService {
  private http = inject(HttpClient);
  getPizzas() { return this.http.get<Pizza[]>('/api/pizzas'); }
}

// Now any component can use it:
export class PizzaList {
  private pizzaService = inject(PizzaService);
}
export class SearchComponent {
  private pizzaService = inject(PizzaService); // same service!
}
```

**In this project:**
- `PizzaService` → `GET /api/pizzas`
- `IngredientService` → `GET /api/ingredients`
- `CartService` → Manages cart state (no API calls — client-side only)

---

## Q6. What is `provideHttpClient()` in Angular?

> **Answer:**

`provideHttpClient()` is a **provider function** added in `app.config.ts` that registers Angular's `HttpClient` service for the entire app.

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),   // ← without this, HttpClient.get() won't work
  ],
};
```

Without `provideHttpClient()`, injecting `HttpClient` in a service would throw an error at runtime.

---

## Q7. What is the difference between GET and POST in simple terms?

> **Answer (simple version for the interviewer):**

- **GET** is like **reading a menu** at a restaurant — you're just looking at existing information. Nothing changes.
- **POST** is like **placing an order** — you're sending new data to the server, which creates something new.

**Technical difference:**
- GET has **no request body** — data goes in the URL
- POST has a **request body** — data goes in the body (not visible in URL)
- GET is **safe** (doesn't modify data); POST creates/modifies data
- GET is **cached** by browsers; POST is not

---

## Q8. In Postman, how do you test your APIs?

> **Answer:**

**Testing GET /api/pizzas:**
1. Open Postman
2. Select `GET` method
3. Enter URL: `http://localhost:3000/api/pizzas`
4. Click **Send**
5. You get a JSON array of all pizzas

**Testing POST /api/pizzas (hypothetical):**
1. Select `POST` method
2. Enter URL: `http://localhost:3000/api/pizzas`
3. Go to **Body** tab → select **raw** → select **JSON**
4. Enter: `{ "name": "Margherita", "price": 299, "type": "veg" }`
5. Click **Send**
6. You get the newly created pizza document back

**Testing with empty body (POST with no data):**
1. Body → raw → JSON → leave body empty `{}`
2. Send → Mongoose validation error returned as JSON

---

## Q9. What is Postman and why is it used?

> **Answer:**

Postman is an **API testing tool** that lets you send HTTP requests to any server without needing a frontend.

**Why use it:**
- Test API endpoints during development **before building the frontend**
- Easily switch between GET, POST, PUT, DELETE
- See exact request/response details
- Test error scenarios (empty body, wrong IDs, etc.)
- No browser CORS restrictions (Postman is not a browser)

> *"I used Postman to test `GET /api/pizzas` and `GET /api/ingredients` while building the backend, before connecting the Angular frontend."*

---
