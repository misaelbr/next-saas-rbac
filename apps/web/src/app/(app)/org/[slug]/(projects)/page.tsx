import { Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export const metadata: Metadata = {
  title: 'Projetos | Misael SaaS Starter RBAC',
}

export default async function Projects() {
  const permissions = await ability()
  const currentOrg = getCurrentOrg()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Projetos</h1>
        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <Plus className="mr-2 size-4" />
              Criar projeto
            </Link>
          </Button>
        )}
      </div>
      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          Você não tem permissão para visualizar projetos
        </p>
      )}
    </div>
  )
}
