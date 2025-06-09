"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createTopicFromUrl, CreateTopicState } from "./actions";
import { SubmitButton } from "@/components/submit-button";
import { useActionState, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateTopicDialogProps {
  children: React.ReactNode;
}

const initialState: CreateTopicState = {};

export function CreateTopicDialog({ children }: CreateTopicDialogProps) {
  const [state, formAction] = useActionState(createTopicFromUrl, initialState);
  const [open, setOpen] = useState(false);

  // Close dialog on successful creation
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state?.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
            <DialogDescription>
              Enter a website URL to automatically create a topic with extracted
              information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="url" className="text-sm font-medium">
                Website URL
              </label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://google.com"
                required
                autoFocus
              />
            </div>
            {state?.error && (
              <div
                className={cn(
                  "flex items-start gap-3 p-4 border rounded-lg",
                  "bg-destructive/5 border-destructive/20 text-destructive"
                )}
              >
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Error</p>
                  <p className="text-sm opacity-80">{state.error}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <SubmitButton
              loadingText="Creating..."
              buttonText="Create Topic"
              icon="plus"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
