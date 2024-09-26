import type { Metadata } from 'next'

import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { OrganizationForm } from '../../organization-form'
import { Billing } from './billing'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export const metadata: Metadata = {
  title: 'Configurações e Cobranças | Misael SaaS Starter RBAC',
}

export default async function Settings() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const { organization } = await getOrganization(currentOrg!)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold ">Configurações</h1>
      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Organização</CardTitle>
              <CardDescription>
                Atualize os detalhes de sua organização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  name: organization.name,
                  domain: organization.domain,
                  shouldAttachUsersByDomain:
                    organization.shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
      {canGetBilling && <Billing />}
      {canShutdownOrganization && (
        <Card>
          <CardHeader>
            <CardTitle>Remover Organização</CardTitle>
            <CardDescription>
              Isto deletará sua organização, inclusive seus projetos. Esta ação
              não poderá ser revertida.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShutdownOrganizationButton />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
