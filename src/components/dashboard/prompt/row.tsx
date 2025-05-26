import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { BrandList } from "@/components/brand-list";
import { PromptTags } from "./tags";
import type { Prompt } from "@/types/prompt";

interface PromptTableRowProps {
  prompt: Prompt;
}

export function PromptTableRow({ prompt }: PromptTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium max-w-xs">{prompt.content}</TableCell>
      <TableCell>
        <span className="font-medium">{prompt.visibilityScore}</span>
      </TableCell>
      <TableCell>
        <BrandList brands={prompt.top} />
      </TableCell>
      <TableCell>
        <PromptTags tags={prompt.tags} />
      </TableCell>
      <TableCell>{prompt.geoRegion}</TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {prompt.completedAt
          ? new Date(prompt.completedAt).toLocaleDateString()
          : "Pending"}
      </TableCell>
    </TableRow>
  );
}
