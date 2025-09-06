"use client";

import Link from "next/link";
import { Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

export default function Header() {
  const tNav = useTranslations("Navigation");

  const navLinks = [
    { href: "#chat", label: `${tNav("chat")}` },
    { href: "#diary", label: `${tNav("diary")}` },
    { href: "#cookies", label: `${tNav("cookies")}` },
  ];

  return (
    <header className="container-wrapper sticky top-0 z-50 flex h-fit w-full items-center bg-transparent pt-6">
      <div className="from-elevated-surfaces-600 border-opacity-50 shadow-header w-full rounded-[1.6rem] border border-solid border-[#C4C6AA] bg-gradient-to-b to-[#303129]/25 p-[1px]">
        <div className="bg-elevated-surfaces-500 flex w-full items-center justify-between rounded-[1.6rem] py-2 pr-2 pl-2 md:pl-8">
          <nav className="flex flex-row items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex-center w-fit gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-5 w-5" />
              <span className="paragraph-18-medium text-primary-text-600 w-fit text-nowrap">
                I.Z.I Premium
              </span>
            </Link>
          </nav>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{tNav("toggle")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">I.Z.I Premium</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Links */}
          <div className="hidden w-fit gap-4 md:ml-auto md:flex md:items-center md:justify-end md:gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="paragraph-18-normal text-primary-text-600 hover:underline"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />

            {/* CTA Buttons */}
            <div className="flex-center gap-4">
              <Link
                href="#"
                className="bg-secondary-text-50 border-secondary-text-950 hover:bg-secondary-text-200 hover:shadow-hover-inner shadow-cta-header rounded-[0.8rem] border border-solid px-6 py-2 transition-all duration-300 ease-in-out"
              >
                <span className="paragraph-18-medium text-secondary-text-950">
                  {tNav("register")}
                </span>
              </Link>
              <Link
                href="#"
                className="bg-accent-900 hover:bg-accent-600 shadow-cta-header rounded-[0.8rem] px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
              >
                <span className="paragraph-18-medium text-secondary-text-500">
                  {tNav("cta")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
