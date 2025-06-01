"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";

interface StripeResultPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function StripeResultPage({ searchParams }: StripeResultPageProps) {
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const success = searchParams?.success === "true";
    const canceled = searchParams?.canceled === "true";

    if (success) {
      setToast({
        message: "Payment successful! Your subscription is now active.",
        type: "success",
      });
    } else if (canceled) {
      setToast({
        message: "Payment could not be processed. You can try again anytime.",
        type: "error",
      });
    }

    // Auto redirect after 3 seconds or if no stripe params
    const redirectTimer = setTimeout(
      () => {
        if (success || (!success && !canceled)) {
          router.push("/dashboard");
        } else if (canceled) {
          router.push("/dashboard/pricing");
        }
      },
      success || canceled ? 3000 : 100
    );

    return () => clearTimeout(redirectTimer);
  }, [searchParams, router]);

  const handleCloseToast = () => {
    setToast(null);
    // Redirect immediately when user closes toast
    const success = searchParams?.success === "true";
    const canceled = searchParams?.canceled === "true";

    if (success || (!success && !canceled)) {
      router.push("/dashboard");
    } else if (canceled) {
      router.push("/dashboard/pricing");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
      {toast && <Toast {...toast} onClose={handleCloseToast} />}
      <div className="text-center space-y-4">
        <div className="text-lg text-muted-foreground">
          {searchParams?.success === "true" &&
            "Processing your subscription..."}
          {searchParams?.canceled === "true" && "Redirecting you back..."}
          {!searchParams?.success &&
            !searchParams?.canceled &&
            "Redirecting..."}
        </div>
      </div>
    </div>
  );
}
