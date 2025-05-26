import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Brand {
  name: string;
  logo?: string;
}

interface BrandListProps {
  brands: Brand[];
  className?: string;
}

function BrandAvatar({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <Image
        src={`https://img.logo.dev/${brand.logo}?token=${config.logoDevApi}`}
        alt={brand.name}
        className="w-6 h-6 rounded object-cover border border-gray-200"
        width={24}
        height={24}
      />
    );
  }

  return (
    <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center text-xs font-medium text-gray-100">
      {brand.name.charAt(0).toUpperCase()}
    </div>
  );
}

export function BrandList({ brands, className }: BrandListProps) {
  if (brands.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {brands.map((brand, index) => (
        <div key={index} className="flex items-center gap-1">
          <BrandAvatar brand={brand} />
        </div>
      ))}
    </div>
  );
}
