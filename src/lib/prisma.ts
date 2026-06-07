// Prisma 7 requires a driver adapter for PostgreSQL.
// This lazy singleton is used at runtime only (not during build).
// To use in production, install @prisma/adapter-pg and configure properly.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrismaClient = any

declare global {
  // eslint-disable-next-line no-var
  var __prisma: AnyPrismaClient | undefined
}

function getPrisma(): AnyPrismaClient {
  if (globalThis.__prisma) return globalThis.__prisma

  // Dynamic require to avoid build-time instantiation issues
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client')

  // Try to use adapter-pg if available
  let client: AnyPrismaClient
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaPg } = require('@prisma/adapter-pg')
    client = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    })
  } catch {
    // Fallback: try without adapter (may work with some Prisma setups)
    try {
      client = new PrismaClient({ log: [] })
    } catch {
      // Return a mock client that throws descriptive errors
      const handler = {
        get: (_: unknown, prop: string) => {
          if (prop === 'then') return undefined
          return new Proxy({}, {
            get: () => () => Promise.reject(new Error(`Database not configured. Set DATABASE_URL and install @prisma/adapter-pg`)),
          })
        },
      }
      return new Proxy({}, handler)
    }
  }

  if (process.env.NODE_ENV !== 'production') globalThis.__prisma = client
  return client
}

export const prisma: AnyPrismaClient = new Proxy({} as AnyPrismaClient, {
  get(_target, prop) {
    return getPrisma()[prop]
  },
})
