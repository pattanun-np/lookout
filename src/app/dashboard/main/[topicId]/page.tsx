import { DashboardOverview } from "@/components/dashboard/main/overview";
import { ROIAnalytics } from "@/components/dashboard/main/roi-analytics";
import { getDashboardData } from "@/components/dashboard/main/actions";
import { DashboardBreadcrumb } from "@/components/dashboard/main/breadcrumb";
import { DashboardClient } from "@/components/dashboard/main/client";

export default async function DashboardTopicPage({
  params,
}: {
  params: { topicId: string };
}) {
  const { topicId } = params;
  const data = await getDashboardData(topicId);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardBreadcrumb topicId={topicId} />

      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <DashboardClient
          overview={<DashboardOverview data={data} />}
          roiAnalytics={
            <ROIAnalytics
              monthlyLeads={data.roiData.monthlyLeads}
              costPerLead={data.roiData.costPerLead}
              revenueBreakdown={data.roiData.revenueBreakdown}
              competitiveAdvantage={data.roiData.competitiveAdvantage}
              futureProjections={data.roiData.futureProjections}
            />
          }
        />
      </div>
    </div>
  );
}
