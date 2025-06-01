import { Onboarding } from "@/components/onboarding";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <Onboarding searchParams={params} />;
}
