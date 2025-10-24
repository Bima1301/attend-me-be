import type {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions
} from '@tanstack/react-query'

import type { TResponse, TResponseGetAll } from './response'

export type ServiceQueryKey = (
  key?: string | Record<string, any>
) => readonly [string, string | Record<string, any> | undefined]
export type ServiceQueryKeyType = ReturnType<ServiceQueryKey>

export type ServiceQueryOptionType<T> = UseQueryOptions<
  T,
  Error,
  T,
  ServiceQueryKeyType
> &
  UseSuspenseQueryOptions<T, Error, T, ServiceQueryKeyType>

// Updated InfiniteQueryOptionType to properly handle InfiniteData structure
export type ServiceInfiniteQueryOptionType<T> = UseInfiniteQueryOptions<
  T,
  Error,
  T,
  ServiceQueryKeyType
>

// New type for handling the return type of useInfiniteQuery
export type ServiceInfiniteData<T> = InfiniteData<T>

export type ServiceGetAllResponse<T> = TResponseGetAll<T>
export type ServiceGetByIdResponse<T> = TResponse<T>

export type ServiceMutationOptionType<TResponse, TData> = UseMutationOptions<
  TResponse,
  Error,
  TData
>
