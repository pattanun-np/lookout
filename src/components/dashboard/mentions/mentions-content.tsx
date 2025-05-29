import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMentions, analyzeMentions } from "./actions";
import { RefreshButton } from "./refresh-button";
import { formatDistanceToNow } from "date-fns";

export async function MentionsContent() {
  const mentions = await getMentions();

  const handleRefresh = async () => {
    "use server";
    await analyzeMentions();
  };

  const stats = {
    total: mentions.length,
    direct: mentions.filter((m) => m.mentionType === "direct").length,
    indirect: mentions.filter((m) => m.mentionType === "indirect").length,
    competitive: mentions.filter((m) => m.mentionType === "competitive").length,
    positive: mentions.filter((m) => m.sentiment === "positive").length,
    negative: mentions.filter((m) => m.sentiment === "negative").length,
    neutral: mentions.filter((m) => m.sentiment === "neutral").length,
  };

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Brand Mentions Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Track how your brand appears across AI responses
          </p>
        </div>
        <form action={handleRefresh}>
          <RefreshButton />
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Mentions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Direct Mentions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.direct}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.competitive}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Positive Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.positive}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mentions</CardTitle>
          <CardDescription>
            All mentions found across your prompts and AI responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mentions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No mentions found yet.</p>
              <p className="text-sm">
                Click &quot;Refresh Analysis&quot; to analyze your existing
                prompt results.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mentions.map((mention) => (
                <div
                  key={mention.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            mention.mentionType === "direct"
                              ? "default"
                              : mention.mentionType === "competitive"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {mention.mentionType}
                        </Badge>
                        {mention.sentiment === "positive" && (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        )}
                        {mention.sentiment === "negative" && (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        {mention.sentiment === "neutral" && (
                          <Minus className="h-4 w-4 text-gray-600" />
                        )}
                        <Badge variant="outline">{mention.model}</Badge>
                      </div>
                      <p className="font-medium">{mention.topic.name}</p>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(mention.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Extracted Text:
                      </p>
                      <p className="text-sm bg-muted p-2 rounded">
                        {mention.extractedText}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Context:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {mention.context}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Position: #{mention.position}</span>
                    <span>
                      Confidence:{" "}
                      {(parseFloat(mention.confidence || "0") * 100).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
