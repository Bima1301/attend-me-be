"use client";

import { useState } from "react";
import { ShiftHeader } from "../section/header";
import { ShiftTable } from "../table";
import { CreateEditDialog } from "../dialog/create-edit-dialog";
import { DeleteDialog } from "../dialog/delete-dialog";
import type { ShiftDataType } from "@/api/master-data/shift/types";

export default function ShiftPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftDataType | null>(null);

  const handleAddClick = () => {
    setSelectedShift(null);
    setCreateDialogOpen(true);
  };

  const handleEdit = (shift: ShiftDataType) => {
    setSelectedShift(shift);
    setEditDialogOpen(true);
  };

  const handleDelete = (shift: ShiftDataType) => {
    setSelectedShift(shift);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <ShiftHeader onAddClick={handleAddClick} />
          <ShiftTable onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <CreateEditDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        shift={null}
      />

      <CreateEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        shift={selectedShift}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        shift={selectedShift}
      />
    </div>
  );
}
