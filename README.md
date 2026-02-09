# 🛒 Full Stack E-commerce

A full stack e-commerce application built with **Next.js**, **Tailwind CSS**, and **Prisma**, using **PostgreSQL** as the database.  
This project simulates a complete online store.

## 🚀 Tech Stack

- **Next.js** – React framework for modern web applications (App Router)
- **TypeScript** – Static typing for better reliability and maintainability
- **Tailwind CSS** – Utility-first CSS framework for responsive UI
- **Prisma** – Modern ORM for Node.js
- **PostgreSQL** – Relational database
- **Stripe** - For payment integration

## ✨ Features

- Sign-in / Sign-up
- Product listing
- Product details page
- Shopping cart
- Payment integration
- Profile page
- Database persistence
- Frontend and backend integration
- Route Handlers
- Responsive layout

## 🧱 Architecture

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js Route Handlers
- **Database**: PostgreSQL
- **ORM**: Prisma

## ⚙️ Prerequisites

Before you begin, make sure you have installed:

- Node.js (v18+)
- PostgreSQL
- npm or yarn

## 📦 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/michelzaum/buy-buy.git
```
2. Navigate to the project folder:
```
cd buy-buy
```
3. Install dependencies:
```
npm install
# or
yarn install
```
4. Set up environment variables:
Create a .env file in the project root:

```
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
```
5. Run Prisma migrations:
```
npx prisma migrate dev
```
6. Start the development server:
```
npm run dev
# or
yarn dev
```

The application will be available at:
👉 http://localhost:3000

## Prisma Studio (Optional)

To visualize and manage the database:

```
npx prisma studio
```

Built by [Michel de Oliveira](https://github.com/michelzaum) 👨‍💻
