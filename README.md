# Finace Visualizer App

A **full-stack Finance visualizer application** built with **Next.js** for the frontend and backend, using **MongoDB** as the database.

## Features
- Add, edit, and delete transactions
- Categorize transactions (income/expense)
- Store transaction history in MongoDB
- Responsive UI using **shadcn/ui**
- API integration with Next.js App Router

## Tech Stack
### Frontend & Backend
- **Next.js (App Router)** – Full-stack framework
- **React Hook Form + Zod** – Form validation
- **shadcn/ui** – UI components
- **Lucide Icons** – Icons
- **Axios** – API calls
  
### Backend
- **MongoDB + Mongoose** – Database
- **Next.js API Routes** – Backend logic

## Setup Instructions

### 1. Clone the repository
```sh
git clone https://github.com/Kalaiselvan23/finance-visualizer
cd finace-visualizer
```

### 2. Install dependencies
```sh
yarn install  # or npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add:
```sh
MONGODB_URI=mongodb+srv://your-user:your-password@cluster.mongodb.net/your-db-name
NEXT_PUBLIC_API_BASE_URL=api
```

### 4. Start the development server
```sh
yarn dev  # or npm run dev
```
Server runs at **http://localhost:3000**

## API Endpoints
### Transactions
#### Get all transactions
```sh
GET /api/transactions
```
#### Create a transaction
```sh
POST /api/transactions
Body: {
  "description": "Grocery shopping",
  "amount": 100,
  "date": "2024-03-18",
  "category": "Food",
  "type": "expense"
}
```
#### Update a transaction
```sh
PUT /api/transactions/:id
```
#### Delete a transaction
```sh
DELETE /api/transactions/:id
```

## Folder Structure
```
📂 finance-visualizer
 ┣ 📂 app
 ┃ ┣ 📂 api
 ┃ ┃ ┗ 📂 transactions
 ┃ ┃ ┃ ┣ 📄 route.ts (API logic)
 ┃ ┗ 📂 components
 ┃ ┃ ┣ 📄 TransactionDialog.tsx
 ┃ ┃ ┗ 📄 TransactionList.tsx
 ┣ 📂 lib
 ┃ ┗ 📄 db.ts (MongoDB connection)
 ┣ 📂 models
 ┃ ┗ 📄 Transaction.ts (Mongoose schema)
 ┣ 📄 .env.local
 ┣ 📄 package.json
 ┣ 📄 README.md
```

### Demo Images
**Dashboard**
![image](https://github.com/user-attachments/assets/0f804716-15fc-409a-a6d3-2699401afeaa)
![image](https://github.com/user-attachments/assets/875aac0a-50a7-4570-b25a-cf8045df5c12)
![image](https://github.com/user-attachments/assets/3c75810e-cb06-4c5b-ac07-4b8e728d5bc5)

**Transaction**
![image](https://github.com/user-attachments/assets/01acc128-bfee-4a1b-8aab-417af4858ea0)
![image](https://github.com/user-attachments/assets/537e9543-e0a0-43de-b6ad-ce06cf185817)

**Categories**
![image](https://github.com/user-attachments/assets/52e49947-297c-4405-aedf-98810bdf196b)
![image](https://github.com/user-attachments/assets/e0433b2e-2469-4fc3-a226-69fe26bc7d94)

**Budget**
![image](https://github.com/user-attachments/assets/1f6df854-8b17-4be4-a340-f4946b196b64)
![image](https://github.com/user-attachments/assets/283cc42f-4e0d-4bb8-88e1-fef463c57ff2)
