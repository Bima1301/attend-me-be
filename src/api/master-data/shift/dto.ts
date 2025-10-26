import type { ShiftDataType } from "./types";
import type { MutationShiftValues } from "./validations";

export function shifttToFormValues(
    shift: ShiftDataType
): MutationShiftValues {
    return {
        name: shift.name || '',
        clockIn: shift.clockIn || '',
        clockOut: shift.clockOut || '',
    }
}