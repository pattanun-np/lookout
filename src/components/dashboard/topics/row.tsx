import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Topic } from "@/types/topic";
import { ImageAvatar } from "@/components/brand-list";

interface TopicTableRowProps {
  topic: Topic;
}

export function TopicTableRow({ topic }: TopicTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium max-w-xs">
        <div className="flex items-center gap-2">
          {topic.logo && <ImageAvatar title={topic.name} url={topic.logo} />}
          {topic.name}
        </div>
      </TableCell>
      <TableCell>
        <span className="font-medium">{topic.description}</span>
      </TableCell>
      <TableCell>{topic.isActive ? "Active" : "Inactive"}</TableCell>
    </TableRow>
  );
}
