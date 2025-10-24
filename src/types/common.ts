import { z } from 'zod'
import type { LinkComponentProps, RouteIds } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import type { router } from '@/main'

import { uriToJson } from '@/lib/utils'

export interface NavItem {
  icon?: LucideIcon | string
  label: string
  href?: Required<LinkComponentProps['to']>
  children?: Array<Omit<NavItem, 'icon'>>
  isGroupLabel?: boolean
  module?: string
  permission?: string
  groupModule?: Array<string>
}

export interface NavItemGuest {
  icon?: LucideIcon | string
  label: string
  description?: string
  href?: Required<LinkComponentProps['to']>
  children?: Array<NavItemGuest>
}

export const requiredString = z
  .string({ message: 'Input tidak boleh kosong.' })
  .min(1, 'Input tidak boleh kosong.')
export const nullableNumber = z.coerce
  .number()
  .optional()
  .or(z.literal('').transform(() => undefined))
export const yearSchema = z
  .number()
  .min(1945, 'Tahun tidak valid')
  .max(new Date().getFullYear(), 'Tahun tidak boleh melebihi tahun sekarang')
export const phoneNumberSchema = z
  .string()
  .min(1, 'Input tidak boleh kosong')
  .max(15, 'Nomor tidak boleh lebih dari 15 karakter')
  .regex(/^8\d{0,15}$/, 'Nomor harus diawali dengan angka 8')
export const phoneNumberSchemaOptional = phoneNumberSchema
  .optional()
  .or(z.literal('').transform(() => undefined))

export const filePhotoSchema = z
  .instanceof(File)
  .refine(
    file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    { message: 'File harus berupa gambar (JPEG, PNG, atau WEBP)' }
  )
  .optional()

export const defaultPaginateSchema = z.object({
  page: z.coerce.number().min(1, 'Page must be greater than 0'),
  per_page: z.coerce.number().min(1, 'Limit must be greater than 0')
})
export type DefaultPaginateValues = z.infer<typeof defaultPaginateSchema>

export const regionDefaultSchema = z.object({
  province_id: z.object({
    label: requiredString,
    value: requiredString
  }),
  city_id: z.object({
    label: requiredString,
    value: requiredString
  }),
  district_id: z.object({
    label: requiredString,
    value: requiredString
  }),
  id_desa: z.object({
    label: requiredString,
    value: requiredString
  }),
  alamat: requiredString,
  latitude: z.number().optional(),
  longitude: z.number().optional()
})
export type RegionDefaultValues = z.infer<typeof regionDefaultSchema>

export const optionSchema = z.object({
  label: requiredString,
  value: requiredString,
  id: z.string().optional()
})
export const uriOptionSchema = z
  .string()
  .optional()
  .transform(val => uriToJson({ uri: val, schema: optionSchema }))

export interface Option {
  label: string
  value: string
  id?: string
}

export interface KoordinatType {
  latitude: string | null
  longitude: string | null
}

export type AppRoute = LinkComponentProps['to']
export type AppRouteId = RouteIds<(typeof router)['routeTree']>
