This is a [Next.js](https://nextjs.org) project with a custom routing system that provides Express-like route definitions while using native Next.js API handlers.

## Project Overview

This project implements a lightweight, custom router that allows you to define routes in an Express-like style while leveraging Next.js's native `NextRequest` and `NextResponse` APIs. All routes are centralized in `server/index.ts` and can be organized into separate route modules.

## Architecture

### Routing System

- **Custom Router** (`lib/router.ts`): A lightweight router class that supports Express-style route definitions
- **Main Router** (`server/index.ts`): Central router that combines all application routes
- **Route Modules** (`server/routes/`): Organized route definitions (e.g., `api.ts`)
- **API Handler** (`app/api/[...handler]/route.ts`): Next.js catch-all route handler that processes all API requests

### Project Structure

```
├── app/
│   └── api/
│       └── [...handler]/
│           └── route.ts          # Catch-all API handler
├── lib/
│   └── router.ts                  # Custom router implementation
├── server/
│   ├── index.ts                   # Main router (combines all routes)
│   └── routes/
│       └── api.ts                 # API route definitions
└── prisma/
    └── schema.prisma              # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Set up database (if using Prisma)
pnpm db:generate
pnpm db:push
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database Commands

```bash
pnpm db:generate    # Generate Prisma Client
pnpm db:push        # Push schema to database
pnpm db:migrate     # Run migrations
pnpm db:studio      # Open Prisma Studio
```

## Usage

### Defining Routes

Routes are defined in `server/index.ts` or in separate route modules:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Router from '../lib/router';

const router = new Router();

// GET endpoint
router.get('/users', async (req: NextRequest) => {
  return NextResponse.json({ users: [] });
});

// POST endpoint with body parsing
router.post('/users', async (req: NextRequest) => {
  const body = await req.json();
  return NextResponse.json({ created: body });
});

// Route with path parameters
router.get('/users/:id', async (req: NextRequest, params) => {
  const { id } = params!;
  return NextResponse.json({ userId: id });
});

export default router;
```

### Merging Route Modules

You can organize routes into separate modules and merge them:

```typescript
// server/index.ts
import Router from '../lib/router';
import apiRoutes from './routes/api';
import userRoutes from './routes/users';

const router = new Router();

// Add routes directly
router.get('/health', async (req) => {
  return NextResponse.json({ status: 'ok' });
});

// Merge route modules
router.use(apiRoutes);
router.use(userRoutes);

export default router;
```

### Supported HTTP Methods

- `GET` - `router.get(path, handler)`
- `POST` - `router.post(path, handler)`
- `PUT` - `router.put(path, handler)`
- `DELETE` - `router.delete(path, handler)`
- `PATCH` - `router.patch(path, handler)`

## Pros / Advantages

✅ **Native Next.js Integration**
- Uses Next.js `NextRequest` and `NextResponse` APIs directly
- No compatibility layer or workarounds needed
- Full TypeScript support with proper types

✅ **Express-like Syntax**
- Familiar route definition style for developers coming from Express
- Easy to migrate existing Express routes
- Clean and readable route definitions

✅ **Centralized Routing**
- All routes defined in one place (`server/index.ts`)
- Easy to see all available endpoints at a glance
- Simple to add new routes or modules

✅ **Lightweight & Performant**
- No Express dependency overhead
- Minimal abstraction layer
- Fast route matching with regex patterns

✅ **Type-Safe**
- Full TypeScript support
- Type-safe request/response handling
- Compile-time error checking

✅ **Modular & Organized**
- Routes can be split into separate modules
- Easy to organize by feature or domain
- Simple to maintain and scale

✅ **Path Parameters**
- Supports Express-style path parameters (`:id`, `:userId`, etc.)
- Automatically extracted and passed to handlers

## Limitations

⚠️ **No Middleware Support**
- Unlike Express, there's no middleware system (e.g., `app.use()`)
- Each route handler must implement its own logic
- Authentication, logging, etc. must be handled in each route

⚠️ **No Route Nesting**
- Cannot nest routers with prefixes (e.g., `router.use('/api', apiRoutes)`)
- All routes are at the root level
- Path prefixes must be included in route definitions

⚠️ **Limited Path Matching**
- Basic regex pattern matching only
- No advanced patterns like optional parameters or wildcards
- Path parameters are required (no optional params)

⚠️ **No Built-in Body Parsing**
- Must manually parse request bodies with `req.json()`
- No automatic parsing of different content types
- No built-in validation

⚠️ **No Error Handling Middleware**
- No global error handler like Express
- Each route must handle its own errors
- Error handling must be implemented per route

⚠️ **No Query String Utilities**
- Must manually parse query strings from URL
- No built-in query parameter helpers
- Access via `new URL(req.url).searchParams`

⚠️ **Single Route Match**
- Only the first matching route is executed
- No route priority or ordering system
- Routes are matched in the order they were added

⚠️ **No Route Guards/Interceptors**
- Cannot intercept requests before route handlers
- No pre-route execution hooks
- Must implement guards in each handler

## When to Use This Setup

**Good for:**
- Small to medium-sized APIs
- Projects that want Express-like syntax without Express
- Teams familiar with Express routing patterns
- Simple REST APIs with straightforward routing needs

**Consider alternatives if:**
- You need complex middleware chains
- You require advanced routing features (nested routes, route guards)
- You need built-in authentication/authorization middleware
- You're building a large, complex API with many cross-cutting concerns

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Next.js route handlers
- [Prisma Documentation](https://www.prisma.io/docs) - database ORM

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
