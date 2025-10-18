# Travel Booking Application Reference

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **CMS**: Sanity CMS for content management
- **Development**: LocalTunnel for webhook testing

### Key Components
- Next.js app for user interface and API routes
- Sanity Studio for content management
- Real-time synchronization via webhooks

## Sanity CMS Integration

### Tour Schema
```typescript
// src/sanity/schemas/tour.ts
export default {
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tourLocation' }] }]
    }
  ]
};
```

### GROQ Queries
```typescript
// Get all tours with locations
const toursQuery = `*[_type == "tour"] {
  _id,
  title,
  slug,
  locations[]-> {
    _id,
    city,
    country,
    state
  }
}`;

// Get single tour
const tourQuery = `*[_type == "tour" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  locations[]-> {
    city,
    country,
    state
  }
}`;
```

## Development Setup

### Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://user:password@host/database"
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_KEY="your-read-token"
SANITY_EDITOR_API_KEY="your-write-token"
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "sanity:studio-dev": "sanity dev --port 3333",
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit push:pg"
  }
}
```

### Database Migration
```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
} satisfies Config;
```

## Best Practices

### Query Optimization
- Use indexes on frequently queried columns (slug, sanityId)
- Implement pagination for large datasets
- Use transactions for multi-table operations
- Consider prepared statements for repeated queries

### Error Handling
```typescript
// API route with error handling
export async function GET() {
  try {
    const tours = await db.select().from(tours);
    return Response.json(tours);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}
```

### Type Safety
```typescript
// Define types for better TypeScript support
export type Tour = typeof tours.$inferSelect;
export type NewTour = typeof tours.$inferInsert;
export type Location = typeof locations.$inferSelect;
export type TourWithLocations = Tour & {
  locations: Location[];
};
```

This reference provides a solid foundation for building similar travel booking applications with Next.js, Sanity CMS, and PostgreSQL.