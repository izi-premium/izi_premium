"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import imageData from "@/data/uploadedImages.json";

const languages = [
  {
    code: "en",
    name: "English",
    flagUrl: `${imageData["usa-flag"]}`,
  },
  {
    code: "es",
    name: "Español",
    flagUrl: `${imageData["spain-flag"]}`,
  },
];

// Function to get display name based on screen size
const getDisplayName = (lang: (typeof languages)[0]) => {
  const shortName = lang.code.toUpperCase(); // "EN" or "ES"
  const fullName = lang.name; // "English" or "Español"

  return {
    shortName,
    fullName,
  };
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = async (newLocale: string) => {
    // Set cookie with new locale
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    // Refresh the page to apply new locale
    router.refresh();
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);
  const currentDisplay = getDisplayName(currentLanguage || languages[0]);

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex-center group w-fit gap-1 border-none hover:cursor-pointer">
        <SelectValue placeholder="Select a language option" />
        <div className="flex-center gap-1">
          <div className="flex-center gap-2">
            {/* Mobile: Show short name (EN/ES) */}
            <span className="text-primary-text-600 paragraph-18-normal group-hover:underline md:hidden">
              {currentDisplay.shortName}
            </span>
            {/* Desktop: Show full name (English/Español) */}
            <span className="text-primary-text-600 paragraph-18-normal lg:paragraph-24-medium hidden group-hover:underline md:block">
              {currentDisplay.fullName}
            </span>
            <Image
              src={currentLanguage?.flagUrl || languages[0].flagUrl}
              alt={`${currentLanguage?.name || languages[0].name} flag`}
              width={18}
              height={18}
              className="bg-no-repeat object-contain xl:object-cover"
            />
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-elevated-surfaces-200">
        {languages.map((lang) => {
          const display = getDisplayName(lang);
          return (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="group hover:cursor-pointer"
            >
              <div className="flex-center gap-2">
                {/* Mobile: Show short name (EN/ES) */}
                <span className="text-primary-text-600 paragraph-18-normal group-hover:underline md:hidden">
                  {display.shortName}
                </span>
                {/* Desktop: Show full name (English/Español) */}
                <span className="text-primary-text-600 paragraph-18-normal hidden group-hover:underline md:block">
                  {display.fullName}
                </span>
                <div className="flex-center relative h-[1.8rem] w-[1.8rem]">
                  <Image
                    src={lang.flagUrl}
                    alt={`${lang.name} flag`}
                    fill
                    className="bg-no-repeat object-contain xl:object-cover"
                  />
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
