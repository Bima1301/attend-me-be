import {  clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type {ClassValue} from 'clsx';
import type { ZodSchema, z } from 'zod';
import type { FilterQueryParams } from '@/types/queryParamsValidationTypes';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const transformParams = (params?: FilterQueryParams) => {
  return Object.entries(params || {}).reduce((acc, [key, value]) => {
    if (typeof value === "object") {
      acc[key] = JSON.stringify(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, unknown>);
};

export function uriToJson<T extends ZodSchema<any>>({
  uri,
  schema
}: {
  uri?: string
  schema: T
}) {
  if (!uri) return undefined

  const decoded = JSON.parse(decodeURIComponent(uri))
  const parsed = schema.safeParse(decoded)

  if (!parsed.success) return undefined

  return parsed.data as z.infer<T>
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}