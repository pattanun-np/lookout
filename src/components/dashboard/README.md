# Dashboard Components

This directory contains modular components for the dashboard page, following Next.js App Router best practices with server components and Suspense.

## Components Structure

### Core Components

- **`dashboard-header.tsx`** - Header with breadcrumb navigation
- **`dashboard-toolbar.tsx`** - Search input and action buttons
- **`prompts-table.tsx`** - Main table component with Suspense wrapper

### Table Components

- **`prompts-table-header.tsx`** - Table header with column titles and icons
- **`prompt-table-row.tsx`** - Individual table row component
- **`prompts-table-skeleton.tsx`** - Loading skeleton for table rows
- **`prompt-tags.tsx`** - Tag component with color variants

## Key Features

### Server Components

All components are server components by default, ensuring optimal performance and SEO.

### Suspense & Loading States

- Uses React Suspense for graceful loading states
- Skeleton components provide visual feedback during data fetching
- Page loads instantly with progressive enhancement

### Data Fetching

- Server actions in `@/lib/actions.ts` handle data fetching
- Uses `unstable_noStore` to prevent caching for dynamic data
- Simulated API delay for realistic loading experience

### Performance Optimizations

- Modular component structure for better code splitting
- Minimal client-side JavaScript
- Optimized for Core Web Vitals

## Usage

```tsx
import {
  DashboardHeader,
  DashboardToolbar,
  PromptsTable,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <DashboardToolbar />
      <PromptsTable />
    </div>
  );
}
```

## Future Enhancements

- Replace hardcoded data in actions with real API calls
- Add search functionality
- Implement filtering and sorting
- Add pagination for large datasets
