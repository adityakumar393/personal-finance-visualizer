// src/components/forms/BudgetForm.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { budgetSchema } from "@/lib/validation";
import { CATEGORIES } from "@/lib/categories";
import { currentMonthId } from "@/lib/budget";
import useBudgets from "@/hooks/useBudgets";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} 
from "@/components/ui/select";
import { Button } from "@/components/ui/button";// assumes you re-export from an index file

/**
 * @param {{ preset?: object, defaultMonth?: string, onClose?: () => void }}
 */
export default function BudgetForm({ preset, defaultMonth, onClose }) {
  const monthNow = defaultMonth || currentMonthId();
  const { mutate } = useBudgets(preset?.month || monthNow);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: preset || {
      month: monthNow,
      category: "Food",
      amount: "",
    },
  });

  const [loading, setLoading] = useState(false);

  /** Save handler (POST for new, PUT for edit) */
  async function onSubmit(data) {
    setLoading(true);
    const method = preset?._id ? "PUT" : "POST";
    const url = preset?._id ? `/api/budgets/${preset._id}` : "/api/budgets";

    await fetch(url, { method, body: JSON.stringify(data) });
    await mutate(); // refresh SWR cache

    setLoading(false);
    reset();
    onClose?.();
  }

  /** Delete handler (only shows on edit mode) */
  async function handleDelete() {
    if (!preset?._id) return;
    const confirmed = confirm("Delete this budget?");
    if (!confirmed) return;

    setLoading(true);
    await fetch(`/api/budgets/${preset._id}`, { method: "DELETE" });
    await mutate();
    setLoading(false);
    onClose?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Month */}
      <Input {...register("month")} type="month" />

      {/* Category */}
      <Select
        defaultValue={preset?.category}
        onValueChange={(v) => setValue("category", v)}
        {...register("category")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.category && (
        <p className="text-red-600 text-sm">{errors.category.message}</p>
      )}

      {/* Amount */}
      <Input
        {...register("amount", { valueAsNumber: true })}
        placeholder="Amount (₹)"
        type="number"
      />
      {errors.amount && (
        <p className="text-red-600 text-sm">{errors.amount.message}</p>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving…" : "Save"}
        </Button>

        {preset?._id && (
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
