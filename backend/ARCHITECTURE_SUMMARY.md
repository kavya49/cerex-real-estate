# Architecture Summary - Cerex Platform Backend (Phase 3.3)

## What Was Built

A production-ready NestJS backend for the Cerex Platform - a multi-tenant PropTech SaaS platform. The backend serves as the single API for future CRM, Mobile App, Broker Portal, and Admin Portal.

### Core Infrastructure
- **NestJS 10** with TypeScript strict mode
- **Prisma ORM** with PostgreSQL schema for multi-tenancy
- **Redis** for caching and BullMQ job queues
- **Swagger/OpenAPI** documentation at `/docs`
- **Helmet**, **Compression**, **CORS** security middleware
- **Pino** structured logging with pretty print in development
- **Global validation pipes** with class-validator
- **Docker** multi-stage build with docker-compose for local dev
- **EventEmitter2** for domain events

### Folder Structure (28 modules)

```
src/
├── app.module.ts
├── main.ts
├── config/
│   ├── configuration.ts
│   └── validation.ts
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── common/
│   ├── redis/redis.module.ts
│   └── bull/bull.module.ts
├── middleware/
│   └── project-resolution.middleware.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   ├── project-access.guard.ts
│   └── buyer-session.guard.ts
├── decorators/
│   ├── current-user.decorator.ts
│   ├── roles.decorator.ts
│   └── custom.decorators.ts
├── filters/
│   └── all-exceptions.filter.ts
├── interceptors/
│   └── transform.interceptor.ts
└── modules/
    ├── auth/                 # JWT auth, login, register, refresh, password reset
    ├── developers/           # Developer management (super-admin)
    ├── projects/             # Project CRUD with slug generation
    ├── project-config/       # Project theming & feature flags
    ├── buyers/               # Buyer profiles & DNA
    ├── planner/              # Legacy AI planner recommendations
    ├── viewer/               # 3D viewer (placeholder)
    ├── furniture/            # Furniture library
    ├── knowledge/            # Knowledge base articles
    ├── events/               # Event tracking & analytics
    ├── analytics/            # Funnel & overview analytics
    ├── leads/                # Lead capture & management
    ├── storage/              # File storage (R2 placeholder)
    ├── whatsapp/             # WhatsApp Cloud API (placeholder)
    ├── notifications/        # Notification system
    ├── dashboard/            # Dashboard overview & funnel
    ├── crm/                  # CRM deals (placeholder)
    ├── health/               # Health checks (liveness/readiness)
    ├── buyer-session/        # Anonymous buyer session engine
    ├── planner-intelligence/ # Legacy planner normalization
    ├── decision-engine/      # Decision Intelligence platform
    └── adaptive-planner/     # Adaptive questionnaire engine
```

### Database Schema (Prisma)

**Core Models:**
- **Developer** - Platform users (developers/agencies)
- **Project** - Real estate projects (multi-tenant)
- **ProjectConfig** - Theming, feature flags, SEO, integrations
- **Apartment** - Inventory units per project
- **Buyer** - End users with planner answers & DNA profile
- **Lead** - Captured leads with intent & scoring
- **Event** - Immutable analytics events
- **KnowledgeBase** - Project-specific help articles
- **Furniture** - 3D furniture models per project/style
- **Notification** - Multi-channel notifications
- **WhatsAppTemplate** - Meta Cloud API templates
- **StorageObject** - File metadata for R2
- **User** - Internal admin users

**Session & Planner Models:**
- **BuyerSession** - Anonymous buyer sessions with JWT tokens
- **DecisionSnapshot** - Decision engine input/output snapshots
- **DecisionEvaluation** - Evaluation results with explainability
- **BehaviourDimension** - 9 behavioural dimensions per evaluation
- **DecisionExplanation** - Per-field explainability records

**Adaptive Planner Models:**
- **Questionnaire** - Versioned questionnaires (developer/project level)
- **Question** - Questions with branching logic
- **Branch** - Branching conditions between questions
- **PlannerAnswer** - Per-buyer answers with `isUnknown` flag
- **PlannerAnalytics** - Anonymous analytics events

**Rule Engine Models:**
- **Rule** - Configuration-driven rules
- **RuleSet** - Rule collections (developer/project level)
- **RuleConflict** - Conflict resolution history

### Key Architectural Decisions

1. **Project Resolution Middleware**: Every request resolved to project context via `X-Project-ID` or `X-Project-Slug` headers. Attaches `req.project` with `projectId`, `projectSlug`, `developerId`.

2. **Multi-Tenant by Default**: All modules scoped to `projectId`. `ProjectAccessGuard` ensures users only access their developer's projects.

3. **Thin Controllers, Fat Services**: Controllers only handle HTTP concerns; business logic in services.

4. **DTO-Driven**: All inputs validated via class-validator DTOs with Swagger annotations.

5. **Event-Driven Ready**: BullMQ queues configured for email, WhatsApp, analytics, AI processing, exports, webhooks. EventEmitter2 for domain events.

6. **Health Checks**: Kubernetes-ready `/health/live` and `/health/ready` endpoints checking DB and Redis.

7. **Structured Logging**: Pino with custom props for project context, request/response serializers.

8. **Buyer Session Authentication**: Anonymous buyers get JWT sessions via `BuyerSessionGuard` (separate from developer JWT auth).

### Phase 3.3 - Adaptive Planner + Decision Intelligence

#### Adaptive Planner (`adaptive-planner` module)
- **Configuration-driven questionnaire** stored in database
- **6 mandatory questions** (always asked) + **9 adaptive questions** (branching logic)
- **Questionnaire versioning** with developer/project overrides
- **Answer persistence** with `isUnknown` flag (distinguishes UNKNOWN from FALSE)
- **Resume capability** via `sessionId`
- **Preview generation** after mandatory questions complete
- **Event emission**: `planner.started`, `planner.answered`, `planner.changed`, `planner.completed`
- **Decision engine auto-invocation** on completion

#### Decision Intelligence (`decision-engine` module)
- **FactBuilder**: 35+ objective facts from planner answers
- **RuleEngine**: 23 configuration-driven rules across 7 categories
- **AttributeBuilder**: 25+ derived attributes with traceability
- **PriorityEngine**: 13 weighted priority scores (0-100)
- **ConstraintEngine**: 9 mandatory constraints for recommendation engine
- **BehaviourDimensions**: 9 stable intermediate outputs for CRM/intelligence
- **Explainability**: Full traceability (source, confidence, triggering rules, reasoning)
- **Conflict Resolution**: Deterministic (severity → priority → confidence)

### Assumptions
- PostgreSQL 16+ and Redis 7+ available
- JWT secrets minimum 32 characters
- Frontend runs on `http://localhost:5173` (configurable via CORS_ORIGIN)
- Cloudflare R2 for file storage (credentials optional)
- Meta Cloud API for WhatsApp (credentials optional)
- OpenAI API for AI features (optional)

### Risks
1. **Prisma migrations not yet run** - Need `npm run prisma:migrate` against real database
2. **No authentication implementation complete** - Login/register works but needs email service for password reset
3. **No unit/e2e tests written** - Test structure exists but no tests implemented
4. **BullMQ workers not implemented** - Queue producers exist but no consumers
5. **WebSocket support not added** - May be needed for real-time features

### Deferred Work (Phase 4+)
- [ ] Authentication: Email service, email verification, 2FA, social login
- [ ] Prisma migrations & seed data
- [ ] BullMQ workers for all queues
- [ ] WebSocket gateway for real-time updates
- [ ] File upload to Cloudflare R2
- [ ] WhatsApp template management & webhook handling
- [ ] Knowledge Engine (Phase 4)
- [ ] Buyer DNA Engine (Phase 4)
- [ ] Recommendation Engine (Phase 4)
- [ ] Compatibility Engine (Phase 4)
- [ ] 3D viewer backend (model storage, validation)
- [ ] Comprehensive test suite (unit + e2e)
- [ ] API rate limiting per project
- [ ] Audit logging for sensitive operations
- [ ] Developer onboarding flow
- [ ] Project duplication/cloning
- [ ] Advanced analytics (cohorts, retention)
- [ ] CRM: deals, pipelines, tasks, activities
- [ ] Broker portal APIs
- [ ] Admin portal APIs
- [ ] Mobile app specific endpoints

### Recommended Phase 4
1. **Run migrations** against PostgreSQL and verify schema
2. **Implement BullMQ workers** for email, WhatsApp, analytics processing
3. **Add comprehensive tests** - target 80% coverage
4. **Complete authentication** - email verification, password reset emails
5. **Integrate Cloudflare R2** for file uploads
6. **Build Knowledge Engine** for AI-assisted Q&A
7. **Build Buyer DNA Engine** for persistent buyer profiles
8. **Add WebSocket gateway** for real-time buyer updates
9. **Implement audit logging** for compliance
10. **Create seed scripts** for demo data
11. **Performance testing** and optimization

## Validation Checkpoints

All checkpoints should pass:
- [ ] `npm install` - Dependencies install cleanly
- [ ] `npm run build` - 0 TypeScript errors
- [ ] `npm run start:dev` - Application starts cleanly
- [ ] Swagger loads at `/docs`
- [ ] `npx prisma validate` - Schema valid
- [ ] `npx prisma generate` - Client generated
- [ ] Docker configuration validates
- [ ] `.env.example` documents all required variables
- [ ] Folder structure complete (28 modules)
- [ ] No dependency injection errors
- [ ] No unused imports
- [ ] No lint errors (warnings acceptable)