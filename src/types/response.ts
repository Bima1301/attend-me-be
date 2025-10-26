import type { UseFormSetError } from "react-hook-form";

export type TResponse<T> = {
    content: T | null;
    message: string;
    errors:
    | Array<string>
    | null;
};

export type TResponseGetAll<T> = TResponse<{
    entries: Array<T>;
    totalData: number;
    totalPage: number;
}>;

// Excel file types
export type TExcelMimeTypes =
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    | "application/vnd.ms-excel" // .xls
    | "text/csv"; // .csv

export interface IApiError {
    message: string;
    errors?: Array<string>;
    status?: number;
    code?: string;
}

export interface IErrorHandlerOptions {
    showToast?: boolean;
    showValidationError?: boolean;
    setFormErrors?: UseFormSetError<any>;
    onCustomError?: (error: IApiError) => void;
    fallbackMessage?: string;
}

export interface IMutationErrorHandler {
    error: any;
    options?: IErrorHandlerOptions;
}
