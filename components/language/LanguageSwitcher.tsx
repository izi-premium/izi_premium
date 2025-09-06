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

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex-center group w-fit gap-1 border-none hover:cursor-pointer">
        <div className="flex-center gap-1">
          <div className="flex-center gap-2">
            <span className="text-primary-text-600 paragraph-18-normal group-hover:underline">
              {currentLanguage?.name || languages[0].name}
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
      <SelectContent className="bg-elevated-surfaces-50">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="group hover:cursor-pointer"
          >
            <div className="flex-center gap-2">
              <span className="text-primary-text-600 paragraph-18-normal group-hover:underline">
                {lang.name}
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
        ))}
      </SelectContent>
    </Select>
  );
}
