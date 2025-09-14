import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

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
    <section className="px-mobile md:px-tablet lg:px-desktop 3xl:max-w-[220rem] w-full max-w-[160rem] py-12 md:py-24 lg:py-32">
      <div className="w-full">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div
            className={cn(
              "flex flex-col items-start gap-6",
              reverse && "md:order-2"
            )}
          >
            <h2 className="h2-medium text-black-800">{title}</h2>
            <p className="paragraph-18-normal text-black-600">{description}</p>
            {ctaText && ctaLink && (
              <Button asChild className="mt-2 w-full px-16 py-3 md:w-fit">
                <Link
                  href={ctaLink}
                  className="flex-center h-fit w-full text-center md:w-fit"
                >
                  <span className="paragraph-24-medium text-black-800">
                    {ctaText}
                  </span>
                </Link>
              </Button>
            )}
          </div>
          <div className={cn("flex justify-center", reverse && "md:order-1")}>
            <AspectRatio
              ratio={5 / 6}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover object-center"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
