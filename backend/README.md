# Cerex Platform - Backend

Production-grade multi-tenant PropTech SaaS platform backend built with NestJS, TypeScript, Prisma, PostgreSQL, Redis, and BullMQ.

## Features

- **Multi-tenant Architecture**: Single backend serving unlimited developers, multiple developers and projects
- **Authentication**: JWT-based auth with refresh tokens, role-based access control
- **Project Resolution**: Middleware for project context via headers (`X-Project-ID`, `X-Project-Slug`)
- **API Documentation**: Swagger/OpenAPI at `/docs`
- **Health Checks**: `/health`, `/health/live`, `/health/ready`
- **Rate Limiting**: Throttler module with configurable limits
- **Logging**: Pino structured logging with pretty printing in development
- **Validation**: Global validation pipes with class-validator
- **Security**: Helmet, CORS, compression
- **Background Jobs**: BullMQ with Redis for email, WhatsApp, analytics, AI processing
- **Database**: PostgreSQL with Prisma ORM

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Redis 7+

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run start:dev
```

### Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
```

## API Endpoints

| Module | Base Path | Description |
|--------|-----------|-------------|
| Auth | `/api/v1/auth` | Login, register, refresh, password reset |
| Developers | `/api/v1/developers` | Developer management (admin) |
| Projects | `/api/v1/projects` | Project CRUD |
| Project Config | `/api/v1/projects/:projectId/config` | Project configuration |
| Buyers | `/api/v1/projects/:projectId/buyers` | Buyer management |
| Planner | `/api/v1/projects/:projectId/planner` | AI planner recommendations |
| Furniture | `/api/v1/projects/:projectId/furniture` | Furniture library |
| Knowledge | `/api/v1/projects/:projectId/knowledge` | Knowledge base |
| Events | `/api/v1/projects/:projectId/events` | Event tracking |
| Analytics | `/api/v1/projects/:projectId/analytics` | Analytics & funnel |
| Leads | `/api/v1/projects/:projectId/leads` | Lead management |
| Storage | `/api/v1/projects/:projectId/storage` | File storage |
| WhatsApp | `/api/v1/projects/:projectId/whatsapp` | WhatsApp integration |
| Notifications | `/api/v1/projects/:projectId/notifications` | Notifications |
| Dashboard | `/api/v1/projects/:projectId/dashboard` | Dashboard overview |
| CRM | `/api/v1/projects/:projectId/crm` | CRM deals |

## Project Context

All project-scoped endpoints require project context via headers:
- `X-Project-ID`: Project UUID
- `X-Project-Slug`: Project slug

The `ProjectResolutionMiddleware` resolves and attaches project context to requests.

## Environment Variables

See `.env.example` for all required variables.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`, `REDIS_PORT`: Redis connection
- `JWT_SECRET`, `JWT_REFRESH_SECRET`: JWT signing keys (min 32 chars)
- `CORS_ORIGIN`: Comma-separated allowed origins

## Scripts

```bash
npm run build          # Build for production
npm run start:dev      # Start with hot reload
npm run start:prod     # Start production build
npm run lint           # Run ESLint
npm run format         # Format with Prettier
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
npm run prisma:validate
```

## Architecture

```
src/
├── app.module.ts           # Root module
├── main.ts                 # Bootstrap with all middleware
├── config/                 # Configuration
├── prisma/                 # Prisma service & module
├── common/                 # Shared modules (Redis, BullMQ)
├── middleware/             # Project resolution middleware
├── guards/                 # JWT auth, roles, project access
├── decorators/             # Custom param decorators
├── filters/                # Global exception filter
├── interceptors/           # Response transform interceptor
└── modules/                # Feature modules
    ├── auth/
    ├── developers/
    ├── projects/
    ├── project-config/
    ├── buyers/
    ├── planner/
    ├── viewer/
    ├── furniture/
    ├── knowledge/
    ├── events/
    ├── analytics/
    ├── leads/
    ├── storage/
    ├── whatsapp/
    ├── notifications/
    ├── dashboard/
    └── crm/
```

## License

UNLICENSED - Cerex Platform Team