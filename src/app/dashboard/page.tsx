import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  DashboardHeader,
  DashboardToolbar,
  PromptsTable,
} from "@/components/dashboard";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DashboardToolbar />
          <PromptsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
