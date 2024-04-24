import { defineAbilitiyFor, projectSchema } from '@saas/auth'

const ability = defineAbilitiyFor({ role: 'ADMIN', id: 'user-id' })

const project = projectSchema.parse({
  id: 'project-id',
  ownerId: 'user3-id',
})

console.log(ability.can('get', 'Invite'))
console.log(ability.can('delete', project))
