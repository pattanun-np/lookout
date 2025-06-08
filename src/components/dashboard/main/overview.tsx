import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  BarChart3,
  Shield,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileText,
  Share2,
} from "lucide-react";
import { type DashboardData } from "./actions";

// Enhanced Progress component with better styling
function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`bg-slate-100 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-in-out rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  format = "number",
}: {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  format?: "number" | "percentage" | "score";
}) {
  const formatValue = (val: number) => {
    switch (format) {
      case "percentage":
        return `${val}%`;
      case "score":
        return `${val}/100`;
      default:
        return val.toLocaleString();
    }
  };

  const getTrendStyles = () => {
    switch (trend) {
      case "up":
        return {
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          icon: ArrowUpRight,
        };
      case "down":
        return {
          color: "text-red-500",
          bg: "bg-red-50",
          border: "border-red-200",
          icon: ArrowDownRight,
        };
      default:
        return {
          color: "text-slate-500",
          bg: "bg-slate-50",
          border: "border-slate-200",
          icon: Target,
        };
    }
  };

  const trendStyles = getTrendStyles();
  const TrendIcon = trendStyles.icon;

  return (
    <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-600 tracking-wide">
            {title}
          </CardTitle>
          <div className="p-2 bg-slate-50 rounded-lg">
            <Icon className="h-4 w-4 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-3xl font-bold text-slate-900 tracking-tight">
            {formatValue(value)}
          </div>
          <div
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${trendStyles.bg} ${trendStyles.border} ${trendStyles.color} border`}
          >
            <TrendIcon className="h-3 w-3 mr-1" />
            {Math.abs(change)}% from last month
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BrandHealthCard({
  brandHealth,
}: {
  brandHealth: { positive: number; neutral: number; negative: number };
}) {
  const { positive, neutral, negative } = brandHealth;

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Shield className="h-5 w-5 text-emerald-600" />
          </div>
          Brand Health Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-4">
          <div className="text-4xl font-bold text-emerald-600 mb-2">
            {positive}%
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Overall Positive Sentiment
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Positive
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {positive}%
              </span>
            </div>
            <Progress value={positive} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Neutral
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {neutral}%
              </span>
            </div>
            <div className="bg-slate-100 rounded-full overflow-hidden h-2">
              <div
                className="bg-slate-400 h-full transition-all duration-500 ease-in-out rounded-full"
                style={{ width: `${neutral}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Negative
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {negative}%
              </span>
            </div>
            <div className="bg-slate-100 rounded-full overflow-hidden h-2">
              <div
                className="bg-red-500 h-full transition-all duration-500 ease-in-out rounded-full"
                style={{ width: `${negative}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CompetitorAnalysisCard({
  competitors,
  brandMentions,
  visibilityScore,
}: {
  competitors: Array<{ name: string; mentions: number; sentiment: number }>;
  brandMentions: number;
  visibilityScore: number;
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          Competitive Positioning
        </CardTitle>
        <CardDescription className="text-slate-500">
          How you rank against top competitors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Your Brand - Highlighted */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="w-7 h-7 p-0 flex items-center justify-center bg-blue-600 hover:bg-blue-600">
                1
              </Badge>
              <div>
                <p className="font-semibold text-slate-900">Your Brand</p>
                <p className="text-sm text-blue-600 font-medium">
                  {brandMentions} mentions
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-blue-600">
                {visibilityScore}%
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">
                sentiment
              </div>
            </div>
          </div>
        </div>

        {/* Competitors */}
        <div className="space-y-3">
          {competitors.map((competitor, index) => (
            <div
              key={competitor.name}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="w-7 h-7 p-0 flex items-center justify-center border-slate-300 text-slate-600"
                >
                  {index + 2}
                </Badge>
                <div>
                  <p className="font-medium text-slate-900">
                    {competitor.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {competitor.mentions.toLocaleString()} mentions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">
                  {competitor.sentiment}%
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  sentiment
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertsCard({
  alerts,
}: {
  alerts: Array<{
    type: "warning" | "success" | "info";
    message: string;
    time: string;
  }>;
}) {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-200",
        };
      case "success":
        return {
          icon: CheckCircle2,
          iconColor: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
        };
      default:
        return {
          icon: Target,
          iconColor: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        };
    }
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type);
          const Icon = styles.icon;

          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg border ${styles.bg} ${styles.border}`}
            >
              <div className="p-1">
                <Icon className={`h-4 w-4 ${styles.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 leading-5">
                  {alert.message}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {alert.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ModelPerformanceCard({
  modelPerformance,
}: {
  modelPerformance: Record<
    string,
    { mentions: number; visibilityScore: number; sentiment: number }
  >;
}) {
  const models = Object.entries(modelPerformance);

  const getModelIcon = () => {
    // You could add specific model icons here
    return Bot;
  };

  return (
    <Card className="col-span-full border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Bot className="h-5 w-5 text-indigo-600" />
          </div>
          AI Model Performance
        </CardTitle>
        <CardDescription className="text-slate-500">
          Brand visibility across different AI engines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map(([model, data]) => {
            const ModelIcon = getModelIcon();
            return (
              <div
                key={model}
                className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ModelIcon className="h-4 w-4 text-slate-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 capitalize">
                    {model.replace("gpt4", "GPT-4")}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-600">Mentions</span>
                      <span className="font-semibold text-slate-900">
                        {data.mentions.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Visibility</span>
                      <span className="font-semibold text-slate-900">
                        {data.visibilityScore}%
                      </span>
                    </div>
                    <Progress value={data.visibilityScore} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Sentiment</span>
                      <span
                        className={`font-semibold ${
                          data.sentiment > 65
                            ? "text-emerald-600"
                            : data.sentiment > 55
                            ? "text-amber-600"
                            : "text-red-500"
                        }`}
                      >
                        {data.sentiment}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardOverviewContent({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Brand Mentions"
          value={data.kpis.totalBrandMentions.value}
          change={data.kpis.totalBrandMentions.change}
          trend={data.kpis.totalBrandMentions.trend}
          icon={Eye}
        />
        <KPICard
          title="Visibility Score"
          value={data.kpis.visibilityScore.value}
          change={data.kpis.visibilityScore.change}
          trend={data.kpis.visibilityScore.trend}
          icon={BarChart3}
          format="percentage"
        />
        <KPICard
          title="Competitor Gap"
          value={data.kpis.competitorGap.value}
          change={data.kpis.competitorGap.change}
          trend={data.kpis.competitorGap.trend}
          icon={Trophy}
          format="percentage"
        />
        <KPICard
          title="AI Engines"
          value={data.kpis.aiEnginesTracked.value}
          change={data.kpis.aiEnginesTracked.change}
          trend={data.kpis.aiEnginesTracked.trend}
          icon={Bot}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <BrandHealthCard brandHealth={data.brandHealth} />
        <CompetitorAnalysisCard
          competitors={data.topCompetitors}
          brandMentions={data.kpis.totalBrandMentions.value}
          visibilityScore={data.kpis.visibilityScore.value}
        />
        <AlertsCard alerts={data.recentAlerts} />
      </div>

      {/* Model Performance */}
      <ModelPerformanceCard modelPerformance={data.modelPerformance} />

      {/* Quick Actions */}
      <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            Dashboard Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center space-x-3">
                <Download className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900">Export Data</p>
                  <p className="text-sm text-slate-600">
                    Download comprehensive analytics
                  </p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-emerald-600" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900">
                    Generate Report
                  </p>
                  <p className="text-sm text-slate-600">
                    Create summary for stakeholders
                  </p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center space-x-3">
                <Share2 className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900">Share Insights</p>
                  <p className="text-sm text-slate-600">
                    Distribute key findings
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardOverview({ data }: { data: DashboardData }) {
  return <DashboardOverviewContent data={data} />;
}
