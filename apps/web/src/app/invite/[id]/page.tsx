import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInvite } from '@/http/accept-invite'
import { getInvite } from '@/http/get-invite'

interface InvitePageProps {
  params: {
    id: string
  }
}

dayjs.extend(relativeTime)
dayjs.locale(ptBR)

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.id

  const { invite } = await getInvite(inviteId)
  const isUserAuthenticated = isAuthenticated()

  let currentUserEmail = null

  if (isUserAuthenticated) {
    const { user } = await auth()

    currentUserEmail = user.email
  }

  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === invite.email

  async function signInFromInvite() {
    'use server'

    cookies().set('inviteId', inviteId)

    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  async function acceptInvitAction() {
    'use server'

    await acceptInvite(inviteId)

    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-xs flex-col space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>
          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Alguém'}
            </span>{' '}
            convidou você para juntar-se à{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>{' '}
            <span className="font-medium text-foreground">
              {dayjs(invite.createdAt).fromNow()}
            </span>
            .
          </p>
        </div>
        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite}>
            <Button type="submit" variant="secondary" className="w-full">
              <LogIn className="mr-2 size-4" />
              Entrar para aceitar convite
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={acceptInvitAction}>
            <Button type="submit" variant="secondary" className="w-full">
              <CheckCircle className="mr-2 size-4" />
              Juntar-se à {invite.organization.name}
            </Button>
          </form>
        )}

        {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite && (
          <div className="space-y-4">
            <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
              Esse convite foi enviado para{' '}
              <span className="font-medium text-foreground">
                {invite.email}
              </span>
              , porém você está autenticado com este email{' '}
              <span className="font-medium text-foreground">
                {currentUserEmail}
              </span>
              .
            </p>
            <div className="space-y-2">
              <Button className="w-full" variant="secondary" asChild>
                <a href="/api/auth/sign-out">
                  <LogOut className="mr-2 size-4" />
                  Sair da conta {currentUserEmail}
                </a>
              </Button>
            </div>
            <div className="space-y-2">
              <Button className="w-full" variant="outline" asChild>
                <Link href="/">Voltar para a dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
