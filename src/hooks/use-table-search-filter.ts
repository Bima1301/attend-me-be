

"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useFilterStore } from "@/components/atom/filter-atom";

interface UseTableSearchFilterProps {
    tabKey: string;
    searchKeys: Array<string>;
}

export function useTableSearchFilter({
    tabKey,
    searchKeys,
}: UseTableSearchFilterProps) {
    const { getTabFilter, setTabFilter } = useFilterStore();
    const rawQueryParams = getTabFilter(tabKey);
    const queryParams = rawQueryParams ?? {
        filters: undefined,
        searchFilters: undefined,
        rangedFilters: undefined,
        page: 1,
        rows: 10,
        orderKey: undefined,
        orderRule: undefined,
        startDate: undefined,
        endDate: undefined
    };
    const [searchValue, setSearchValue] = useState(
        String(queryParams.searchFilters?.search || "")
    );
    const [debouncedSearch] = useDebouncedValue(searchValue, 300);

    useEffect(() => {
        const newSearchFilters = { ...queryParams.searchFilters ?? {} };
        if (debouncedSearch.trim()) {
            searchKeys.forEach((key) => {
                newSearchFilters[key] = debouncedSearch;
            });
        } else {
            searchKeys.forEach((key) => {
                delete newSearchFilters[key];
            });
        }
        setTabFilter(tabKey, {
            ...queryParams,
            searchFilters: newSearchFilters,
        });
    }, [debouncedSearch]);

    return { queryParams, searchValue, setSearchValue };
}
