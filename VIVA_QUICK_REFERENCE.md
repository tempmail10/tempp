# 🍕 VIVA QUICK REFERENCE CARD
## Read this right before you go in!

---

## 📌 ONE-LINERS (Memorize These)

| Question | One-Line Answer |
|----------|----------------|
| What is Node.js? | JavaScript runtime on the server using V8 engine |
| What is Express? | Lightweight web framework for Node.js to build REST APIs |
| What is MongoDB? | NoSQL document database storing JSON-like data |
| What is Mongoose? | ODM library that connects Node.js to MongoDB with schemas |
| What is CORS? | Browser security mechanism; Express `cors()` allows Angular to call the server |
| What is a Collection? | MongoDB equivalent of a database table |
| What is DI? | Angular injects shared service instances; don't create, receive |
| What is an Observable? | Stream of async data from RxJS; use `.subscribe()` to listen |
| What are Signals? | Angular's modern reactive state — auto-updates UI when value changes |
| Can Angular access MongoDB directly? | NO — Angular → Express → Mongoose → MongoDB |
| What is GET? | Read/fetch data — no body, nothing changes |
| What is POST? | Create new data — sends body, creates resource |
| What is PUT? | Replace entire resource — needs full body |
| What is PATCH? | Update part of a resource — partial body |
| What is DELETE? | Remove a resource |
| What is `req.body`? | Data sent in POST/PUT/PATCH request body; needs `express.json()` middleware |
| What is `req.params`? | Data from URL path like `/api/pizzas/:id` |
| What is `req.query`? | Data from URL query string like `?page=1&limit=20` |

---

## 🔥 MONGODB METHODS CHEAT SHEET

```
find()                    → get ALL documents
find({ type: 'veg' })    → get filtered documents
findOne({ name: 'X' })   → get FIRST matching document
findById(id)             → get by _id

create({...})            → insert one document
insertMany([...])        → insert multiple

findByIdAndUpdate(id, {price: 350}, { new: true })  → update + return new
updateOne({name:'X'}, {price:350})   → update first match
updateMany({type:'veg'},{price:300}) → update all matches

findByIdAndDelete(id)    → delete by _id
deleteOne({ name: 'X' }) → delete first match
deleteMany({ type:'X' }) → delete all matches

// MODIFIERS (chainable)
.sort({ price: 1 })      → sort ascending (−1 = descending)
.limit(20)               → max 20 results
.skip(20)                → skip first 20 (page 2)
.select('name price')    → only return these fields
```

---

## ⚡ 15,000 RECORDS ANSWER (KEY QUESTION)

> *"Fetching 15,000 records all at once is bad — it overloads memory, network, and the browser. The solution is **pagination** using `.skip()` and `.limit()`.*
> *For example: `.find().skip(0).limit(20)` for page 1, `.skip(20).limit(20)` for page 2.*
> *This way you only load 20 records at a time, keeping the app fast and efficient."*

---


### ❓ If Express is stopped → Angular gets data?
**NO.** HTTP requests to port 3000 fail. Error callback fires. "Could not load pizzas" shown.

### ❓ If MongoDB is stopped → Angular gets data?
**NO.** Express runs, but `Pizza.find()` fails. Catch block returns error to Angular.

### ❓ If you stop both → Angular gets data?
**NO for new data.** But already-loaded data stays visible until page refresh.

### ❓ Change port number — which files?
- **Backend:** `.env` file (`PORT=XXXX`)
- **Frontend:** `pizza.service.ts` and `ingredient.service.ts` URLs

### ❓ Send empty body to API?
- GET — returns all data (body ignored)
- POST (hypothetical) — Mongoose validation fails, returns error JSON

### ❓ Can Angular directly insert into MongoDB?
**NO.** Needs to POST to Express API → Express uses Mongoose to save.

### ❓ Can we give same IDs?
- `_id` (MongoDB auto-generated): **NO, always unique**
- Custom `id` field with `unique: true`: **NO, enforced by index**
- Custom `id` field without `unique: true`: **YES, allowed**

---

## 🧠 EXPLAIN PROJECT IN 60 SECONDS

> *"My project is a full-stack pizza ordering app.
> The frontend is Angular 19 with standalone components and Signals for state management.
> The backend is Express.js running on Node.js, with MongoDB as the database accessed via Mongoose.
> 
> When a user browses pizzas, Angular makes a GET request to `/api/pizzas`. Express queries MongoDB using `Pizza.find()` and returns JSON. Angular stores this in a Signal, and the UI automatically re-renders.
> 
> The cart is managed entirely client-side using a singleton `CartService` with Signals — shared across all pages without API calls.
> 
> The architecture follows a clean separation: Angular handles presentation, Express handles API logic, MongoDB handles persistence."*

---

## 💬 HANDLING TOUGH QUESTIONS

**"Did you use Copilot?"**
> *"Yes, for autocomplete and boilerplate. But the architecture, data models, and how the components work together — that was my design."*

**"What was the hardest part?"**
> *"Learning Angular Signals — they're a new feature in Angular 16+. Understanding `computed()` vs regular functions and when to use `set()` vs `update()` took time. Also the CORS error on first run."*

**"What would you improve?"**
> *"Add JWT authentication, a POST /api/orders endpoint, use environment variables for API URLs instead of hardcoding localhost:3000, and add `takeUntilDestroyed()` for proper subscription cleanup."*

---

## 📂 YOUR FILES AT A GLANCE

```
VIVA_ANSWERS_PROJECT.md   → Project flow, difficulties, if/when scenarios
VIVA_ANSWERS_BACKEND.md   → Node, Express, middleware, req.body, app.listen
VIVA_ANSWERS_MONGODB.md   → Collections, NoSQL vs SQL, insertion, queries
VIVA_ANSWERS_ANGULAR.md   → DI, Observables, Services, Two-way binding, Angular vs React
```

---

## 🎯 YOU'VE GOT THIS! 🍕🚀
