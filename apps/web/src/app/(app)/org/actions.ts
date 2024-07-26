'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, {
        message: 'Por favor, forneça um nome com pelo menos 4 caracteres.',
      })
      .transform((value) => value.trim()),
    domain: z
      .string()
      .transform((value) => value.trim())
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex =
              /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/

            return domainRegex.test(value)
          }

          return true
        },
        {
          message: 'Por favor, forneça um domínio válido.',
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === 'on' || value === true)
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message:
        'É necessário informar o domínio quando a opção de vincular usuários pelo domínio está ativada.',
      path: ['domain'],
    },
  )

export type OrganizationSChema = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }
  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
    revalidateTag('organizations')
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
    message: 'Organização salva com sucesso.',
    errors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const currentOrg = getCurrentOrg()

  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }
  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await updateOrganization({
      org: currentOrg!,
      name,
      domain,
      shouldAttachUsersByDomain,
    })
    revalidateTag('organizations')
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
    message: 'Organização salva com sucesso.',
    errors: null,
  }
}
