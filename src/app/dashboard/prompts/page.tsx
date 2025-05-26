import {
  PromptBreadcrumb,
  PromptToolbar,
  PromptsTable,
} from "@/components/dashboard";

export default function Page() {
  return (
    <>
      <PromptBreadcrumb />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <PromptToolbar />
        <PromptsTable />
      </div>
    </>
  );
}
