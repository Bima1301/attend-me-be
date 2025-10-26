"use client";

import { ShiftForm } from "../section/shift-form";
import type { ShiftDataType } from "@/api/master-data/shift/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shift?: ShiftDataType | null;
}

export function CreateEditDialog({ open, onOpenChange, shift }: CreateEditDialogProps) {
  const isEdit = !!shift;

  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Shift" : "Tambah Shift Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit 
              ? "Ubah informasi shift yang ada." 
              : "Tambahkan shift baru ke sistem."
            }
          </DialogDescription>
        </DialogHeader>

        <ShiftForm 
          shift={shift}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}