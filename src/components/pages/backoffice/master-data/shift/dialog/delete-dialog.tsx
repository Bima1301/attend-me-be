"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ShiftDataType } from "@/api/master-data/shift/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/api";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shift: ShiftDataType | null;
}

export function DeleteDialog({ open, onOpenChange, shift }: DeleteDialogProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    ...api.masterData.shift.delete(),
    onMutate: () => {
      toast.loading("Menghapus shift...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Shift berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["shift"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    if (shift?.id) {
      deleteMutation.mutate({ ids: [shift.id] });
    }
  };

  const isLoading = deleteMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Shift</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus shift "{shift?.name}"? 
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
