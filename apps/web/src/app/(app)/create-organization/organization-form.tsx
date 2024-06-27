'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { createOrganizationAction } from './actions'

export function OrganizationForm() {
  const [{ message, success, errors }, handleSubmit, isPending] = useFormState(
    createOrganizationAction,
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4 " />
          <AlertTitle>Falha ao salvar organização!</AlertTitle>
          <AlertDescription>{<p>{message}</p>}</AlertDescription>
        </Alert>
      )}
      {success === true && message && (
        <Alert variant="sucess">
          <AlertTriangle className="size-4 " />
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>{<p>{message}</p>}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Nome da organização</Label>
        <Input name="name" id="name" />
        {errors?.name && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">Domínio</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="exemplo.com"
        />
        {errors?.domain && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-start space-x-2">
          <div className="translate-y-0.5">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
              className="translate-y-0.5"
            />
          </div>
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Vincular usuários pelo domínio
            </span>
            <p>
              Isto vai automaticamente convidar todos os membros com o e-mail do
              domínio para esta organização
            </p>
          </label>
        </div>
        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar organização'
        )}
      </Button>
    </form>
  )
}
