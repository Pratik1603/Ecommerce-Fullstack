# eCommerce Application

This eCommerce application is built with Node.js, Express, React, and MongoDB, providing users with a platform to browse products, add them to their cart, and manage their orders.
This Project is given as test for an intern process
## Features

- **User Authentication**: Users can register, log in, and log out. JWT is used for authentication.
- **Product Management**: Admins can add, update, and delete products. Users can view product details.
- **Shopping Cart**: Users can add products to their cart, view their cart, and remove items.
- **Product Search and Filtering**: Search functionality is implemented to find products by name. Filtering options by category and price range are available.
- **Persistent Storage**: The user's cart is saved to local storage to persist across sessions.

## Backend Development

### Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Tailwind CSS

### API Endpoints

#### User Authentication

- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user and return a JWT.

#### Product Management

- `GET /products`: Retrieve a list of products.
- `GET /products/:id`: Retrieve details of a specific product.
- `POST /products`: Add a new product (admin only).
- `PUT /products/:id`: Update an existing product (admin only).
- `DELETE /products/:id`: Delete a product (admin only).

#### Shopping Cart

- `GET /cart`: Retrieve the user's shopping cart.
- `POST /cart`: Add an item to the cart.
- `DELETE /cart/:id`: Remove an item from the cart.

## Frontend Development

### Technologies Used

- React
- Redux for state management
- React Router for navigation
- Tailwind Css
### Components

- **AuthForm**: Registration and login forms.
- **ProductList**: Display a list of products.
- **ProductDetail**: Display details of a selected product.
- **Cart**: Display the user's shopping cart and allow item removal.

## How to Run

1. Clone this repository.
2. Navigate to the `backend` directory and run `npm install` to install backend dependencies.
3. Set up MongoDB and configure the connection in `backend/config/db.js`.
4. Start the backend server by running `npm start`.
5. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
6. Start the React development server by running `npm start`.
7. Access the application in your browser at `http://localhost:3000`.

## Images
https://drive.google.com/drive/folders/1y565Pae1b1TapmBNBPEsF1ygVXDyCj7Y?usp=sharing


