'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
  const [{ message, success, errors }, handleSubmit, isPending] =
    useFormState(createInviteAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4 " />
          <AlertTitle>Falha ao enviar convite!</AlertTitle>
          <AlertDescription>{<p>{message}</p>}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="john@exemplo.com.br"
          />
          {errors?.email && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>
        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="MEMBER">Membro</SelectItem>
            <SelectItem value="BILLING">Financeiro</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Convidar usuário
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
