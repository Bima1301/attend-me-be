import { z } from "zod";

export const filterTypeSchema = z
    .record(
        z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.undefined(),
            z.array(z.union([z.string(), z.number(), z.boolean()])),
        ])
    )
    .optional();
export const searchFilterTypeSchema = filterTypeSchema.optional();
export const rangedFilterTypeSchema = z
    .object({
        key: z.string(),
        start: z.union([z.string(), z.number()]),
        end: z.union([z.string(), z.number()]),
    })
    .array()
    .optional();
export const pageFilterTypeSchema = z.number().optional();
export const rowsFilterTypeSchema = z.number().optional();
export const orderKeyFilterTypeSchema = z.string().optional();
export const orderRuleFilterTypeSchema = z.enum(["asc", "desc"]).optional();

export const filterQueryParamsSchema = z.object({
    filters: filterTypeSchema,
    searchFilters: searchFilterTypeSchema,
    rangedFilters: rangedFilterTypeSchema,
    page: pageFilterTypeSchema,
    rows: rowsFilterTypeSchema,
    orderKey: orderKeyFilterTypeSchema,
    orderRule: orderRuleFilterTypeSchema,
    startDate: z.string().optional().nullable(),
    endDate: z.string().optional().nullable(),
});

export type FilterQueryParams = z.infer<typeof filterQueryParamsSchema>;
export type RangedFilterParams = z.infer<typeof rangedFilterTypeSchema>;
