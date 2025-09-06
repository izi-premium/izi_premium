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
import { Globe } from "lucide-react";
import Image from "next/image";

const languages = [
  {
    code: "en",
    name: "English",
    flagUrl: "https://your-blob-storage.vercel-storage.com/flags/us-flag.svg",
  },
  {
    code: "es",
    name: "Español",
    flagUrl: "https://your-blob-storage.vercel-storage.com/flags/es-flag.svg",
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
      <SelectTrigger className="w-[140px]">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <div className="flex items-center gap-2">
            <Image
              src={currentLanguage?.flagUrl || languages[0].flagUrl}
              alt={`${currentLanguage?.name || languages[0].name} flag`}
              width={16}
              height={12}
              className="rounded-sm"
            />
            <span>{currentLanguage?.name || languages[0].name}</span>
          </div>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <Image
                src={lang.flagUrl}
                alt={`${lang.name} flag`}
                width={16}
                height={12}
                className="rounded-sm"
              />
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
