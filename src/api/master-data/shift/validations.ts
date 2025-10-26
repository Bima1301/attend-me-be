import { z } from "zod"
import { requiredString } from "@/types/common"

export const mutationShiftSchema = z.object({
    shiftId: z.string().optional(),
    name: requiredString,
    clockIn: requiredString,
    clockOut: requiredString,
})
export type MutationShiftValues = z.infer<typeof mutationShiftSchema>
