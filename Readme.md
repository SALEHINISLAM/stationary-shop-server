# Stationery Shop Management System
A robust backend application built using Express and TypeScript to manage a stationery shop's products and orders. The system integrates MongoDB with Mongoose for efficient data management and enforces data integrity through schema validation.

## Features
### CRUD Operation
* Stationery Products
    * Create, Read, Update, and Delete products.
    * Enforce category validation using an enum (e.g., Writing, Office Supplies, Art Supplies).
* Orders:
    * Place and view orders linked to specific stationery products.

### Validation
* Mongoose schema validation for data integrity.
* Strict TypeScript types to ensure code reliability.

### Data Relationships
* Orders reference Stationery Products by ObjectId for relational data handling.

### Schema model
1. **Stationery Product Model**
   - **name** (string): The name of the product (e.g., Pen, Notebook, Eraser).
   - **brand** (string): The brand of the product (e.g., Pilot, Moleskine, Faber-Castell).
   - **price** (number): Price of the product.
   - **category** (string): The type of product, using an `enum` (e.g., Writing, Office Supplies). use `enum`, exact value (Writing, Office Supplies, Art Supplies, Educational, Technology)
   - **description** (string): A brief description of the product.
   - **quantity** (number): Quantity of the product available.
   - **inStock** (boolean): Indicates if the product is in stock.
2. **Order Model**
   - **email** (string): The email address of the customer.
   - **product** (ObjectId): The stationery product ordered. (`unused ref`) (enter the created productId from your database which product you would love to buy).
   - **quantity** (number): The quantity of the ordered product.
   - **totalPrice** (number): The total price (product price \* quantity).

---

### API Endpoints
### **1. Create a Stationery Product**

- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```

- **Response:** Success message and created product details.

```jsx
{
  "message": "Product created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}

```

---

### **2. Get All Stationery Products**

- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Response:** A list of all products with details like name, brand, price, category, etc.
- Query: A list of all products from the same category, you’ll take this as `/api/products?searchTerm=category` searchTerm can be `name`, `brand`, `category`

```jsx
{
  "message": "Products retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 15,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 200,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    },
    // ... rest data
  ]
}

```

---

### **3. Get a Specific Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific product by ID.

```jsx
{
  "message": "Product retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}

```

---

### **4. Update a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Product details to update)

```json
{
  "price": 18,
  "quantity": 180
}
```

- **Response:** Success message and updated product details.

```jsx
{
  "message": "Product updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 18,  // Price updated
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 180,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z"  // Updated timestamp
  }
}

```

---

### **5. Delete a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the product has been deleted.

```jsx
{
  "message": "Product deleted successfully",
  "status": true,
  "data": {}
}

```

---

### **6. Order a Stationery Product**

- **Endpoint:** **`/api/orders`**
- **Method:** `POST`
- **Inventory Management Logic:**
  - When an order is placed, reduce the **quantity** in the product model.
  - If the inventory quantity goes to zero, set **inStock** to `false`.
  - Handle **insufficient stock** cases by returning an appropriate error message.
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}
```

- **Response:** Success message confirming the order.

```jsx
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}

```

---

### **7. Calculate Revenue from Orders (Aggregation)**

- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`
- **Aggregation Suggestion:**
  - Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
  - Calculate the total price by multiplying the price of each product by the quantity ordered.
- **Response:** The total revenue from all orders.

```jsx
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720  // Total revenue calculated from all orders
  }
}

```

---

## Technology Used
### Backend
1. Node JS: Runtime environment.
2. Express.js: Web framework.
3. TypeScript: Ensures type safety and scalability.
### Database
1. MongoDB: NoSQL database for flexible data storage.
2. Mongoose: ODM for schema definition and data operations.

## Setup Instructions
### Prerequisites
* Node JS 
* MongoDB 
### Installation
1. Clone the Repository
```bash
git clone https://github.com/SALEHINISLAM/stationary-shop-server.git
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables: Create a .env file in the project root:
```.env
PORT=****
DATABASE_URL=***************
BCRYPT_SALT_ROUNDS=*****
```
3. Start the application:
* For development environment
```node
npm run start:dev
```
* For Production environment
```node
npm run start:prod
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

MIT License

Copyright (c) 2024 MD. Salehin Islam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.