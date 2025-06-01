"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function StripeResult({
  success,
  canceled,
}: {
  success: boolean;
  canceled: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast.success("Payment successful! Your subscription is now active.");
    } else if (canceled) {
      toast.error("Payment could not be processed. You can try again anytime.");
    }

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
  }, [canceled, router, success]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
      <div className="text-center space-y-4 flex flex-col items-center">
        <Image
          src="/logo-sq.png"
          alt="Lookout"
          width={50}
          height={50}
          className="rounded-lg"
        />
        <div className="text-md text-muted-foreground flex items-center gap-2">
          <Loader2 className="animate-spin size-4" />
          {success && "Payment successful, redirecting to dashboard..."}
          {canceled && "Payment canceled, redirecting to pricing..."}
          {!success && !canceled && "Redirecting to dashboard..."}
        </div>
      </div>
    </div>
  );
}
