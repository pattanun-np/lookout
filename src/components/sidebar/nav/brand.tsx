import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { getUser } from "@/auth/server";
import { getUserSubscription } from "@/lib/subscription";
import { PLANS } from "@/lib/stripe/server";

export async function BrandComp() {
  const user = await getUser();
  let planName = "Free Plan";

  if (user) {
    const subscription = await getUserSubscription(user.id);
    if (subscription) {
      planName = PLANS[subscription.plan].name + " Plan";
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg mr-1">
            <Image
              src="/logo-sq.png"
              alt="Lookout"
              className="size-8 object-contain rounded-lg"
              width={50}
              height={50}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Lookout</span>
            <span className="truncate text-xs">{planName}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
