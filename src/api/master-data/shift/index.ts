import type { ShiftDataType } from "./types";
import type { TResponse, TResponseGetAll } from "@/types/response";
import type { MutationShiftValues } from "./validations";
import type { FilterQueryParams } from "@/types/queryParamsValidationTypes";
import { transformParams } from "@/lib/utils";
import { api, getError } from "@/lib/axios";

const QUERY_KEY = (
    key?: string | FilterQueryParams | Record<string, unknown>
) => ["shift", key] as const;

const getAll = (params?: FilterQueryParams) => ({
    queryKey: QUERY_KEY(params),
    queryFn: async () => {
        try {
            const response = await api.get<TResponseGetAll<ShiftDataType>>(
                "/master-data/shifts",
                {
                    params: transformParams(params),
                }
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getAllInfinite = (params?: Record<string, any>) => ({
    queryKey: QUERY_KEY({ ...params, type: "shift" }),
    initialPageParam: 1,
    getNextPageParam: (
        lastPage: TResponseGetAll<Array<ShiftDataType>>,
        allPages: Array<any>
    ) => {
        const meta = lastPage.content;
        if (!meta) return undefined;

        const currentPage = allPages.length;
        const totalPages = meta.totalPage ;

        return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    queryFn: async ({ pageParam }: { pageParam: number }) => {
        try {
            const { _, ...otherParams } = params || {};

            const response = await api.get<TResponseGetAll<Array<ShiftDataType>>>(
                `/master-data/shifts`,
                {
                    params: {
                        ...otherParams,
                        ...(params?.searchFilters &&
                            Object.values(params.searchFilters).some(
                                (v) => v !== null && v !== "" && v !== undefined
                            )
                            ? {
                                searchFilters: JSON.stringify(
                                    params.searchFilters
                                ),
                            }
                            : {}),
                        page: pageParam,
                    },
                }
            );

            return {
                message: response.data.message,
                content: response.data.content,
            };
        } catch (error) {
            throw getError(error);
        }
    },
});

const getById = (id: string) => ({
    queryKey: QUERY_KEY(id),
    queryFn: async () => {
        try {
            const response = await api.get<TResponse<ShiftDataType>>(
                `/master-data/shifts/${id}`
            );
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: MutationShiftValues) => {
        try {
            const response = await api.post<TResponse<ShiftDataType>>(
                "/master-data/shifts",
                {
                    ...data,
                }
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = () => ({
    mutationFn: async (data: MutationShiftValues) => {
        try {
            const response = await api.put<TResponse<ShiftDataType>>(
                `/master-data/shifts/${data.shiftId}`,
                {
                    ...data,
                    shiftId: undefined,
                }
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const deleteData = () => ({
    mutationFn: async (params: { ids: Array<string> }) => {
        try {
            const response = await api.delete<TResponse<ShiftDataType>>(
                `/master-data/shifts`,
                {
                    params: {
                        ids: JSON.stringify(params.ids),
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});


export const shift = {
    getAll,
    getAllInfinite,
    getById,
    create,
    update,
    delete: deleteData,
};
