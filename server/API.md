# New Market Manager — API

REST API for New Market Manager. Built with TypeScript, Express 5 and Mongoose.

- **Base URL:** `http://<host>:<PORT>/api`
- **Content type:** `application/json` (request and response)

## Table of contents
- [Authentication](#authentication)
- [Roles & permissions](#roles--permissions)
- [Conventions](#conventions)
- [Health](#health)
- [Users](#users)
- [Categories](#categories)
- [Products](#products)
- [Data models](#data-models)

---

## Authentication

Auth is JWT-based. Obtain a token from `POST /api/user/register` or `POST /api/user/login`, then send it on protected routes in the **`token`** request header:

```
token: <jwt>
```

- Tokens expire after **12 hours**.
- On every protected request the user is re-fetched from the database, so role changes and deactivations take effect **immediately** (no need to wait for token expiry).
- A deactivated user (`active: false`) is rejected on both login and protected requests.

---

## Roles & permissions

There are three roles: `admin`, `cashier`, `visit`. New users are created as **`visit`** by default; only an `admin` can change a role.

| Endpoint | Public | visit | cashier | admin |
|---|:---:|:---:|:---:|:---:|
| `POST /user/register` | ✅ | — | — | — |
| `POST /user/login` | ✅ | — | — | — |
| `PUT /user` (edit own) | | ✅ | ✅ | ✅ |
| `GET /user` (own profile) | | ✗ | ✅ | ✅ |
| `DELETE /user` (deactivate own) | | ✗ | ✅ | ✅ |
| `PATCH /user/:id` (manage user) | | ✗ | ✗ | ✅ |
| `GET /category`, `GET /product` | | ✅ | ✅ | ✅ |
| `POST/PATCH/DELETE /category` | | ✗ | ✅ | ✅ |
| `POST/PATCH/DELETE /product` | | ✗ | ✅ | ✅ |

Insufficient role → `403 { "msg": "insufficient permissions" }`.

---

## Conventions

### Success responses
- `200 OK` — resource(s) returned in the body.
- `201 Created` — resource created, returned in the body.
- `204 No Content` — success, empty body (updates / soft deletes).

### Error responses
A single, consistent envelope for every error:

```json
{ "msg": "human readable message" }
```

Validation errors add a normalized list:

```json
{
  "msg": "validation error",
  "errors": [{ "field": "username", "msg": "username is required" }]
}
```

| Status | Meaning |
|---|---|
| `400` | Bad request / validation error / business rule |
| `401` | Missing or invalid token |
| `403` | Authenticated but not allowed (role / inactive user) |
| `404` | Resource not found |
| `409` | Duplicate resource (unique constraint) |
| `500` | Unexpected server error |

### Soft delete
`DELETE` never removes documents — it sets `active: false`. Deactivated records are excluded from all `GET` lists. An `admin` can reactivate a user with `PATCH /user/:id { "active": true }`.

### Auditing
`category` and `product` carry audit fields set by the server: `createdAt`, `updatedAt` (timestamps), and `createdBy` / `updatedBy` (the acting user's id).

---

## Health

### `GET /api/health`
Public. Liveness probe.

**200**
```json
{ "status": "ok", "uptime": 123.45 }
```

---

## Users

Base path: `/api/user`

### `POST /api/user/register`
Public. Creates a user (role defaults to `visit`) and returns a token.

**Body**
| Field | Type | Rules |
|---|---|---|
| `username` | string | required, 6–32 chars, unique |
| `displayName` | string | required, 2–60 chars |
| `password` | string | required, 8–32 chars |

```json
{ "username": "juanperez", "displayName": "Juan Pérez", "password": "supersecret" }
```

**201**
```json
{
  "user": { "_id": "…", "username": "juanperez", "displayName": "Juan Pérez", "role": "visit", "active": true },
  "token": "<jwt>"
}
```
> The response never includes `passwordHash`.

---

### `POST /api/user/login`
Public. Returns a token.

**Body**
```json
{ "username": "juanperez", "password": "supersecret" }
```

**200**
```json
{ "token": "<jwt>" }
```
**Errors:** `400 login invalid` · `403 user is inactive`

---

### `GET /api/user`
Auth: `admin`, `cashier`. Returns the authenticated user's profile.

**200** → the user object (without `passwordHash`).

---

### `PUT /api/user`
Auth: any authenticated user. Edits the caller's **own** account. All fields optional; only the provided ones change.

**Body**
| Field | Type | Rules |
|---|---|---|
| `username` | string | optional, 6–32, unique, must differ from current |
| `displayName` | string | optional, 2–60 |
| `password` | string | optional, 8–32, must differ from current |

**204** No Content

---

### `DELETE /api/user`
Auth: `admin`, `cashier`. Soft-deletes (deactivates) the caller's own account.

**204** No Content

---

### `PATCH /api/user/:id`
Auth: `admin`. Manage another user's role / status.

**Body**
| Field | Type | Rules |
|---|---|---|
| `role` | string | optional, one of `cashier` \| `admin` \| `visit` |
| `active` | boolean | optional |

**200** → the updated user object.

**Business rules (self-protection):**
- An admin cannot change **their own** role → `400 an admin cannot change their own role`
- An admin cannot deactivate **themselves** → `400 an admin cannot deactivate themselves`

**Errors:** `404 user not found`

---

## Categories

Base path: `/api/category`

### `POST /api/category`
Auth: `admin`, `cashier`.

**Body**
| Field | Type | Rules |
|---|---|---|
| `section` | string | required, one of the [sections](#sections) |
| `name` | string | required, 2–60 chars, unique **within its section** |
| `subcategories` | `{ name: string, brands: string[] }[]` | optional, default `[]`; each `name` required, `brands` optional (default `[]`) |

```json
{ "section": "bebidas", "name": "Gaseosas", "subcategories": [{ "name": "colas", "brands": ["CocaCola", "Pepsi"] }, { "name": "citrus", "brands": ["Sprite"] }] }
```

**201** → the created category (with audit fields and `active: true`).
**Errors:** `409 duplicate resource` (same `section` + `name`)

---

### `GET /api/category`
Auth: `admin`, `cashier`, `visit`. Lists all **active** categories.

**200** → array of categories.

---

### `PATCH /api/category/:id`
Auth: `admin`, `cashier`. All fields optional.

**Body:** same fields as create (`section?`, `name?`, `subcategories?`).

**200** → the updated category.
**Errors:** `404 category not found`

---

### `DELETE /api/category/:id`
Auth: `admin`, `cashier`. Soft delete.

**204** No Content · **Errors:** `404 category not found`

---

## Products

Base path: `/api/product`

### `POST /api/product`
Auth: `admin`, `cashier`. `stock` and `expiry` are optional blocks.

**Body**
```json
{
  "details": {
    "name": "Coca-Cola 1.5L",
    "brand": "CocaCola",
    "category": "bebidas",
    "subcategory": "colas",
    "barcodes": ["7790895000001"],
    "size": 1.5,
    "sizeUnit": "l",
    "tags": ["retornable"]
  },
  "sell": {
    "cost": 800,
    "salePrice": 1200,
    "promotions": [{ "minQuantity": 6, "pricePerUnit": 1100 }],
    "weighable": false
  },
  "stock": {
    "quantity": 40,
    "alerts": { "enabled": true, "warning": 20, "low": 10, "critical": 5 }
  },
  "expiry": {
    "batches": [{ "quantity": 40, "expirationDate": "2026-12-31T00:00:00.000Z" }]
  }
}
```

**Field rules**
| Field | Type | Rules |
|---|---|---|
| `details.name` / `brand` / `category` / `subcategory` | string | required |
| `details.size` | number | required, > 0 |
| `details.sizeUnit` | string | required, one of the [size units](#size-units) |
| `details.barcodes` | string[] | optional, **unique across active products** |
| `details.tags` | string[] | optional |
| `sell.cost` / `sell.salePrice` | number | required, ≥ 0 |
| `sell.weighable` | boolean | optional (default `false`) |
| `sell.promotions[].minQuantity` | integer | > 0 |
| `sell.promotions[].pricePerUnit` | number | ≥ 0 |
| `stock.quantity` | number | optional, ≥ 0 |
| `expiry.batches[].quantity` | number | > 0 |
| `expiry.batches[].expirationDate` | ISO-8601 date | required per batch |

> Batches are created without an `_id`; Mongoose assigns one.

**201** → the created product.
**Errors:** `409 duplicate resource` (barcode already used by an active product)

---

### `GET /api/product`
Auth: `admin`, `cashier`, `visit`. Lists all **active** products.

**200** → array of products.

---

### `PATCH /api/product/:id`
Auth: `admin`, `cashier`. Top-level **block replace**: send a block (`details`, `sell`, `stock`, `expiry`) to replace it entirely. All blocks optional; every inner field is validated as optional.

**200** → the updated product.
**Errors:** `404 product not found`

> ⚠️ Sending a partial block replaces the **whole** block. To change one field, send the complete block.

---

### `DELETE /api/product/:id`
Auth: `admin`, `cashier`. Soft delete (frees up the product's barcodes for reuse).

**204** No Content · **Errors:** `404 product not found`

---

## Data models

### User
```ts
{
  _id: string;
  username: string;
  passwordHash: string;   // never returned in responses
  role: "cashier" | "admin" | "visit";
  displayName: string;
  active: boolean;
}
```

### Category
```ts
{
  _id: string;
  section: Section;
  name: string;
  subcategories: { name: string; brands: string[] }[];
  active: boolean;
  createdAt: Date; updatedAt: Date; createdBy: string; updatedBy: string;
}
```

### Product
```ts
{
  _id: string;
  details: {
    name: string; brand: string; category: string; subcategory: string;
    barcodes: string[]; size: number; sizeUnit: SizeUnit; tags: string[];
  };
  sell: {
    cost: number; salePrice: number;
    promotions: { minQuantity: number; pricePerUnit: number }[];
    weighable: boolean;
  };
  stock?: {
    quantity: number;
    alerts: { enabled: boolean; warning: number; low: number; critical: number };
  };
  expiry?: {
    batches: { _id: string; quantity: number; expirationDate: Date; receivedAt: Date }[];
  };
  active: boolean;
  createdAt: Date; updatedAt: Date; createdBy: string; updatedBy: string;
}
```

### Sections
`almacén` · `limpieza` · `perfumería` · `lácteos` · `bebidas` · `congelados` · `bazar` · `pollería` · `fiambrería`

### Size units
`unit` · `kg` · `g` · `l` · `ml` · `m` · `oz`
