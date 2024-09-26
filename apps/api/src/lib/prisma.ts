import { PrismaClient } from '@prisma/client'
import { env } from '@saas/env'

export const prisma = new PrismaClient({
  log: [env.APP_ENV === 'development' ? 'query' : 'warn'],
})
