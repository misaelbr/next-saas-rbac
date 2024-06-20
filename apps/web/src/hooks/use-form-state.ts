import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSucess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransiction] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransiction(async () => {
      const state = await action(data)

      if (state.success === true && onSucess) {
        await onSucess()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
