import { StripeResultPage } from "@/components/stripe-result-page";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  return <StripeResultPage searchParams={searchParams} />;
}
