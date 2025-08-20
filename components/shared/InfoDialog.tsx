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
        <Button
          variant="outline"
          className="paragraph-18-medium text-black-700 hover:cursor-pointer"
        >
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="paragraph-24-medium text-black-800">
            About This Boilerplate
          </DialogTitle>
          <DialogDescription className="paragraph-18-normal text-black-700">
            This is a Next.js boilerplate built with performance and developer
            experience in mind.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="paragraph-18-normal text-black-700">
            <b>It includes:</b>
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li className="paragraph-18-normal text-black-700">
              Next.js 15 & React 19
            </li>
            <li className="paragraph-18-normal text-black-700">TypeScript</li>
            <li className="paragraph-18-normal text-black-700">Tailwind CSS</li>
            <li className="paragraph-18-normal text-black-700">Shadcn UI</li>
            <li className="paragraph-18-normal text-black-700">
              Server Components
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
