import { Suspense } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { PromptsTableHeader } from "./prompts-table-header";
import { PromptsTableSkeleton } from "./prompts-table-skeleton";
import { PromptTableRow } from "./prompt-table-row";
import { getPrompts } from "./actions";

async function PromptsTableContent() {
  const prompts = await getPrompts();

  return (
    <TableBody>
      {prompts.map((prompt) => (
        <PromptTableRow key={prompt.id} prompt={prompt} />
      ))}
    </TableBody>
  );
}

export function PromptsTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <PromptsTableHeader />
        <Suspense fallback={<PromptsTableSkeleton />}>
          <PromptsTableContent />
        </Suspense>
      </Table>
    </div>
  );
}
