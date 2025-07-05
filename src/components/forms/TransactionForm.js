"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import useTransactions from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";   // from shadcn add
import { Input } from "@/components/ui/input";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/categories";

export default function TransactionForm({ preset, onClose }) {
  const { mutate } = useTransactions();
  const { register, handleSubmit, reset, setValue, formState } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: preset || {
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    },
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    const method = preset?._id ? "PUT" : "POST";
    const url = preset?._id
      ? `/api/transactions/${preset._id}`
      : "/api/transactions";

    await fetch(url, { method, body: JSON.stringify(data) });
    await mutate();          // refresh list
    reset();                 // clear form
    setLoading(false);
    onClose?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input {...register("amount", { valueAsNumber: true })} placeholder="Amount (-ve = expense)" type="number" />
      {formState.errors.amount && <p className="text-red-600 text-sm">{formState.errors.amount.message}</p>}

      <Input {...register("date")} type="date" />
      {formState.errors.date && <p className="text-red-600 text-sm">{formState.errors.date.message}</p>}

      <Input {...register("description")} placeholder="Description" />


      {/* Category */}
   <Select
     defaultValue={preset?.category}
     onValueChange={(val) => setValue("category", val)}
   >
     <SelectTrigger>
       <SelectValue placeholder="Select category" />
     </SelectTrigger>
     <SelectContent>
       {CATEGORIES.map((c) => (
         <SelectItem key={c} value={c}>
           {c}
         </SelectItem>
       ))}
     </SelectContent>
   </Select>
   {formState.errors.category && (
     <p className="text-red-600 text-sm">{formState.errors.category.message}</p>
   )}

      <Button disabled={loading} className="w-full">
        {loading ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
