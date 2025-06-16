# AstroVision

## Project Overview

AstroVision is a Node.js and TypeScript-based backend service that provides authentication and horoscope prediction APIs. It is designed with modularity, scalability, and maintainability in mind, using best practices for API development and security.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd astro-vision
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Node Version**
   - Requires **Node.js v20.x** and **npm**.

4. **Environment Variables**
   - Copy `.env.example` to `.env.local` and update values as needed:
     ```bash
     cp .env.example .env.local
     ```

5. **Start the server (local)**
   ```bash
   npm run start:local
   ```

---

## Project Folder Structure

```
astro-vision/
├── docs/                   # API documentation (Swagger/OpenAPI)
│   └── index.yaml
├── scripts/                # Utility scripts
├── src/
│   ├── api/                # API route definitions
│   │   ├── routes.ts
│   │   └── v1/
│   │       ├── auth/       # Auth endpoints
│   │       └── horoscope/  # Horoscope endpoints
│   ├── config/             # Configuration files
│   ├── constant/           # Constants (error types, status codes, etc.)
│   ├── database/           # Database connection logic
│   ├── http/               # HTTP status codes
│   ├── interface/          # TypeScript interfaces
│   ├── middleware/         # Express middlewares
│   ├── repository/         # Data access layer
│   ├── types/              # TypeScript type definitions
│   ├── use-case/           # Business logic
│   ├── util/               # Utility functions and error handling
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── tests/                  # Unit and E2E tests
├── .env.example            # Example environment variables
├── package.json            # Project manifest
└── readme.md               # Project documentation
```

---

## Design Decisions

- **TypeScript** for type safety and maintainability.
- **Express.js** for robust API routing.
- **Modular structure**: Separation of concerns between API, business logic, data access, and utilities.
- **JWT authentication** for secure endpoints.
- **Swagger/OpenAPI** documentation for easy API exploration.
- **Environment-based configuration** for flexibility across environments.
- **Testing**: Includes both unit and E2E tests.

---

## Rate Limiting

- The API enforces a rate limit of **5 requests per minute per IP** using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).
- If the limit is exceeded, the API responds with HTTP 429 and a message:  
  `Too many requests, please try again after a minute.`
- Configuration is located in [`src/app.ts`](src/app.ts).

---

## Improvements To Make With Time

- Add rate limiting and request throttling.
- Add request throttling.
- Implement role-based access control.
- Add more comprehensive logging and monitoring.
- Improve test coverage and add CI/CD pipelines.
- Add support for more horoscope types and user preferences.
- Enhance error handling and validation.
- Containerize with Docker Compose for multi-service deployments.

---

## Swagger Endpoint

- **Swagger UI**: [https://BASE_URL/api-docs](https://BASE_URL/api-docs)
- **OpenAPI Spec**: [`docs/index.yaml`](docs/index.yaml)

---

## APIs & Example CURL Commands

### 1. Signup

**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**
```json
{
  "name": "Rupesh Garhwal",
  "email": "rupesh.garhwal@test.com",
  "password": "pass@123",
  "birthdate": "2000/03/09"
}
```

**Curl:**
```bash
curl -X POST https://BASE_URL/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Rupesh Garhwal","email":"rupesh.garhwal@test.com","password":"pass@123","birthdate":"2000/03/09"}'
```

---

### 2. Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "rupesh.garhwal@test.com",
  "password": "pass@123"
}
```

**Curl:**
```bash
curl -X POST https://BASE_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rupesh.garhwal@test.com","password":"pass@123"}'
```

---

### 3. Get Today's Horoscope

**Endpoint:** `GET /api/v1/horoscope/today`

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`

**Curl:**
```bash
curl -X GET https://BASE_URL/api/v1/horoscope/today \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

### 4. Get Horoscope History

**Endpoint:** `GET /api/v1/horoscope/history?days=7`

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`

**Curl:**
```bash
curl -X GET "https://BASE_URL/api/v1/horoscope/history?days=7" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## License

See [LICENSE.md](LICENSE.md) for details.
