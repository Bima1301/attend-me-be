"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ShiftDataType } from "@/api/master-data/shift/types";
import type {MutationShiftValues} from "@/api/master-data/shift/validations";
import type { IApiError } from "@/types/response";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/api";
import {  mutationShiftSchema } from "@/api/master-data/shift/validations";

interface ShiftFormProps {
  shift?: ShiftDataType | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ShiftForm({ shift, onSuccess, onCancel }: ShiftFormProps) {
  const queryClient = useQueryClient();
  const isEdit = !!shift;

  const form = useForm<MutationShiftValues>({
    resolver: zodResolver(mutationShiftSchema),
    defaultValues: {
      name: shift?.name || "",
      clockIn: shift?.clockIn || "",
      clockOut: shift?.clockOut || "",
      shiftId: shift?.id || undefined,
    },
  });

  const createMutation = useMutation({
    ...api.masterData.shift.create(),
    onMutate: () => {
      toast.loading("Menyimpan shift...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Shift berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["shift"] });
      onSuccess();
    },
    onError: (error : IApiError) => {
      toast.dismiss();
      toast.error(error.errors?.[0] || error.message);
    },
  });

  const updateMutation = useMutation({
    ...api.masterData.shift.update(),
    onMutate: () => {
      toast.loading("Memperbarui shift...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Shift berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["shift"] });
      onSuccess();
    },
    onError: (error : IApiError) => {
      toast.dismiss();
      toast.error(error.errors?.[0] || error.message);
    },
  });

  const onSubmit = (data: MutationShiftValues) => {
    if (isEdit) {
      updateMutation.mutate({ ...data, shiftId: shift.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Nama Shift</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama shift" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clockIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Jam Masuk</FormLabel>
              <FormControl>
                <Input 
                  type="time" 
                  placeholder="HH:MM" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clockOut"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Jam Keluar</FormLabel>
              <FormControl>
                <Input 
                  type="time" 
                  placeholder="HH:MM" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : isEdit ? "Perbarui" : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
