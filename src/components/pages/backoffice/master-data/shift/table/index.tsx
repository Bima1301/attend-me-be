"use client";

import { useQuery } from "@tanstack/react-query";
import { createShiftColumns } from "./columns";
import type { ShiftDataType } from "@/api/master-data/shift/types";
import { DataTable } from "@/components/ui/data-table";
import { useFilterStore } from "@/components/atom/filter-atom";
import { api } from "@/api";

interface ShiftTableProps {
  onEdit: (shift: ShiftDataType) => void;
  onDelete: (shift: ShiftDataType) => void;
}

export function ShiftTable({ onEdit, onDelete }: ShiftTableProps) {
  const { getTabFilter, setTabFilter } = useFilterStore();
  const queryParams = getTabFilter("shift") || { page: 1, rows: 10 };

  const { data, isLoading, error } = useQuery({
    ...api.masterData.shift.getAll(queryParams),
  });

  const columns = createShiftColumns({ onEdit, onDelete });

  const handleFilterChange = (newFilters: Partial<typeof queryParams>) => {
    setTabFilter("shift", { ...queryParams, ...newFilters });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-destructive">Error loading data: {error.message}</p>
      </div>
    );
  }

  const tableData = Array.isArray(data?.content?.entries) ? data.content.entries : [];

  return (
    <div className="px-4 lg:px-6">
      <DataTable
        data={tableData}
        columns={columns}
        enablePagination={true}
        enableColumnVisibility={true}
        isLoading={isLoading}
        filters={queryParams}
        setFilters={handleFilterChange}
        totalRows={data?.content?.totalData || 0}
      />
    </div>
  );
}
