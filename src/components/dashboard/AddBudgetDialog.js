// src/components/dashboard/AddBudgetDialog.js
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BudgetForm from "@/components/forms/BudgetForm";

export default function AddBudgetDialog({ defaultMonth }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Set Budget</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Budget</DialogTitle>
          <DialogDescription>
            Choose a month, category, and spending limit.
          </DialogDescription>
        </DialogHeader>

        <BudgetForm
          defaultMonth={defaultMonth}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
