import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { BrandList } from "@/components/brand-list";
import { PromptTags } from "./prompt-tags";
import type { Prompt } from "@/lib/actions";

interface PromptTableRowProps {
  prompt: Prompt;
}

export function PromptTableRow({ prompt }: PromptTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium max-w-xs">{prompt.prompt}</TableCell>
      <TableCell>
        <span className="font-medium">{prompt.visibility}</span>
      </TableCell>
      <TableCell>
        <BrandList brands={prompt.top} />
      </TableCell>
      <TableCell>
        <PromptTags tags={prompt.tags} />
      </TableCell>
      <TableCell>{prompt.geo}</TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {prompt.created}
      </TableCell>
    </TableRow>
  );
}
