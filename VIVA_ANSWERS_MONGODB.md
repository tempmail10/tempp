# 🍕 VIVA ANSWERS — MongoDB & Database

---

## Q1. What is a MongoDB Collection?

> **Answer:**

A **collection** in MongoDB is equivalent to a **table** in a relational database (like MySQL). It holds a group of related **documents**.

| MongoDB | Relational DB |
|---------|---------------|
| Database | Database |
| **Collection** | **Table** |
| Document | Row/Record |
| Field | Column |

In this project:
- `pizzas` collection → stores all pizza menu items
- `ingredients` collection → stores all available toppings

Each document in a collection is a **JSON-like object**:
```json
{
  "_id": "507f1f77...",
  "name": "Margherita",
  "price": 299,
  "type": "veg"
}
```

---

## Q2. What is the difference between MongoDB and a Relational Database?

> **Answer:**

| Feature | MongoDB (NoSQL) | Relational DB (MySQL/PostgreSQL) |
|---------|----------------|----------------------------------|
| **Data format** | JSON documents | Tables with rows & columns |
| **Schema** | Flexible (schema-less) | Fixed schema |
| **Relationships** | Embedding or referencing | Foreign keys & JOINs |
| **Scaling** | Horizontal (add more servers) | Vertical (bigger server) |
| **Query language** | MongoDB Query Language (MQL) | SQL |
| **Best for** | Unstructured/hierarchical data | Structured, relational data |

**Example — Pizza with ingredients:**

**Relational DB:**
- `pizzas` table: id, name, price
- `ingredients` table: id, name
- `pizza_ingredients` JOIN table: pizza_id, ingredient_id
- Need 3 tables + JOIN query

**MongoDB:**
```json
{
  "name": "Margherita",
  "price": 299,
  "ingredients": [
    { "id": "1", "iname": "Tomato" },
    { "id": "2", "iname": "Mozzarella" }
  ]
}
```
- Single document, no JOINs needed

> **Why I chose MongoDB:** Pizza data is hierarchical (pizza has ingredients, ingredients have prices). MongoDB's document model fits perfectly without needing complex JOINs.

---

## Q3. Is there any relationship between MongoDB Collections and Relational Database tables?

> **Answer:**

**Conceptually yes — functionally very different.**

- Both are ways to **organize and group similar data**
- A collection ≈ a table (both store multiple records of the same entity)

**Key differences:**
- In a relational table, every row has the **same columns** (strict schema)
- In a MongoDB collection, documents can have **different fields** (flexible schema)
- Relational tables use **foreign keys** for relationships; MongoDB uses **embedding** or **$lookup** (like a JOIN)

---

## Q4. How do you create a database in MongoDB?

> **Answer:**

In MongoDB, you **don't need to explicitly create a database**. MongoDB uses **lazy creation**:

1. When you connect with a connection string that includes the DB name:
   ```
   mongodb+srv://user:pass@cluster.mongodb.net/pizzeria
   ```
2. When you first **insert a document**, MongoDB automatically creates the database and collection.

**Using MongoDB Compass or Atlas:**
- Click "Create Database"
- Provide database name and first collection name
- Start inserting documents

**Using Mongoose:**
```typescript
await mongoose.connect('mongodb+srv://.../pizzeria');
// When Pizza.create({...}) is called, 'pizzeria' DB and 'pizzas' collection are auto-created
```

---

## Q5. What happens if MongoDB is stopped?

> **Answer:**

**Sequence of events:**

1. Mongoose loses its connection to MongoDB
2. When Express tries to run `Pizza.find()`, Mongoose throws a connection error
3. The `catch` block in the route handler catches the error
4. Express returns an error JSON to Angular: `{ "message": "..." }`
5. Angular's `error` callback fires, showing "Could not load pizzas"

**The app still runs** — Express and Angular are still up. But **any DB operation fails**.

If MongoDB reconnects later, Mongoose **automatically reconnects** (it has built-in reconnection logic). No need to restart the server.

---

## Q6. How does your application communicate with MongoDB?

> **Answer:**

Through **Mongoose** (an ODM — Object Data Modeling library):

```
Angular → HTTP → Express → Mongoose → MongoDB
```

**Step 1:** Mongoose connects to MongoDB using a connection string:
```typescript
mongoose.connect(process.env.MONGO_URI);
```

**Step 2:** Mongoose models are defined (Pizza, Ingredient schemas)

**Step 3:** When a route is hit, Mongoose methods query the database:
```typescript
const pizzaMenu = await Pizza.find();       // SELECT * FROM pizzas
const one = await Pizza.findById(id);       // SELECT * WHERE _id = id
const newPizza = await Pizza.create({...}); // INSERT INTO pizzas
```

**Step 4:** Results come back as JavaScript objects

Mongoose acts as a **translator** between JavaScript objects and MongoDB documents, and also handles schema validation.

---

## Q7. How did you insert data into MongoDB?

> **Answer for this project:**

In this project, the pizza data was **seeded directly** into MongoDB Atlas (via Compass or Atlas UI) — there's no POST endpoint yet.

**Generally (how insertion works via code):**

```typescript
// 1. Define schema
const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});
const Pizza = mongoose.model('Pizza', pizzaSchema);

// 2. Create and save
const newPizza = new Pizza({ name: 'Margherita', price: 299 });
await newPizza.save();

// OR shorthand
await Pizza.create({ name: 'Margherita', price: 299 });
```

**In Postman (if POST endpoint existed):**
```
POST http://localhost:3000/api/pizzas
Content-Type: application/json
Body: { "name": "Margherita", "price": 299, "type": "veg" }
```

---

## Q8. Why are collections used?

> **Answer:**

Collections group **similar documents** together for:

1. **Organization** — All pizzas in one collection, all ingredients in another
2. **Efficient querying** — Query only the relevant collection
3. **Indexing** — Create indexes on a collection's fields for fast lookups
4. **Access control** — Set permissions at collection level

Without collections, all documents would be in one giant pile — impossible to manage.

---

## Q9. Can we give the same IDs to documents?

> **Answer:**

**For `_id` (MongoDB's default ID): NO.**

MongoDB automatically generates a unique `ObjectId` for every document's `_id` field. If you try to insert two documents with the same `_id`, MongoDB throws a **duplicate key error**.

**For custom fields (like our `id: String`):**
Only if we mark it unique:
```typescript
id: { type: String, required: true, unique: true }
```
This creates a unique index — inserting a duplicate value throws an error.

If `unique: true` is not set, MongoDB allows duplicate values in that field.

> In this project, the Pizza schema has `id: { type: String, required: true, unique: true }` — so custom IDs must also be unique.

---

## Q10. What are the common MongoDB / Mongoose query methods?

> **Answer:**

Mongoose wraps MongoDB's native driver and gives you these methods (called on a Model):

### 🔍 READ (Fetch) Methods

```typescript
// Find ALL documents in the collection
await Pizza.find();

// Find with a filter (WHERE clause equivalent)
await Pizza.find({ type: 'veg' });           // all veg pizzas
await Pizza.find({ price: { $lt: 300 } });   // price less than 300

// Find ONE document matching a filter
await Pizza.findOne({ name: 'Margherita' });

// Find by MongoDB's _id field (most common for single lookups)
await Pizza.findById('507f1f77bcf86cd799439011');

// Count documents
await Pizza.countDocuments({ type: 'veg' });
```

### ✍️ CREATE (Insert) Methods

```typescript
// Create a single document
await Pizza.create({ name: 'Margherita', price: 299, type: 'veg' });

// Create and save (two-step)
const pizza = new Pizza({ name: 'Margherita', price: 299 });
await pizza.save();

// Insert many at once
await Pizza.insertMany([
  { name: 'Margherita', price: 299 },
  { name: 'Pepperoni', price: 349 }
]);
```

### ✏️ UPDATE Methods

```typescript
// Find by id and update (returns updated document)
await Pizza.findByIdAndUpdate(id, { price: 399 }, { new: true });

// Update ONE matching document
await Pizza.updateOne({ name: 'Margherita' }, { price: 350 });

// Update MANY matching documents
await Pizza.updateMany({ type: 'veg' }, { price: 299 });
```

### 🗑️ DELETE Methods

```typescript
// Find by id and delete
await Pizza.findByIdAndDelete(id);

// Delete one matching document
await Pizza.deleteOne({ name: 'Margherita' });

// Delete all matching documents
await Pizza.deleteMany({ type: 'nonveg' });
```

### 🔧 CHAINING / MODIFIERS

```typescript
// Sort results (1 = ascending, -1 = descending)
await Pizza.find().sort({ price: 1 });        // cheapest first
await Pizza.find().sort({ price: -1 });       // most expensive first

// Limit number of results
await Pizza.find().limit(5);                  // only 5 documents

// Skip documents (for pagination)
await Pizza.find().skip(10).limit(5);         // skip first 10, get next 5

// Select specific fields only
await Pizza.find().select('name price');      // only name and price fields

// Chaining multiple modifiers
await Pizza.find({ type: 'veg' })
  .sort({ price: 1 })
  .limit(10)
  .select('name price image');
```

---

## Q11. If we have to fetch 15,000 records from MongoDB, can we do that? Is it a good idea?

> **Answer:**

**Yes, technically you CAN — but you SHOULD NOT fetch all 15,000 at once.**

**Why it's a bad idea:**
1. **Memory** — 15,000 documents loaded into server RAM at once is very heavy
2. **Network** — Sending 15,000 documents over HTTP makes the response huge and slow
3. **Browser** — Angular receiving 15,000 objects at once will freeze the UI rendering
4. **MongoDB** — Large unindexed queries take much longer to execute

**The RIGHT approach — Pagination:**

```typescript
// Backend: Accept page and limit as query params
app.get('/api/pizzas', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const pizzas = await Pizza.find()
    .skip(skip)        // skip previous pages' records
    .limit(limit);     // only return 'limit' records

  const total = await Pizza.countDocuments();

  res.json({
    pizzas,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
});
```

**Frontend calls:**
```
GET /api/pizzas?page=1&limit=20   → records 1–20
GET /api/pizzas?page=2&limit=20   → records 21–40
GET /api/pizzas?page=750&limit=20 → records 14981–15000
```

**Other strategies:**
- **Indexing** — create indexes on queried fields for faster reads
- **Search + filter** — let users narrow results first
- **Infinite scroll** — load more as user scrolls
- **Cursor-based pagination** — use last `_id` as cursor (faster than skip for huge datasets)

> *"In my project the dataset is small, but if it grew to 15,000 items I would implement pagination with `.skip()` and `.limit()`, sending 20 pizzas per page."*

---

## Q12. MongoDB Comparison Operators

> **Answer — used inside `.find()` filters:**

```typescript
// Equal (default — no operator needed)
Pizza.find({ type: 'veg' })

// Not equal
Pizza.find({ type: { $ne: 'veg' } })

// Greater than / Less than
Pizza.find({ price: { $gt: 200 } })           // price > 200
Pizza.find({ price: { $lt: 500 } })           // price < 500
Pizza.find({ price: { $gte: 200, $lte: 500 } }) // 200 <= price <= 500

// Value in array
Pizza.find({ type: { $in: ['veg', 'nonveg'] } })

// AND (implicit — multiple fields in same object)
Pizza.find({ type: 'veg', price: { $lt: 300 } })

// OR
Pizza.find({ $or: [{ type: 'veg' }, { price: { $lt: 200 } }] })

// Field exists check
Pizza.find({ image: { $exists: true } })
```

---
