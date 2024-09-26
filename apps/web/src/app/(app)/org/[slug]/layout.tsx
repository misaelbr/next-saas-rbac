import type { Metadata } from 'next'

import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export const metadata: Metadata = {
  title: 'Projetos | Misael SaaS Starter RBAC',
}

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>
      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  )
}
