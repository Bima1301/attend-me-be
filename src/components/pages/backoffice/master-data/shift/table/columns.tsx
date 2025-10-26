"use client";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { ShiftDataType } from "@/api/master-data/shift/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/components/atom/filter-atom";

interface ShiftColumnsProps {
  onEdit: (shift: ShiftDataType) => void;
  onDelete: (shift: ShiftDataType) => void;
}

export function createShiftColumns({ onEdit, onDelete }: ShiftColumnsProps): Array<ColumnDef<ShiftDataType>> {
  const { getTabFilter } = useFilterStore();
  const queryParams = getTabFilter("shift");

  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => {
        // Menghitung nomor urutan global berdasarkan halaman dan jumlah rows per halaman (pagination)
        const { page = 1, rows = 10 } = queryParams || {};
        const globalIndex = (page - 1) * rows + row.index + 1;
        return <div className="font-medium">{globalIndex}</div>;
      },
      size: 50,
      meta:{isCenter: true},
    },
    {
      accessorKey: "name",
      header: "Nama Shift",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("name")}</div>;
      },
    },
    {
      accessorKey: "clockIn",
      header: "Jam Masuk",
      cell: ({ row }) => {
        return <div>{row.getValue("clockIn")}</div>;
      },
    },
    {
      accessorKey: "clockOut",
      header: "Jam Keluar",
      cell: ({ row }) => {
        return <div>{row.getValue("clockOut")}</div>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const shift = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(shift)}
              className="h-8 w-8 p-0"
            >
              <IconEdit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(shift)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <IconTrash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
