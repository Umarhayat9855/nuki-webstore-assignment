# Project Report

## Architecture Overview
I chose a **monorepo structure** managed by npm workspaces to keep the frontend and backend closely related but loosely coupled.
- **Backend**: Node.js + Express. I used **Prisma** as the ORM because it provides excellent type safety and migration management, which speeds up development and reduces runtime errors.
- **Frontend**: React + Vite. I used **CSS Modules** for styling to ensure component-scoped styles and avoid global namespace pollution, keeping the design clean and maintainable.
- **Pattern**: The **Controller-Service-Repository** pattern (simplified here to Controller-Prisma) was used in the backend to separate concerns. Controllers handle HTTP, while Prisma handles data access.

## Authentication
I implemented a simplified **JWT-based authentication** stored in **HTTP-only cookies**.
- **Why?** Storing tokens in localStorage is vulnerable to XSS. HTTP-only cookies are more secure as they cannot be accessed by JavaScript.
- **Trade-off**: It requires CSRF protection in a production environment (which I omitted for simplicity here, relying on SameSite defaults).

## SRE & Deployment
- **Docker**: A `docker-compose.yml` file is provided to spin up the MySQL database, ensuring a consistent environment across different development machines.
- **Environment Variables**: Configuration is managed via `.env` files, adhering to the 12-factor app methodology.

## Edge Cases Handled
- **Cart Merging**: If you add the same product twice, the quantity updates instead of creating a duplicate entry.
- **Validation**: API rejects negative quantities or invalid product IDs.
- **Error Handling**: Centralized error middleware in Express ensures consistent JSON error responses.

## Scalability Considerations
- **Database**: The use of Prisma allows for easy switching to a connection pooler (like PgBouncer for Postgres, or Proxy for MySQL) if load increases.
- **Caching**: For a real high-traffic shop, I would add **Redis** to cache product listings and session data.
- **Statelessness**: The JWT implementation is stateless, allowing the backend to scale horizontally across multiple instances without sticky sessions.

## UX Enhancements
- **Toast Notifications**: Replaced native browser `alert()` calls with a custom Toast notification system, providing non-blocking, visually appealing feedback for user actions (add to cart, login errors, etc.).
- **Nuki-Style Design**: Product pages feature a premium, clean aesthetic matching Nuki's official website, including card layouts, hover effects, and typography that aligns with their brand identity.

## CI/CD Pipeline
- **GitHub Actions**: Automated testing pipeline that runs on every push to `main`, executing both backend and frontend tests to ensure code quality.
- **Test Coverage**: Achieved **93%+ coverage** on backend routes (auth, cart, products) using Jest with mocked Prisma client for isolation.

## Future Improvements
- **Testing**: Adding end-to-end tests (e.g., Cypress or Playwright) would verify the full user flow from login to checkout.
- **Security**: Implement CSRF tokens and rate limiting to prevent abuse.
- **Real Product Images**: Replace placeholder images with actual Nuki product photography.

