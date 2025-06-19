import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>About This Boilerplate</DialogTitle>
          <DialogDescription>
            This is a Next.js boilerplate built with performance and developer
            experience in mind.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>It includes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Next.js 15 & React 19</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Shadcn UI</li>
            <li>Server Components</li>
          </ul>
        </div>
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 w-11 h-11"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 