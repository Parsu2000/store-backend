# E-Commerce Backend REST API

A scalable, secure e-commerce backend built with Node.js, Express, and MongoDB. The system includes JWT role-based access control, product inventory management, and an order processing lifecycle.

---

## Tech Stack & Architecture

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB Atlas via Mongoose ODM
- **Authentication & Security:** JSON Web Tokens (JWT), Bcrypt password hashing
- **Testing:** Postman


```

store-backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── orderController.js     # Order placement & retrieval logic
│   │   ├── productController.js   # Product CRUD operations
│   │   └── userController.js      # Auth & profile management
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification & admin guard
│   ├── models/
│   │   ├── Order.js               # Order schema & references
│   │   ├── Product.js             # Product schema
│   │   └── User.js                # User schema & password hashing hook
│   ├── routes/
│   │   ├── orderRoutes.js         # Order endpoint routing
│   │   ├── productRoutes.js       # Product endpoint routing
│   │   └── userRoutes.js          # Authentication endpoint routing
│   └── server.js                  # App configuration & server entry
├── .env                           # Environment configuration
├── package.json
└── README.md

```

---

## Project Breakdown by Parts

### Part 1 — Initial Project Setup & Server Bootstrap
- Initialized Node.js environment with `package.json`.
- Configured Express server entry point (`src/server.js`) listening on port `3000`.
- Configured dynamic DNS resolution fallbacks (`dns.setServers(['8.8.8.8', '8.8.4.4'])`) for cloud cluster reliability.
- Established basic server health verification via `GET /api/status`.

### Part 2 — Database Connection & Configuration
- Set up MongoDB Atlas cluster and retrieved database connection strings.
- Implemented Mongoose connection handler in `src/config/db.js`.
- Configured `dotenv` for secure environment variable isolation (`MONGO_URI`, `PORT`, `JWT_SECRET`).

### Part 3 — Modular MVC Project Architecture
- Structured the project into modular layers: `config`, `controllers`, `models`, `routes`, and `middleware`.
- Separated business logic from route endpoints to allow horizontal scalability.

### Part 4 — User Data Model & Password Security
- Defined `User` schema in `src/models/User.js` supporting `name`, `email`, `password`, and `role` (`customer` default, `admin`).
- Implemented Mongoose pre-save middleware using `bcrypt.genSalt()` and `bcrypt.hash()` to ensure passwords are never stored in plain text.
- Added instance method `matchPassword()` for comparing client login hashes.

### Part 5 — Authentication Controllers & JWT Issuance
- Built `POST /api/users` for customer and administrator registration.
- Built `POST /api/users/login` with credentials validation and return payloads.
- Implemented `generateToken(id)` helper generating cryptographically signed JSON Web Tokens expiring in 30 days.

### Part 6 — Auth Middleware & Role-Based Route Protection
- Implemented `protect` middleware to intercept request headers, validate `Bearer <token>`, decode user IDs, and bind user profiles to `req.user`.
- Created `adminOnly` authorization guard restricting critical resources to administrative roles.
- Secured sensitive endpoints:
  - `GET /api/users/profile` (Authenticated user profile)
  - `GET /api/users` (Admin-restricted directory of all registered accounts)

### Part 7 — Product Catalog & Full CRUD Pipeline
- Created `Product` schema in `src/models/Product.js` with fields: `name`, `description`, `price`, `category`, `countInStock`, and `user` (reference).
- Configured public and private endpoints in `src/routes/productRoutes.js`:
  - `GET /api/products` — Retrieve all catalog items (populated with creator details).
  - `GET /api/products/:id` — Query individual item by identifier.
  - `POST /api/products` — Create item listing (Protected).
  - `PUT /api/products/:id` — Update listing metadata/pricing (Protected).
  - `DELETE /api/products/:id` — Remove item from database (Protected).

### Part 8 — Order Processing & Checkout System
- Designed `Order` schema in `src/models/Order.js` referencing product IDs, embedded line items, shipping address records, payment methods, and timestamps.
- Implemented checkout and retrieval logic in `src/controllers/orderController.js`:
  - `POST /api/orders` — Secure order creation tied directly to the authenticated caller's identity.
  - `GET /api/orders/myorders` — Retrieve logged-in customer's complete purchase history.
  - `GET /api/orders/:id` — Fetch detailed invoice metadata with populated user and product details.
  - `GET /api/orders` — Administrator overview of all platform orders.

---

## API Reference

### User & Authentication Routes
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users` | Public | Register new user or admin |
| `POST` | `/api/users/login` | Public | Authenticate user & retrieve JWT token |
| `GET` | `/api/users/profile` | Private | Retrieve logged-in user profile details |
| `GET` | `/api/users` | Private/Admin | Retrieve list of all users |

### Product Routes
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Retrieve all products |
| `GET` | `/api/products/:id` | Public | Retrieve single product by ID |
| `POST` | `/api/products` | Private | Create a new product entry |
| `PUT` | `/api/products/:id` | Private | Update an existing product |
| `DELETE` | `/api/products/:id` | Private | Delete a product from inventory |

### Order Routes
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Private | Place a new order with cart items |
| `GET` | `/api/orders/myorders` | Private | Retrieve orders for authenticated user |
| `GET` | `/api/orders/:id` | Private | Retrieve single order details |
| `GET` | `/api/orders` | Private/Admin | Retrieve all customer orders |

---

## Setup & Local Installation

### 1. Clone the repository
```bash
git clone [https://github.com/](https://github.com/)<your-username>/store-backend.git
cd store-backend

```

### 2. Install dependencies

```bash
npm install

```

### 3. Configure environment variables

Create a `.env` file in the root folder with:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

```

### 4. Start development server

```bash
npm run dev

```

The server will initialize on `http://localhost:3000`.

```

```
