# Testear Backend API

Backend API for Testear - A QA Training Platform

## Project Overview

Testear is a comprehensive platform dedicated to QA training and certification. This backend provides the API infrastructure for:

- User authentication and authorization
- Course catalog and management
- Course content delivery
- Progress tracking
- Certificate generation

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Microsoft SQL Server
- **Validation**: Zod

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- SQL Server instance available
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration

4. Run database migrations (when available)

### Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Building for Production

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Endpoints

#### Health Check

```
GET /health
```

Returns server health status.

#### External Endpoints (Public)

```
/api/v1/external/*
```

Public endpoints accessible without authentication.

#### Internal Endpoints (Authenticated)

```
/api/v1/internal/*
```

Authenticated endpoints requiring valid user session.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 1433 |
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | testear |
| CORS_ORIGINS | Allowed CORS origins | - |

## Development Guidelines

### Code Style

- Use TypeScript for all code
- Follow ESLint configuration
- Use 2-space indentation
- Maximum line length: 120 characters

### Naming Conventions

- Files: camelCase (e.g., `userService.ts`)
- Classes: PascalCase (e.g., `UserService`)
- Functions: camelCase (e.g., `getUserById`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### API Design

- Follow RESTful principles
- Use appropriate HTTP methods
- Return consistent response formats
- Implement proper error handling

## Testing

Tests will be added as features are implemented.

## License

ISC
