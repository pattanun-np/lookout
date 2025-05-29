import { Suspense } from "react";
import { MentionsContent } from "@/components/dashboard/mentions/mentions-content";
import { MentionsPageSkeleton } from "@/components/dashboard/mentions/skeleton";

export default function MentionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mentions</h2>
      </div>
      <Suspense fallback={<MentionsPageSkeleton />}>
        <MentionsContent />
      </Suspense>
    </div>
  );
}
