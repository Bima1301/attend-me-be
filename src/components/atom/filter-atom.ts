import { create } from 'zustand';
import type { FilterQueryParams } from '@/types/queryParamsValidationTypes';

const defaultFilterState: FilterQueryParams = {
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

interface FilterStore {
    tabFilters: Record<string, FilterQueryParams>;
    getTabFilter: (tabId: string) => FilterQueryParams | undefined;
    setTabFilter: (tabId: string, newValue: Partial<FilterQueryParams>) => void;
    resetTabFilter: (tabId: string) => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
    tabFilters: {},

    getTabFilter: (tabId: string) => {
        const { tabFilters } = get();
        return tabFilters[tabId] ?? defaultFilterState;
    },

    setTabFilter: (tabId: string, newValue: Partial<FilterQueryParams>) => {
        const { tabFilters } = get();
        const currentTabState = tabFilters[tabId] ?? defaultFilterState;

        set({
            tabFilters: {
                ...tabFilters,
                [tabId]: {
                    ...currentTabState,
                    ...newValue
                }
            }
        });
    },

    resetTabFilter: (tabId: string) => {
        const { tabFilters } = get();
        set({
            tabFilters: {
                ...tabFilters,
                [tabId]: defaultFilterState
            }
        });
    }
}));