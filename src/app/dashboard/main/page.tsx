import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getTopics } from "@/components/dashboard/topics/data";

import { Building2, BarChart3, Plus, ArrowRight } from "lucide-react";
import { DashboardBreadcrumb } from "@/components/dashboard/main/breadcrumb";
import { ImageAvatar } from "@/components/brand-list";
import Link from "next/link";

async function TopicSelectionStep() {
  const topics = await getTopics();

  if (topics.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Welcome to LookOut
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Create your first topic to start tracking your brand&apos;s AI
            visibility and generate insights.
          </p>
          <Link
            href="/dashboard/topics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Create Your First Topic
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Select a Topic
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto">
          Choose a topic to view comprehensive analytics and strategic insights
        </p>
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/dashboard/main/${topic.id}`}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6 bg-white rounded-2xl border border-slate-200/50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {topic.logo ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-slate-100 group-hover:ring-blue-200 transition-all duration-300">
                      <ImageAvatar url={topic.logo} title={topic.name} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                      <Building2 className="h-6 w-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-900 transition-colors duration-300">
                    {topic.name}
                  </h3>
                  {topic.description && (
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {topic.description}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-all duration-300">
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopicSelectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border border-slate-200/50"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <DashboardBreadcrumb />
      <div className="flex flex-1 flex-col gap-8 p-6 pt-0 max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full translate-y-24 -translate-x-24" />

          <div className="relative px-8 py-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="h-4 w-4" />
              Analytics Dashboard
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Brand Intelligence
              <span className="block text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Track your brand&apos;s visibility across AI search engines and
              gain strategic insights to enhance your digital presence
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          <Suspense fallback={<TopicSelectionSkeleton />}>
            <TopicSelectionStep />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
