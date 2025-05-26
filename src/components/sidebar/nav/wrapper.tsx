import { Suspense } from "react";
import { NavUser } from "./nav-user";
import { NavUserLoading } from "./loading";
import { getUserData } from "@/components/sidebar/actions";

async function NavUserAsync() {
  const user = await getUserData();
  return <NavUser user={user} />;
}

export function NavUserWrapper() {
  return (
    <Suspense fallback={<NavUserLoading />}>
      <NavUserAsync />
    </Suspense>
  );
}
