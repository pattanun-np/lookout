import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Lightbulb } from "lucide-react";
import { CreateTopicDialog } from "./create-dialog";
import { TopicSuggestionsDialog } from "./suggestions-dialog";

export function TopicsToolbar() {
  return (
    <div className="flex items-center justify-between flex-col gap-2 sm:flex-row">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by topic name" className="pl-9" />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <CreateTopicDialog>
          <Button variant="default" size="sm" className="gap-2 flex-1">
            <Plus className="h-4 w-4" />
            Create Topic
          </Button>
        </CreateTopicDialog>
        <TopicSuggestionsDialog>
          <Button variant="outline" size="sm" className="gap-2 flex-1">
            <Lightbulb className="h-4 w-4" />
            Suggestions
          </Button>
        </TopicSuggestionsDialog>
      </div>
    </div>
  );
}
