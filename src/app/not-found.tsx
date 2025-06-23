import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse" />
        <div className="absolute inset-4 bg-primary rounded-full" />
        <div className="absolute inset-[40%] bg-background rounded-full" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            Go Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
}
