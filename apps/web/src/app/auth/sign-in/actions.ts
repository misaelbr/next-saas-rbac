'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({ message: 'Por favor, forneça um e-mail válido.' }),
  password: z
    .string()
    .min(1, { message: 'Por favor, forneça uma senha válida.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }
  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })
    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // days
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        acceptInvite(inviteId)
        cookies().delete('inviteId')
      } catch {}
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }
    console.error(err)

    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
