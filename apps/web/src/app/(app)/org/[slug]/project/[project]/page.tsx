import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projeto | Misael SaaS Starter RBAC',
}

export default async function Project() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold ">Projeto</h1>
    </div>
  )
}
