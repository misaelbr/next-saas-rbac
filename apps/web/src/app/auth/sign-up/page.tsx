import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input name="name" id="name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input name="password" type="password" id="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confime sua senha</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
        />
      </div>
      <Button type="submit" className="w-full">
        Criar uma nova conta
      </Button>
      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Já tem uma conta? Entrar</Link>
      </Button>

      <Separator />

      <Button variant="outline" type="submit" className="w-full">
        <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Entrar com o Github
      </Button>
    </form>
  )
}
