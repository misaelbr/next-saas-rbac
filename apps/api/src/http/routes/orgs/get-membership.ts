import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organization/:slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get user membership on organization',
          description: 'Get user membership on organization by slug',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),

          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                userId: z.string().uuid(),
                role: roleSchema,
                organizationId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params

        const { membership } = await request.getUserMembership(slug)

        return {
          membership: {
            id: membership.id,
            userId: membership.userId,
            role: roleSchema.parse(membership.role),
            organizationId: membership.organizationId,
          },
        }
      },
    )
}
