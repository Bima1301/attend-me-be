import { z } from 'zod'
import { requiredString } from '@/types/common'


export interface TProfileResponse {
  id: string
  name: string | null
  email: string | null
  username: string | null
  email_verified_at: string | null
  avatar: string | null
  avatar_url?: string | null
  created_at: string | null
  updated_at: string | null
  expiring_on: string | null
  no_hp: string | null
}

export interface TSignInResponse extends TProfileResponse {
  token: string
}

export const SignInRequestValueSchema = z.object({
  email: requiredString.email(),
  password: z.string().min(1, 'Password harus diisi'),
  rememberMe: z.boolean()
})

export type SignInRequestValue = z.infer<typeof SignInRequestValueSchema>

export const resetPasswordValueSchema = z
  .object({
    token: requiredString,
    email: requiredString,
    password: z.string().min(1, 'Password harus diisi'),
    password_confirmation: z.string().min(1, 'Konfirmasi Password harus diisi')
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Konfirmasi Password harus sama dengan Password',
        path: ['password_confirmation']
      })
    }
  })

export type ResetPasswordValue = z.infer<typeof resetPasswordValueSchema>
