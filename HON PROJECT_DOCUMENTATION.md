# Online Shopping Project - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Detailed Architecture](#detailed-architecture)
5. [File-by-File Explanation](#file-by-file-explanation)
6. [How It Works - Data Flow](#how-it-works---data-flow)
7. [Setup & Running](#setup--running)

---

## 🎯 Project Overview

This is a **Full-Stack Online Shopping Application** that allows users to:
- **Add new products** to a database
- **Display/View all products** from the database

**Architecture:** 
- **Frontend:** Angular 21 (Modern Standalone Components)
- **Backend:** Node.js + Express
- **Database:** MongoDB

The application follows a **Client-Server Model** with:
- **Client (Frontend):** Runs on `localhost:4200` - handles UI and user interactions
- **Server (Backend):** Runs on `localhost:7000` - handles data operations and database interactions

---

## 📁 Project Structure

```
Online Shopping Project/
│
├── client/                          (Angular Frontend Application)
│   ├── package.json                (NPM dependencies for frontend)
│   ├── angular.json                (Angular configuration)
│   ├── tsconfig.json               (TypeScript configuration)
│   ├── tsconfig.app.json           (App-specific TypeScript config)
│   ├── tsconfig.spec.json          (Testing TypeScript config)
│   ├── README.md
│   │
│   └── src/                        (Source code)
│       ├── index.html              (Main HTML entry point)
│       ├── main.ts                 (Application bootstrap/startup)
│       ├── styles.css              (Global styles)
│       │
│       └── app/                    (Angular Application Root)
│           ├── app.ts              (Root component)
│           ├── app.html            (Root template with navigation)
│           ├── app.css             (Root component styling)
│           ├── app.config.ts       (Angular app configuration)
│           ├── app.routes.ts       (Route definitions)
│           │
│           ├── components/         (Reusable UI components)
│           │   ├── add-product/    (Add Product Component)
│           │   │   ├── add-product.ts       (Component logic)
│           │   │   ├── add-product.html     (Form template)
│           │   │   └── add-product.css      (Component styles)
│           │   │
│           │   └── display-product/  (Display Products Component)
│           │       ├── display-product.ts   (Component logic)
│           │       ├── display-product.html (Table template)
│           │       └── display-product.css  (Component styles)
│           │
│           └── services/           (Business Logic Layer)
│               └── product.service.ts (Service for API calls)
│
└── server/                         (Node.js Backend Application)
    ├── package.json               (NPM dependencies for backend)
    ├── server.js                  (Express server & API endpoints)
    └── README.md
```

---

## 🛠 Technology Stack

### **Frontend (Client)**
| Technology | Version | Purpose |
|---|---|---|
| **Angular** | ^21.2.0 | Frontend framework for building UI |
| **TypeScript** | ~5.9.2 | Type-safe JavaScript |
| **RxJS** | ~7.8.0 | Reactive programming library |
| **Angular Forms** | ^21.2.0 | Form validation & handling |
| **Angular Router** | ^21.2.0 | Client-side routing |
| **Angular Common** | ^21.2.0 | Common Angular utilities |

### **Backend (Server)**
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | Latest | JavaScript runtime for backend |
| **Express** | ^5.2.1 | Web framework for API routes |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | ^9.9.3 | MongoDB object modeling |
| **CORS** | ^2.8.6 | Cross-Origin Resource Sharing |

### **Development Tools**
| Tool | Purpose |
|---|---|
| **npm** | Package manager |
| **Angular CLI** | Command-line interface for Angular |
| **TypeScript Compiler** | Converts TypeScript to JavaScript |
| **Prettier** | Code formatting |

---

## 🏗 Detailed Architecture

### **System Architecture Diagram**

```
┌──────────────────────────────────────────────────────────────────┐
│                      USER'S BROWSER                              │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │           Angular Frontend (localhost:4200)               │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  Navigation Component (app.html)                    │ │  │
│  │  │  - Add Product Link                                 │ │  │
│  │  │  - Display Product Link                             │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                         ↓                                  │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  Router-Outlet (Shows active component)            │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │   ↙                                          ↘             │  │
│  │  AddProductComponent              DisplayProductComponent │  │
│  │  - Product Form                    - Product Table        │  │
│  │  - Form Validation                 - List of Products    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                         │                      │                  │
│                         ↓                      ↓                  │
│                 HTTP POST Request      HTTP GET Request           │
│                 (Submit Form)          (Fetch Products)           │
└──────────────────────────────────────────────────────────────────┘
                         │                      │
          ┌──────────────┴──────────────────────┘
          │
          ↓
┌──────────────────────────────────────────────────────────────────┐
│       Express.js Server Backend (localhost:7000)                 │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  CORS Middleware - Allow requests from frontend           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                         ↓                                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │         API Routes & Controllers                          │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │ GET /getallproducts                                │ │  │
│  │  │ - Fetch all products from database                │ │  │
│  │  │ - Sort by product ID                              │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │ POST /addproduct                                   │ │  │
│  │  │ - Receive product data from frontend               │ │  │
│  │  │ - Validate all required fields                     │ │  │
│  │  │ - Save to database                                 │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                         ↓                                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Mongoose (ODM - Object Document Mapper)                │  │
│  │  - Product Schema Definition                            │  │
│  │  - Data Validation Rules                                │  │
│  └────────────────────────────────────────────────────────────┘  │
│                         ↓                                         │
└──────────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌──────────────────────────────────────────────────────────────────┐
│              MongoDB Database                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Database: admin                                          │  │
│  │  Collection: products                                     │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  Product Document 1                                │ │  │
│  │  │  {                                                 │ │  │
│  │  │    _id: ObjectId,                                 │ │  │
│  │  │    pid: 1,                                        │ │  │
│  │  │    pname: "Laptop",                               │ │  │
│  │  │    price: 50000,                                  │ │  │
│  │  │    brand: "Dell"                                  │ │  │
│  │  │  }                                                 │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  Product Document 2                                │ │  │
│  │  │  {                                                 │ │  │
│  │  │    _id: ObjectId,                                 │ │  │
│  │  │    pid: 2,                                        │ │  │
│  │  │    pname: "Mouse",                                │ │  │
│  │  │    price: 500,                                    │ │  │
│  │  │    brand: "Logitech"                              │ │  │
│  │  │  }                                                 │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📄 File-by-File Explanation

### **Backend Files**

#### **`server/package.json`**
**Purpose:** Lists all dependencies and scripts for the backend

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",           // Run the server
    "test": "node --check server.js"     // Check syntax
  },
  "type": "commonjs",                    // Use CommonJS modules
  "dependencies": {
    "cors": "^2.8.6",                   // Enable cross-origin requests
    "express": "^5.2.1",                // Web framework
    "mongoose": "^9.9.3"                // MongoDB connection
  }
}
```

**Key Concepts:**
- `"scripts"` - Custom commands to run the project
- `"dependencies"` - External packages required to run the app
- `"type": "commonjs"` - Tells Node to use CommonJS syntax (`require()` instead of `import`)

---

#### **`server/server.js`**
**Purpose:** Main backend server file - handles API endpoints and database

**Line-by-Line Breakdown:**

```javascript
// Import required modules
const express = require('express');          // Web framework
const mongoose = require('mongoose');        // Database connection
const cors = require('cors');                // Allow cross-origin requests

const app = express();                       // Create Express app
const PORT = 7000;                           // Server port
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/admin';
// MongoDB connection string - can be set via environment variable or default to local

// Middleware - Process requests before they reach routes
app.use(cors());                   // Allow frontend to make requests
app.use(express.json());           // Parse JSON request bodies

// Define Product Schema - Structure of a product in MongoDB
const productSchema = new mongoose.Schema({
  pid: { type: Number, required: true },     // Product ID (mandatory)
  pname: { type: String, required: true, trim: true },  // Name (mandatory, remove spaces)
  price: { type: Number, required: true, min: 0 },      // Price (mandatory, must be >= 0)
  brand: { type: String, required: true, trim: true }   // Brand (mandatory, remove spaces)
}, { versionKey: false });                    // Don't add version field

// Create Product model from schema
const Product = mongoose.model('products', productSchema);

// ============ API ENDPOINT 1: GET ALL PRODUCTS ============
app.get('/getallproducts', async (req, res) => {
  try {
    // Fetch all products from MongoDB, sorted by pid in ascending order
    const products = await Product.find().sort({ pid: 1 });
    // Send products back to frontend with status 200 (OK)
    res.status(200).json(products);
  } catch (error) {
    // If something goes wrong, send error status 500
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// ============ API ENDPOINT 2: ADD NEW PRODUCT ============
app.post('/addproduct', async (req, res) => {
  try {
    // Destructure data from request body
    const { pid, pname, price, brand } = req.body;
    
    // Validate all fields are provided and not empty
    if (!pid || !pname?.trim() || price === undefined || !brand?.trim()) {
      // Send error if validation fails
      return res.status(400).json({ message: 'All product fields are required' });
    }
    
    // Create new product in database
    const product = await Product.create({ 
      pid: Number(pid),           // Ensure pid is a number
      pname, 
      price: Number(price),       // Ensure price is a number
      brand 
    });
    
    // Send success response with created product
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    // Send error status 500 if something goes wrong
    res.status(500).json({ message: 'Error adding product' });
  }
});

// ============ CONNECT TO DATABASE & START SERVER ============
mongoose.connect(mongoUrl)
  .then(() => {
    // Connection successful - start the server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // Connection failed
    console.error('MongoDB connection error:', error.message);
  });
```

**Key HTTP Methods Explained:**
- **GET** - Retrieve data from server
- **POST** - Send data to server and create a new resource
- **Status Codes:**
  - `200` = Success (OK)
  - `201` = Success (Created)
  - `400` = Bad Request (Invalid data)
  - `500` = Server Error

---

### **Frontend Files**

#### **`client/package.json`**
**Purpose:** Lists frontend dependencies and build scripts

**Key Scripts:**
- `npm start` → Start development server on `localhost:4200`
- `npm build` → Create optimized production build
- `npm test` → Run unit tests

**Key Dependencies:**
- `@angular/*` → Angular framework packages
- `rxjs` → Reactive programming (Observables)
- `@angular/forms` → Form handling and validation

---

#### **`client/angular.json`**
**Purpose:** Angular-specific configuration

**Key Configuration:**
```json
{
  "projects": {
    "online-shopping": {
      "sourceRoot": "src",           // Where source code lives
      "prefix": "app",               // Component selector prefix
      "architect": {
        "build": {
          "options": {
            "browser": "src/main.ts", // Entry point
            "styles": ["src/styles.css"]  // Global styles
          }
        },
        "serve": {
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
```

---

#### **`client/src/index.html`**
**Purpose:** Main HTML file that loads in the browser

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>OnlineShopping</title>           <!-- Browser tab title -->
  <base href="/">                        <!-- Base URL for routing -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>                 <!-- Angular app mounts here -->
</body>
</html>
```

**How It Works:**
1. Browser loads `index.html`
2. Angular bootstrap code (from `main.ts`) runs
3. Angular renders the `<app-root>` component
4. Application starts!

---

#### **`client/src/main.ts`**
**Purpose:** Bootstrap/startup file - initializes the Angular application

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Start the Angular application
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

**What It Does:**
1. Imports the root `App` component
2. Imports application configuration (`appConfig`)
3. Bootstraps (starts) the Angular app with the config
4. Catches any errors during startup

---

#### **`client/src/styles.css`**
**Purpose:** Global CSS that applies to entire application

```css
* {
  box-sizing: border-box;  /* Include padding/border in element width */
}

body {
  margin: 0;               /* Remove default body margin */
  min-width: 320px;        /* Responsive design minimum width */
}

button, input {
  font: inherit;           /* Buttons/inputs inherit font from body */
}
```

---

#### **`client/src/app/app.config.ts`**
**Purpose:** Configure Angular application

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),  // Listen for global errors
    provideRouter(routes),                 // Enable routing
    provideHttpClient()                    // Enable HTTP requests
  ]
};
```

**Key Providers:**
- **provideBrowserGlobalErrorListeners** - Catches JavaScript errors
- **provideRouter** - Sets up routing between components
- **provideHttpClient** - Enables HTTP requests to backend

---

#### **`client/src/app/app.routes.ts`**
**Purpose:** Define all routes (navigation paths) in the application

```typescript
import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product';
import { DisplayProductComponent } from './components/display-product/display-product';

export const routes: Routes = [
  // When user goes to /addProduct, show AddProductComponent
  { path: 'addProduct', component: AddProductComponent },
  
  // When user goes to /displayProduct, show DisplayProductComponent
  { path: 'displayProduct', component: DisplayProductComponent },
  
  // Default route - if no path specified, go to addProduct
  { path: '', redirectTo: 'addProduct', pathMatch: 'full' },
  
  // Wildcard - any unknown route redirects to addProduct
  { path: '**', redirectTo: 'addProduct' }
];
```

**Route Configuration:**
- `path` - The URL path
- `component` - Which component to display
- `redirectTo` - Where to redirect
- `pathMatch: 'full'` - Match entire URL, not just the beginning

---

#### **`client/src/app/app.ts`**
**Purpose:** Root component - main container for entire app

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',           // HTML tag name <app-root></app-root>
  imports: [RouterLink, RouterLinkActive, RouterOutlet],  // Import routing utilities
  templateUrl: './app.html',      // HTML template file
  styleUrl: './app.css'           // CSS styles
})
export class App {
  // No logic needed - just a container component
}
```

**Component Breakdown:**
- `selector` - How this component is used in HTML
- `imports` - Other components/modules this component uses
- `templateUrl` - External HTML file for this component
- `styleUrl` - External CSS file for this component

---

#### **`client/src/app/app.html`**
**Purpose:** Root template - navigation and content area

```html
<div class="main-container">
  <!-- Navigation Bar -->
  <nav class="nav-bar" aria-label="Product management">
    <!-- Link to Add Product page -->
    <a routerLink="/addProduct" routerLinkActive="active">Add product</a>
    
    <!-- Link to Display Product page -->
    <a routerLink="/displayProduct" routerLinkActive="active">Display product</a>
  </nav>

  <!-- Main Content Area -->
  <main class="content-box">
    <!-- This is where the router displays components based on current route -->
    <router-outlet></router-outlet>
  </main>
</div>
```

**Key Elements:**
- `<nav>` - Navigation menu for switching between pages
- `routerLink` - Navigates to a route when clicked
- `routerLinkActive="active"` - Adds 'active' class to current link
- `<router-outlet>` - Placeholder where Angular inserts the current component

---

#### **`client/src/app/app.css`**
**Purpose:** Styling for root component (navigation and layout)

---

#### **`client/src/app/services/product.service.ts`**
**Purpose:** Service layer - handles all backend API communication

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Product data structure
export interface Product {
  _id?: string;          // MongoDB auto-generated ID (optional)
  pid: number;           // Product ID
  pname: string;         // Product name
  price: number;         // Product price
  brand: string;         // Product brand
}

// @Injectable - This service can be injected into components
// { providedIn: 'root' } - Service is available app-wide
@Injectable({ providedIn: 'root' })
export class ProductService {
  // Inject HttpClient for making HTTP requests
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7000';

  // Method to fetch all products from backend
  getAllProducts(): Observable<Product[]> {
    // Makes GET request to backend
    return this.http.get<Product[]>(`${this.baseUrl}/getallproducts`);
  }

  // Method to add a new product
  addProduct(product: Product): Observable<{ message: string; product: Product }> {
    // Makes POST request to backend with product data
    return this.http.post<{ message: string; product: Product }>(
      `${this.baseUrl}/addproduct`, 
      product
    );
  }
}
```

**Key Concepts:**
- **Injectable** - Marks class as a service that can be injected
- **Observable** - Represents a stream of data that can be subscribed to
- **HTTP Methods** - `get()` for fetching, `post()` for creating
- **Type Safety** - Generic `<Product[]>` defines response type

---

#### **`client/src/app/components/add-product/add-product.ts`**
**Purpose:** Component for adding new products

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],           // Import forms module for [(ngModel)]
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProductComponent {
  // Inject ProductService
  private readonly productService = inject(ProductService);
  
  // Product object - binds to form fields
  product: Product = { pid: 0, pname: '', price: 0, brand: '' };
  
  // Track if form is being submitted (prevent double-submit)
  isSubmitting = false;

  // Called when form is submitted
  onSubmit(form: NgForm): void {
    // Check if form is valid and not already submitting
    if (form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    
    // Call service to add product
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        // Success - show alert
        alert('Product added successfully.');
        
        // Reset form to empty
        form.resetForm({ pid: 0, pname: '', price: 0, brand: '' });
        this.isSubmitting = false;
      },
      error: () => {
        // Error - show error message
        alert('Unable to add the product. Check that the server is running.');
        this.isSubmitting = false;
      }
    });
  }
}
```

**Flow:**
1. User fills form with product data
2. User clicks "Add product" button
3. `onSubmit()` is called
4. Service makes POST request to backend
5. Backend saves to database
6. Success/Error alert is shown
7. Form is reset if successful

**Important:**
- `isSubmitting` flag prevents user from clicking submit multiple times
- `.subscribe()` listens for response from backend
- `next` = Success handler
- `error` = Error handler

---

#### **`client/src/app/components/add-product/add-product.html`**
**Purpose:** Form template for adding products

```html
<!-- Form with template reference variable -->
<form #productForm="ngForm" (ngSubmit)="onSubmit(productForm)" novalidate>
  
  <!-- ID Field -->
  <div class="form-group">
    <label>ID</label>
    <input 
      type="number" 
      name="pid" 
      [(ngModel)]="product.pid"      <!-- Two-way binding -->
      required                        <!-- Field is required -->
      min="1"                          <!-- Minimum value is 1 -->
      #pid="ngModel"                  <!-- Template reference -->
    />
    <!-- Show error message if field is invalid and touched -->
    @if (pid.invalid && pid.touched) { <small>Enter a valid ID.</small> }
  </div>

  <!-- Product Name Field -->
  <div class="form-group">
    <label>Name</label>
    <input 
      type="text" 
      name="pname" 
      [(ngModel)]="product.pname"
      required
      minlength="2"                   <!-- At least 2 characters -->
      #pname="ngModel"
    />
    @if (pname.invalid && pname.touched) { <small>Enter a product name.</small> }
  </div>

  <!-- Price Field -->
  <div class="form-group">
    <label>Price</label>
    <input 
      type="number" 
      name="price" 
      [(ngModel)]="product.price"
      required
      min="1"                          <!-- Price must be at least 1 -->
      #price="ngModel"
    />
    @if (price.invalid && price.touched) { <small>Enter a price.</small> }
  </div>

  <!-- Brand Field -->
  <div class="form-group">
    <label>Brand</label>
    <input 
      type="text" 
      name="brand" 
      [(ngModel)]="product.brand"
      required
      #brand="ngModel"
    />
    @if (brand.invalid && brand.touched) { <small>Enter a brand.</small> }
  </div>

  <!-- Submit Button -->
  <div class="form-actions">
    <button 
      type="submit" 
      [disabled]="productForm.invalid || isSubmitting"  <!-- Disable if invalid or submitting -->
    >
      <!-- Show different text based on isSubmitting state -->
      {{ isSubmitting ? 'Saving...' : 'Add product' }}
    </button>
  </div>
</form>
```

**Form Concepts:**
- `[(ngModel)]` - Two-way binding (form ↔ component)
- `required` - Field must have a value
- `min`, `minlength` - Validation rules
- `#pid="ngModel"` - Get access to field's validation state
- `@if` - Show error messages conditionally
- `[disabled]` - Property binding to disable button

---

#### **`client/src/app/components/add-product/add-product.css`**
**Purpose:** Styling for add product form

```css
.form-group {
  display: flex;         /* Side-by-side layout */
  align-items: center;   /* Vertically center */
  margin-bottom: 25px;
}

label {
  width: 80px;           /* Fixed width for labels */
  font-weight: bold;
}

input {
  flex: 1;               /* Take remaining space */
  height: 28px;
  padding: 5px;
}

small {
  display: block;        /* Full width error message */
  margin-top: 4px;
  color: #a13f3f;        /* Red error color */
  font-size: 12px;
}

.form-actions {
  margin-top: 16px;
}

button {
  border: 0;
  background: #2d8b53;   /* Green color */
  color: #fff;           /* White text */
  padding: 8px 16px;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;          /* Fade disabled button */
  cursor: not-allowed;
}
```

---

#### **`client/src/app/components/display-product/display-product.ts`**
**Purpose:** Component for displaying all products in a table

```typescript
import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-display-product',
  imports: [DecimalPipe],           // For formatting numbers
  templateUrl: './display-product.html',
  styleUrl: './display-product.css'
})
export class DisplayProductComponent {
  // Inject ProductService
  private readonly productService = inject(ProductService);
  
  // Angular Signal - reactive state management
  products = signal<Product[]>([]);    // List of products
  isLoading = signal(true);            // Loading state
  errorMessage = signal('');           // Error message

  // Constructor - runs when component is created
  constructor() {
    this.fetchProducts();  // Load products when component starts
  }

  // Method to fetch products from backend
  fetchProducts(): void {
    this.isLoading.set(true);  // Show loading state
    
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        // Success - set products and hide loading
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: () => {
        // Error - show error message
        this.errorMessage.set('Unable to load products. Check that the server is running.');
        this.isLoading.set(false);
      }
    });
  }
}
```

**Signal Explanation:**
- Angular's modern way to manage reactive state
- `.set()` - Update the value
- `.set()` - Read the value in template
- Changes automatically trigger template re-render

---

#### **`client/src/app/components/display-product/display-product.html`**
**Purpose:** Display products in a table format

```html
<!-- Show loading state -->
@if (isLoading()) { <p class="state-message">Loading...</p> }

<!-- Show error message -->
@if (errorMessage()) { <p class="state-message error">{{ errorMessage() }}</p> }

<!-- Show "no products" message -->
@if (!isLoading() && !errorMessage() && products().length === 0) { 
  <p class="state-message">No products.</p> 
}

<!-- Show table if products exist -->
@if (!isLoading() && !errorMessage() && products().length > 0) {
<div class="table-wrap">
  <table>
    <!-- Table Header -->
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Brand</th>
      </tr>
    </thead>
    
    <!-- Table Body -->
    <tbody>
      <!-- Loop through each product -->
      @for (product of products(); track product._id || product.pid) {
      <tr>
        <td>{{ product.pid }}</td>
        <td>{{ product.pname }}</td>
        <!-- Format price with number pipe -->
        <td>{{ product.price | number: '1.0-0' }}</td>
        <td>{{ product.brand }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
}
```

**Template Syntax:**
- `@if` - Conditional rendering
- `@for ... track` - Loop through array (track improves performance)
- `{{ }}` - Interpolation (display variable value)
- `| number: '1.0-0'` - Pipe to format number (1 integer digit, 0 decimals)

---

#### **`client/src/app/components/display-product/display-product.css`**
**Purpose:** Styling for products table

```css
.table-wrap {
  min-height: 350px;     /* Minimum height for table container */
  padding: 5px;
}

table {
  width: 100%;           /* Full width */
  border-collapse: collapse;  /* Remove space between borders */
  text-align: left;      /* Left-align text */
}

th {
  text-align: left;
  padding: 15px;         /* Header padding */
}

td {
  padding: 12px 15px;    /* Cell padding */
}

tr:nth-child(even) {
  background: #f2f2f2;   /* Alternate row colors */
}

.state-message {
  margin-top: 10px;
  color: #555;           /* Gray text */
}

.state-message.error {
  color: #a13f3f;        /* Red for error */
}
```

---

## 🔄 How It Works - Data Flow

### **Scenario 1: User Adds a Product**

```
1. User opens http://localhost:4200
   ↓
2. Angular loads, navigates to /addProduct (default route)
   ↓
3. AddProductComponent is displayed with empty form
   ↓
4. User fills form:
   - ID: 1
   - Name: Laptop
   - Price: 50000
   - Brand: Dell
   ↓
5. User clicks "Add product" button
   ↓
6. onSubmit() method is called
   ↓
7. Validation runs:
   - Is form valid? YES
   - Is already submitting? NO
   ↓
8. isSubmitting = true (prevents double-submit)
   ↓
9. productService.addProduct(product) sends:
   POST http://localhost:7000/addproduct
   Body: { pid: 1, pname: "Laptop", price: 50000, brand: "Dell" }
   ↓
10. Backend receives request
    ↓
11. Validates all fields are present ✓
    ↓
12. Creates new Product document in MongoDB:
    {
      _id: ObjectId(...),
      pid: 1,
      pname: "Laptop",
      price: 50000,
      brand: "Dell"
    }
    ↓
13. Sends response: { message: "Product added successfully", product: {...} }
    ↓
14. Frontend receives response in .subscribe() next handler
    ↓
15. Shows alert: "Product added successfully."
    ↓
16. Clears form: { pid: 0, pname: '', price: 0, brand: '' }
    ↓
17. Sets isSubmitting = false (button enabled again)
```

### **Scenario 2: User Views All Products**

```
1. User clicks "Display product" link in navigation
   ↓
2. Router changes route to /displayProduct
   ↓
3. DisplayProductComponent is displayed
   ↓
4. Component constructor runs
   ↓
5. fetchProducts() is called
   ↓
6. isLoading = true (show "Loading..." message)
   ↓
7. productService.getAllProducts() sends:
   GET http://localhost:7000/getallproducts
   ↓
8. Backend receives GET request
   ↓
9. Queries MongoDB:
   db.products.find().sort({ pid: 1 })
   ↓
10. MongoDB returns all products sorted by ID
    ↓
11. Backend sends response: [product1, product2, product3, ...]
    ↓
12. Frontend receives response in .subscribe() next handler
    ↓
13. products.set([...]) - stores products in signal
    ↓
14. isLoading.set(false) - hide loading message
    ↓
15. Template checks: products().length > 0 → TRUE
    ↓
16. @for loop renders table row for each product
    ↓
17. User sees table with all products
```

---

## 🚀 Setup & Running

### **Prerequisites**
- **Node.js** (includes npm)
- **MongoDB** (running locally or connection string)
- **VS Code** (optional, for development)

### **Backend Setup**

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Start the server
npm start
# Server will run at http://localhost:7000
```

**Expected Output:**
```
Server running at http://localhost:7000
```

### **Frontend Setup**

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start development server
npm start
# Application will run at http://localhost:4200
# Opens automatically in browser
```

**Expected Output:**
```
✔ Compiled successfully.
⠋ Vite v... ready in ... ms
➜  Local: http://localhost:4200/
```

### **MongoDB Setup**

**Option 1: Local MongoDB (if installed)**
```bash
# On Windows (in Command Prompt as Administrator)
mongod

# On Mac/Linux
mongod
```

**Option 2: Connection String**
- Default: `mongodb://127.0.0.1:27017/admin`
- Can be changed via `MONGO_URL` environment variable

---

## 📚 Key Angular Concepts Used

| Concept | Where Used | Purpose |
|---|---|---|
| **Components** | `app.ts`, `add-product.ts`, `display-product.ts` | Reusable UI building blocks |
| **Services** | `product.service.ts` | Business logic and API communication |
| **Dependency Injection** | `inject()` in components | Get instances of services |
| **Routing** | `app.routes.ts`, `app.html` | Navigate between pages |
| **Forms** | `add-product.html`, `FormsModule` | Handle user input |
| **Two-way Binding** | `[(ngModel)]` | Sync form with component |
| **Signals** | `signal()` in display-product | Reactive state management |
| **Observables** | `.subscribe()` | Async data streams |
| **Pipes** | `DecimalPipe`, `number` pipe | Format data in templates |
| **Directives** | `@if`, `@for` | Template logic |

---

## 🎓 Questions You Should Be Able to Answer

1. **What are the main components of this app?**
   - Add Product Component, Display Product Component, and Root Component

2. **How does data flow from frontend to backend?**
   - Component → Service → HTTP POST → Backend → MongoDB

3. **What is the purpose of the ProductService?**
   - Centralized API communication and data management

4. **How are routes configured?**
   - In `app.routes.ts` with path, component pairs

5. **What validation happens in the form?**
   - Required fields, minimum values, string lengths

6. **Why is the `isSubmitting` flag important?**
   - Prevents users from submitting the form multiple times simultaneously

7. **What is a Signal in Angular?**
   - Modern way to create reactive state that triggers re-renders when changed

8. **How does MongoDB schema work?**
   - Defines structure and validation rules for documents

9. **What does CORS do?**
   - Allows cross-origin requests from frontend to backend

10. **How is the app initialized?**
    - `main.ts` bootstrap → loads `app.config.ts` → renders `App` component

---

**Good luck with your viva! You now have a complete understanding of this project! 🎉**
