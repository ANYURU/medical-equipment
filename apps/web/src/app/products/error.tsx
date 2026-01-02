'use client';

import { Button } from '@/components/ui/button';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center px-4 py-12">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-6 text-muted-foreground">Failed to load products</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
