import { Pricing } from "@/components/pricing";
import { getUser } from "@/auth/server";
import { PlanType } from "@/lib/stripe/server";

export default async function Page() {
  const user = await getUser();
  
  return <Pricing currentPlan={(user?.plan as PlanType) || "free"} />;
}
