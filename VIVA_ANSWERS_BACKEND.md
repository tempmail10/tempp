# 🍕 VIVA ANSWERS — Node.js, Express & Backend

---

## Q1. What is Node.js?

> **Answer:**

Node.js is a **runtime environment** that lets you run JavaScript/TypeScript on the **server side** (outside the browser). 

- Before Node.js, JavaScript only ran in browsers
- Node.js uses Google's **V8 engine** (the same engine inside Chrome) to execute JS on the server
- It is **single-threaded** but handles many requests simultaneously using an **event loop** (non-blocking I/O)
- Perfect for building REST APIs, real-time apps, and microservices

> *"In my project, I used Node.js as the runtime to run my Express server."*

---

## Q2. What is Express.js?

> **Answer:**

Express.js is a **lightweight web framework for Node.js**. Node.js alone can create HTTP servers, but it's very verbose. Express makes it easy to:

- Define routes (`app.get()`, `app.post()`)
- Use middleware (`app.use()`)
- Handle requests and send responses
- Build REST APIs quickly

**Without Express:**
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/api/pizzas' && req.method === 'GET') {
    // manually handle...
  }
});
```

**With Express:**
```javascript
app.get('/api/pizzas', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});
```

Express is to Node.js what Angular is to JavaScript — it simplifies the work.

---

## Q3. Why did you use Express in your project?

> **Answer:**

1. To create a **REST API** that Angular can call
2. Express makes routing clean and simple
3. Middleware support (CORS, JSON parsing) in one line
4. Works perfectly with Mongoose for MongoDB
5. TypeScript support via `tsx`
6. Industry standard — widely used in production

---

## Q4. What is middleware in Express.js?

> **Answer:**

Middleware is a function that runs **between receiving a request and sending a response**. It has access to `req`, `res`, and `next`.

```javascript
// Every request passes through these middleware first
app.use(cors());           // ← middleware 1: allow cross-origin
app.use(express.json());   // ← middleware 2: parse JSON body
```

**Flow:**
```
Request → cors() middleware → express.json() middleware → Route Handler → Response
```

**Types of middleware in Express:**
1. **Built-in:** `express.json()`, `express.static()`
2. **Third-party:** `cors()`, `helmet()`, `morgan()`
3. **Custom:** Your own functions

> *"In my project, I used `cors()` to allow Angular to call my API, and `express.json()` to parse incoming JSON request bodies."*

---

## Q5. What is `req.body`?

> **Answer:**

`req.body` contains the **data sent in the body of an HTTP request** (usually POST, PUT, PATCH).

When a user submits a form and Angular sends:
```
POST /api/orders
Content-Type: application/json
{ "pizzaId": "pizza_001", "quantity": 2 }
```

In Express, you access it as:
```typescript
app.post('/api/orders', (req, res) => {
  console.log(req.body.pizzaId);    // "pizza_001"
  console.log(req.body.quantity);   // 2
});
```

**Important:** `req.body` only works after adding `app.use(express.json())` middleware. Without it, `req.body` is `undefined`.

> For GET requests, `req.body` is typically empty. Data comes via `req.params` or `req.query` instead.

---

## Q6. What is `app.listen`?

> **Answer:**

`app.listen(port, callback)` starts the Express server and tells it to listen for incoming HTTP requests on a specific port.

```typescript
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this project:
```typescript
app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
```

Without `app.listen`, the server doesn't start — it's just code sitting in memory. This is the line that actually "switches on" the server.

---

## Q7. What is `package.json`?

> **Answer:**

`package.json` is the **configuration file for a Node.js project**. It contains:

1. **Project metadata:** name, version, description
2. **Scripts:** commands like `npm run dev`, `npm start`
3. **Dependencies:** packages the project needs to run (`express`, `mongoose`, `cors`)
4. **DevDependencies:** packages only needed during development (`typescript`, `tsx`)

```json
{
  "name": "pizzeria-server",
  "scripts": {
    "dev": "tsx watch app.ts",
    "start": "tsx app.ts"
  },
  "dependencies": {
    "express": "5.2.1",
    "mongoose": "9.9.4",
    "cors": "2.8.6"
  }
}
```

When you run `npm install`, npm reads `package.json` and installs all listed packages.

---

## Q8. What is CORS and why can't we give access to a request coming from Angular to the server directly?

> **Answer:**

**CORS = Cross-Origin Resource Sharing**

Browsers enforce a **Same-Origin Policy** — a web page can only make requests to the **same domain, port, and protocol** it was served from.

- Angular runs at: `http://localhost:4200`
- Express runs at: `http://localhost:3000`

These are **different origins** (different port = different origin). The browser **blocks** the request by default for security — to prevent malicious websites from stealing your data.

**CORS is the mechanism to allow this:**
```typescript
app.use(cors()); // Allows requests from any origin
```

The browser first sends a **preflight OPTIONS request** to check if the server allows it. With `cors()` middleware, Express responds "yes, allowed" and the actual request goes through.

> **Why this security?** Imagine you're logged into your bank. A malicious site could silently make requests to your bank's API using your cookies. Same-Origin Policy prevents this.

---

## Q9. What is `app.json`?

> **Answer for this project:**

This project doesn't have an `app.json`. But generally:

- In **Express**, the main entry file is `app.ts` (or `app.js`) — not `app.json`
- `app.json` is used in **Heroku** deployments as a manifest file describing the app
- It might also refer to **React Native's** `app.json` configuration

> *"In my project, the main backend file is `app.ts` which sets up Express, connects to MongoDB, and defines the API routes."*

---

## Q10. How do you make an API? (What you did in hands-on)

> **Answer:**

In the hands-on, creating an API involves:

**Step 1: Set up Express**
```typescript
const app = express();
app.use(cors());
app.use(express.json());
```

**Step 2: Connect to MongoDB**
```typescript
await mongoose.connect(process.env.MONGO_URI);
```

**Step 3: Define a Mongoose Model (Schema)**
```typescript
const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});
const Pizza = mongoose.model('Pizza', pizzaSchema);
```

**Step 4: Create a Route (API Endpoint)**
```typescript
app.get('/api/pizzas', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});
```

**Step 5: Start the server**
```typescript
app.listen(3000, () => console.log('Running on 3000'));
```

**Step 6: Test in Postman** — Send GET request to `http://localhost:3000/api/pizzas`

---

## Q11. What happens if you send an empty request to the API (Postman)?

> **Answer:**

For `GET /api/pizzas` — **returns all pizzas** (body is irrelevant for GET).

For a `POST` endpoint with empty body:
- `req.body` would be `{}` (empty object)
- Mongoose would try to create a document from it
- Schema validation fires — required fields are missing
- Mongoose throws `ValidationError`
- `catch` block catches it → returns error JSON
```json
{ "message": "Pizza validation failed: name: Path `name` is required." }
```

---
