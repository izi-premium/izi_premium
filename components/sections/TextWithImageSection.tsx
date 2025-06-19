import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TextWithImageSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean;
}

export default function TextWithImageSection({
  title,
  description,
  imageUrl,
  imageAlt,
  ctaText,
  ctaLink,
  reverse = false,
}: TextWithImageSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div
            className={cn(
              "flex flex-col items-start space-y-6",
              reverse && "md:order-2"
            )}
          >
            <h2 className="h2-bold">{title}</h2>
            <p className="p-large text-muted-foreground">{description}</p>
            {ctaText && ctaLink && (
              <Button asChild className="mt-4">
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
            )}
          </div>
          <div
            className={cn(
              "flex justify-center",
              reverse && "md:order-1"
            )}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full aspect-[3/2] shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 