import Link from "next/link";
import { Package2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Package2 className="h-6 w-6" />
            <span className="font-semibold">Boilerplate Inc</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Boilerplate Inc. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
} 