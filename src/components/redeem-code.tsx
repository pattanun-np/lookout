"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface RedeemCodeProps {
  currentPlan: string;
  onPlanUpdate?: (newPlan: string) => void;
}

export function RedeemCode({ currentPlan, onPlanUpdate }: RedeemCodeProps) {
  const [redeemCode, setRedeemCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(currentPlan === "enterprise");

  const handleRedeem = async () => {
    if (!redeemCode.trim()) {
      toast.error("Please enter a redeem code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redeemCode: redeemCode.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsRedeemed(true);
        setRedeemCode("");
        onPlanUpdate?.(data.plan);
      } else {
        toast.error(data.error || "Failed to redeem code");
      }
    } catch (error) {
      toast.error("An error occurred while redeeming the code");
    } finally {
      setIsLoading(false);
    }
  };

  if (isRedeemed) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Enterprise Access Active</CardTitle>
          </div>
          <CardDescription>
            You have successfully upgraded to Enterprise plan!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Enterprise Plan
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Redeem Enterprise Code</CardTitle>
        </div>
        <CardDescription>
          Enter your redeem code to upgrade to Enterprise plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Current: {currentPlan}
          </Badge>
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Enter your redeem code"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRedeem();
              }
            }}
            disabled={isLoading}
          />
          <Button
            onClick={handleRedeem}
            disabled={isLoading || !redeemCode.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redeeming...
              </>
            ) : (
              "Redeem Code"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}