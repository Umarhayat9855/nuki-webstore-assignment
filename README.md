# Webshop Assignment

A fullstack webshop application built with Node.js, Express, MySQL, and React.

## Requirements
- Node.js (v18+)
- Docker & Docker Compose (optional, for DB)
- MySQL (if not using Docker)

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Copy `.env.example` to `.env` in `apps/api`:
    ```bash
    cp apps/api/.env.example apps/api/.env
    ```

3.  **Database Setup**
    Start the MySQL container:
    ```bash
    docker-compose up -d mysql
    ```
    Run migrations and seed data:
    ```bash
    cd apps/api
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

## Running the App

Start both backend and frontend in development mode:
```bash
npm run dev
```
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Testing

Run backend and frontend tests:
```bash
npm test
```

## Credentials
- **User**: test@example.com / password123
- **User**: alice@example.com / password123
- **User**: bob@example.com / password123# nuki-webstore-assignment
