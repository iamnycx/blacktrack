# BlackTrack

A wallet-first expense tracking application with Web3 authentication. Built with Next.js frontend and Node.js backend.

## Demo

<video width="1920" height="1080" controls>
  <source src="assets/demo.mp4" type="video/mp4">
</video>

## Project Structure

-   expense-tracker-frontend: Next.js 16 React application
-   expense-tracker-backend: Node.js backend with Express

## Prerequisites

-   Node.js 18+
-   Bun package manager
-   PostgreSQL database
-   MetaMask wallet (for authentication)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd expense-tracker-backend
```

Install dependencies:

```bash
bun install
```

Create a .env file with the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker
JWT_SECRET=your_jwt_secret_key
```

Run database migrations:

```bash
bun run db:migrate
```

Start the backend server:

```bash
bun dev
```

The backend will run on http://localhost:8000

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd expense-tracker-frontend
```

Install dependencies:

```bash
bun install
```

Create a .env.local file with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

Start the frontend development server:

```bash
bun dev
```

The frontend will run on http://localhost:3000

## Features

-   Web3 wallet authentication using MetaMask
-   Add, edit, and delete expenses
-   Filter expenses by category, date range
-   Category-based expense tracking
-   Real-time data updates
-   Responsive design for mobile and desktop

## API Documentation

Visit http://localhost:3000/api-docs for the complete API documentation.

## Database Schema

The application uses PostgreSQL with the following main tables:

-   users: User account information
-   expenses: Individual expense records
-   categories: Expense categories

## Development

### Running Tests

```bash
bun test
```

### Building for Production

Frontend:

```bash
cd expense-tracker-frontend
bun run build
bun start
```

Backend:

```bash
cd expense-tracker-backend
bun run build
bun start
```

## Environment Variables

### Backend (.env)

-   DATABASE_URL: PostgreSQL connection string
-   JWT_SECRET: Secret key for JWT token signing
-   PORT: Server port (default: 8000)

### Frontend (.env.local)

-   NEXT_PUBLIC_API_URL: Backend API endpoint
-   NEXT_PUBLIC_CONTRACT_ADDRESS: Smart contract address for Web3
