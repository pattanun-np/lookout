import { Pricing } from "@/components/pricing";
import { getUser } from "@/auth/server";

export default async function Page() {
  const user = await getUser();
  
  return <Pricing currentPlan={user?.plan || "free"} />;
}
