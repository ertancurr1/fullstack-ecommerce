# Full-Stack eCommerce Application

A modern eCommerce web application built with React (frontend) and PHP with GraphQL (backend). This project demonstrates clean architecture, and OOP principles.

## 🛍️ Features

- **Product Catalog** - Browse products by category (All, Clothes, Tech)
- **Product Details** - View product images, attributes, and descriptions
- **Attribute Selection** - Choose size, color, capacity, and other product variants
- **Shopping Cart** - Add/remove items, adjust quantities, view totals
- **Quick Shop** - Add in-stock products directly from the listing page

## 🛠️ Tech Stack

### Frontend

- React 18 with TypeScript
- Vite (build tool)
- Apollo Client (GraphQL)
- React Router DOM
- SCSS for styling

### Backend

- PHP 8.2 (no frameworks)
- GraphQL (webonyx/graphql-php)
- MySQL/MariaDB
- FastRoute for routing

## 📁 Project Structure

```
fullstack-ecommerce/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Cart)
│   │   ├── graphql/          # GraphQL queries
│   │   ├── types/            # TypeScript interfaces
│   │   └── styles/           # Global styles
│   └── package.json
├── src/                      # PHP backend
│   ├── Controller/           # Request handlers
│   ├── Database/             # Database connection (Singleton)
│   ├── GraphQL/              # Schema and resolvers
│   ├── Model/                # Domain models (Abstract classes)
│   └── Repository/           # Data access layer
├── config/                   # Configuration files
├── database/                 # SQL schema and seed data
├── public/                   # Entry point (index.php)
└── vendor/                   # Composer dependencies
```

## 🚀 Getting Started

### Prerequisites

- PHP 8.0 or higher
- MySQL/MariaDB
- Node.js 18+ and npm
- Composer
- XAMPP (recommended) or similar local server

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ertancurri/fullstack-ecommerce.git
   cd fullstack-ecommerce
   ```

2. **Install PHP dependencies**

   ```bash
   composer install
   ```

3. **Create the database**

   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database named `ecommerce_db`

4. **Run database migrations**

   - Import `database/schema.sql` to create tables
   - Import `database/seed.sql` to populate sample data

5. **Configure database connection**

   - Edit `config/database.php` with your credentials:

   ```php
   return [
       'host' => 'localhost',
       'dbname' => 'ecommerce_db',
       'username' => 'root',
       'password' => ''
   ];
   ```

6. **Start the backend server**
   - Place project in `htdocs` folder (for XAMPP)
   - Access GraphQL endpoint at: `http://localhost/fullstack-ecommerce/public/graphql`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

## 📊 GraphQL API

### Queries

```graphql
# Get all categories
query {
  categories {
    name
  }
}

# Get products (optionally by category)
query {
  products(category: "clothes") {
    id
    name
    brand
    inStock
    gallery
    prices {
      amount
      currency {
        symbol
      }
    }
    attributes {
      id
      name
      type
      items {
        id
        displayValue
        value
      }
    }
  }
}

# Get single product
query {
  product(id: "huarache-x-stussy-le") {
    id
    name
    description
    # ... other fields
  }
}
```

### Mutations

```graphql
# Create an order
mutation {
  createOrder(products: ["product-id-1", "product-id-2"])
}
```

## 🏗️ Architecture Highlights

### OOP Principles

- **Abstract Classes**: `AbstractProduct` and `AbstractAttributeSet` for polymorphism
- **Factory Pattern**: `ProductFactory` and `AttributeFactory` for object creation
- **Repository Pattern**: Separation of data access from business logic
- **Singleton Pattern**: Database connection management

### No If/Switch for Types

Product and attribute types are handled through class maps and polymorphism:

```php
private static array $categoryMap = [
    'clothes' => ClothesProduct::class,
    'tech' => TechProduct::class,
];
```

## 📝 Sample Products

| Product              | Category | Attributes                |
| -------------------- | -------- | ------------------------- |
| Nike Air Huarache Le | Clothes  | Size (40-43)              |
| Canada Goose Jacket  | Clothes  | Size (S/M/L/XL)           |
| PlayStation 5        | Tech     | Color, Capacity           |
| Xbox Series S        | Tech     | Color, Capacity           |
| iMac 2021            | Tech     | Capacity, USB 3, Touch ID |
| iPhone 12 Pro        | Tech     | Capacity, Color           |
| AirPods Pro          | Tech     | None                      |
| AirTag               | Tech     | None                      |

## 🧪 Testing the Application

1. Browse products on the home page
2. Filter by category (All, Clothes, Tech)
3. Click a product to view details
4. Select required attributes
5. Add to cart
6. View cart overlay
7. Adjust quantities or remove items
8. Place an order

## 📄 License

This project is open source and available for learning purposes.

## 👤 Author

**Ertan Curri**

- Portfolio: [ertancurri.com](https://www.ertancurri.com)
- GitHub: [@ertancurri](https://github.com/ertancurri)
- LinkedIn: [Ertan Curri](https://www.linkedin.com/in/ertancurri)
