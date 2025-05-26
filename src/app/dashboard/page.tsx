import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const prompts = [
  {
    id: 1,
    prompt: "Most efficient electric cars 2024",
    visibility: "42%",
    top: "1 3",
    tags: ["Add Tags"],
    geo: "Global",
    created: "2 days ago",
    status: "active",
  },
  {
    id: 2,
    prompt: "Beste Elektroautos für Familien",
    visibility: "38%",
    top: "1 3",
    tags: ["Safety Features", "Competitive", "Pricing"],
    geo: "DE",
    created: "4 days ago",
    status: "active",
  },
  {
    id: 3,
    prompt: "EV safety features comparison",
    visibility: "35%",
    top: "1 3",
    tags: ["Pricing", "Features", "Reviews", "Technical"],
    geo: "Global",
    created: "3 days ago",
    status: "active",
  },
  {
    id: 4,
    prompt: "Top electric vehicle brands",
    visibility: "33%",
    top: "2 3",
    tags: ["EV Range"],
    geo: "JP",
    created: "9 days ago",
    status: "active",
  },
  {
    id: 5,
    prompt: "Wie funktioniert Autopilot?",
    visibility: "31%",
    top: "12",
    tags: ["Pricing", "Market Share", "Performance"],
    geo: "DE",
    created: "10 days ago",
    status: "active",
  },
  {
    id: 6,
    prompt: "Best charging network reviews",
    visibility: "30%",
    top: "1 3",
    tags: ["Technical", "Reviews", "EV Range"],
    geo: "USA",
    created: "13 days ago",
    status: "active",
  },
  {
    id: 7,
    prompt: "Electric vs hybrid technology",
    visibility: "30%",
    top: "2 3",
    tags: ["Pricing", "Competitive"],
    geo: "Global",
    created: "15 days ago",
    status: "active",
  },
  {
    id: 8,
    prompt: "EV incentives and tax benefits",
    visibility: "28%",
    top: "2 1",
    tags: ["Technical", "EV Range", "Performance"],
    geo: "EU",
    created: "16 days ago",
    status: "active",
  },
  {
    id: 9,
    prompt: "Top electric vehicle brands",
    visibility: "27%",
    top: "2 3",
    tags: ["Safety Features", "Reviews", "Technical"],
    geo: "CN",
    created: "Yesterday",
    status: "active",
  },
  {
    id: 10,
    prompt: "Most reliable car manufacturers",
    visibility: "26%",
    top: "2 1",
    tags: ["Add Tags"],
    geo: "Global",
    created: "19 days ago",
    status: "active",
  },
  {
    id: 11,
    prompt: "Battery longevity in EVs",
    visibility: "25%",
    top: "1 3",
    tags: ["Features", "Reviews", "Performance"],
    geo: "Global",
    created: "20 days ago",
    status: "active",
  },
  {
    id: 12,
    prompt: "Luxury car maintenance costs",
    visibility: "24%",
    top: "2 3",
    tags: ["Pricing"],
    geo: "DE",
    created: "22 days ago",
    status: "active",
  },
  {
    id: 13,
    prompt: "Most advanced driver assistance systems",
    visibility: "23%",
    top: "2 1",
    tags: ["Safety Features", "Technical"],
    geo: "USA",
    created: "Today",
    status: "active",
  },
];

const getTagVariant = (tag: string) => {
  switch (tag) {
    case "Safety Features":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Competitive":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Pricing":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Features":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "Reviews":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "Technical":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    case "EV Range":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Performance":
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
    case "Market Share":
      return "bg-pink-100 text-pink-800 hover:bg-pink-100";
    case "Add Tags":
      return "bg-gray-50 text-gray-500 hover:bg-gray-50 border border-dashed border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-red-600">
                    Tesla
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Prompts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="relative min-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by prompt name" className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Prompt
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                Suggest Prompts
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Top</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>GEO</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompts.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium max-w-xs">
                      {prompt.prompt}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{prompt.visibility}</span>
                    </TableCell>
                    <TableCell>{prompt.top}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className={`text-xs ${getTagVariant(tag)}`}
                          >
                            {tag === "Add Tags" && (
                              <Plus className="h-3 w-3 mr-1" />
                            )}
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{prompt.geo}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {prompt.created}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
