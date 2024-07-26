'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const { slug: orgSlug } = useParams<{ slug: string }>()

  const [{ message, success, errors }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [orgSlug, 'projects'],
      })
    },
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4 " />
          <AlertTitle>Falha ao salvar projeto!</AlertTitle>
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
        <Label htmlFor="name">Nome do projeto</Label>
        <Input name="name" id="name" />
        {errors?.name && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Descrição do projeto</Label>
        <Textarea name="description" id="description" />
        {errors?.description && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar projeto'
        )}
      </Button>
    </form>
  )
}
