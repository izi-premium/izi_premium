"use client";

import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import imageData from "@/data/uploadedImages.json";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { UserAvatar } from "./UserAvatar";

export default function Header() {
  const tNav = useTranslations("Navigation");
  const { user } = useAuth();

  const navLinks = [
    { href: "/#chat", label: `${tNav("chat")}` },
    { href: "/#diary", label: `${tNav("diary")}` },
    { href: "/#cookies", label: `${tNav("cookies")}` },
  ];

  return (
    <header className="px-mobile md:px-tablet lg:px-desktop fixed top-6 z-50 flex h-fit w-full max-w-[180rem] items-center bg-transparent">
      <div className="from-elevated-surfaces-600 border-opacity-50 shadow-header w-full rounded-[1.6rem] border border-solid border-[#C4C6AA] bg-gradient-to-b to-[#303129]/25 p-[1px]">
        <div className="bg-elevated-surfaces-500 flex w-full items-center justify-between rounded-[1.6rem] px-4 py-3">
          <nav className="flex flex-row items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex-center w-fit gap-2 text-lg font-semibold md:text-base"
            >
              <div className="flex-center relative size-[3.2rem] lg:size-[4rem] 2xl:size-[5.6rem]">
                <Image
                  src={imageData["izi-logo"]}
                  alt="I.Z.I logo"
                  fill
                  sizes="(max-width: 1024px) 3.2rem, 4rem"
                  className="bg-no-repeat object-contain xl:object-cover"
                />
              </div>
              <span className="paragraph-18-medium text-primary-text-600 lg:paragraph-24-medium w-fit text-nowrap">
                I.Z.I Premium
              </span>
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex-center gap-3 xl:hidden">
            <LanguageSwitcher />
            {user && <UserAvatar user={user} />}

            <Sheet>
              <SheetTrigger asChild className="size-[4.4rem]">
                <div className="flex-center size-[3.2rem]">
                  <Menu
                    className="h-6 w-6"
                    aria-label="togle navigation menu"
                  />
                  <span className="sr-only">{tNav("toggle")}</span>
                </div>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-elevated-surfaces-500 h-dvh w-screen py-8"
              >
                <SheetTitle className="flex-center w-full">
                  <Link
                    href="/"
                    className="flex-center w-fit gap-2 text-lg font-semibold md:text-base"
                  >
                    <div className="flex-center relative size-[3.2rem]">
                      <Image
                        src={imageData["izi-logo"]}
                        alt="I.Z.I logo"
                        fill
                        sizes="(max-width: 1024px) 3.2rem, 4rem"
                        className="bg-no-repeat object-contain xl:object-cover"
                      />
                    </div>
                    <span className="paragraph-24-medium text-primary-text-600 w-fit text-nowrap">
                      I.Z.I Premium
                    </span>
                  </Link>
                </SheetTitle>
                <nav className="h-full w-screen gap-6 text-lg font-medium">
                  <div className="flex h-full w-full flex-col items-center justify-between">
                    <div className="flex-center-col h-full gap-6">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="paragraph-24-normal text-primary-text-600"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                    {/* CTA Buttons */}
                    <div className="flex-center-col gap-4">
                      {!user ? (
                        <>
                          <SheetClose asChild>
                            <Link
                              href="/signup?redirect=/"
                              className="bg-secondary-text-50 border-secondary-text-950 hover:bg-secondary-text-200 hover:shadow-hover-inner shadow-cta-header rounded-[0.8rem] border border-solid px-6 py-2 transition-all duration-300 ease-in-out"
                            >
                              <span className="paragraph-24-medium text-secondary-text-950">
                                {tNav("register")}
                              </span>
                            </Link>
                          </SheetClose>

                          <SheetClose asChild>
                            <Link
                              href="#"
                              className="bg-accent-900 hover:bg-accent-600 shadow-cta-header rounded-[0.8rem] px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
                            >
                              <span className="paragraph-24-medium text-secondary-text-500">
                                {tNav("cta")}
                              </span>
                            </Link>
                          </SheetClose>
                        </>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href="/#premium-plan"
                            className="bg-accent-900 hover:bg-accent-600 shadow-cta-header rounded-[0.8rem] px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
                          >
                            <span className="paragraph-24-medium text-secondary-text-500">
                              {tNav("cta")}
                            </span>
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Links */}
          <div className="hidden w-fit gap-4 lg:gap-6 xl:ml-auto xl:flex xl:items-center xl:justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="paragraph-18-normal text-primary-text-600 lg:paragraph-24-medium hover:underline"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            {user && <UserAvatar user={user} />}

            {/* CTA Buttons */}
            <div className="flex-center gap-4">
              {!user ? (
                <>
                  <Link
                    href="/signup?redirect=/"
                    className="bg-secondary-text-50 border-secondary-text-950 hover:bg-secondary-text-200 hover:shadow-hover-inner shadow-cta-header rounded-[0.8rem] border border-solid px-6 py-2 transition-all duration-300 ease-in-out"
                  >
                    <span className="paragraph-18-medium text-secondary-text-950 lg:paragraph-24-medium">
                      {tNav("register")}
                    </span>
                  </Link>

                  <Link
                    href="/#premium-plan"
                    className="bg-accent-900 hover:bg-accent-600 shadow-cta-header rounded-[0.8rem] px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
                  >
                    <span className="paragraph-18-medium text-secondary-text-500 lg:paragraph-24-medium">
                      {tNav("cta")}
                    </span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/#premium-plan"
                  className="bg-accent-900 hover:bg-accent-600 shadow-cta-header rounded-[0.8rem] px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
                >
                  <span className="paragraph-18-medium text-secondary-text-500 lg:paragraph-24-medium">
                    {tNav("cta")}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
