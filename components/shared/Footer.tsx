import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import imageData from "@/data/uploadedImages.json";

export default function Footer() {
  const tFoot = useTranslations("Footer");
  return (
    <footer className="w-full bg-white">
      <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper flex-center-col bg-elevated-surfaces-500 border-primary-text-200 w-full gap-10 rounded-t-[3.2rem] border-t border-r border-l border-solid py-10 lg:gap-6">
        <div className="flex-begin-col w-full gap-20 lg:flex-row lg:justify-between">
          {/* 1st col */}
          <div className="flex-begin-col gap-20 lg:flex-row lg:justify-between">
            <div className="flex-begin-col gap-8">
              {/* Logo */}
              <Link
                href="#"
                className="flex-center w-fit gap-2 text-lg font-semibold md:text-base"
              >
                <div className="flex-center relative size-[4.4rem] lg:size-[5.6rem] 2xl:size-[6.4rem]">
                  <Image
                    src={imageData["izi-logo"]}
                    alt="I.Z.I logo"
                    fill
                    sizes="(max-width: 1024px) 3.2rem, 4rem"
                    className="bg-no-repeat object-contain xl:object-cover"
                  />
                </div>
                <span className="paragraph-24-medium text-primary-text-600 lg:subtitle-medium w-fit text-nowrap">
                  I.Z.I Premium
                </span>
              </Link>

              {/* App download buttons */}
              <div className="flex-begin-col gap-2">
                <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
                  {tFoot.rich("download", {
                    u: (chunks: React.ReactNode) => <u>{chunks}</u>,
                  })}
                </p>
                <div className="flex-center w-full gap-6">
                  {/* App Store */}
                  <Link
                    href="/"
                    className="border-primary-text-900 flex-center hover:shadow-hover-inner shadow-cta-header w-full max-w-[30rem] flex-nowrap gap-2 rounded-[0.8rem] border border-solid bg-white px-6 py-3 whitespace-nowrap hover:cursor-pointer"
                  >
                    <Image
                      src={imageData["ic_baseline-apple"]}
                      alt={tFoot("apple-alt")}
                      width={32}
                      height={32}
                      className="size-[3.2rem] 2xl:size-[4.4rem]"
                    />
                    <span className="paragraph-18-medium md:paragraph-24-medium flex-nowrap whitespace-nowrap text-black">
                      {tFoot("apple")}
                    </span>
                  </Link>

                  {/* Play Store */}
                  <Link
                    href="/"
                    className="border-primary-text-900 flex-center hover:shadow-hover-inner shadow-cta-header w-full max-w-[30rem] flex-nowrap gap-2 rounded-[0.8rem] border border-solid bg-white px-6 py-3 whitespace-nowrap hover:cursor-pointer"
                  >
                    <Image
                      src={imageData["streamline_play-store"]}
                      alt={tFoot("google-alt")}
                      width={32}
                      height={32}
                      className="size-[3.2rem] 2xl:size-[4.4rem]"
                    />
                    <span className="paragraph-18-medium md:paragraph-24-medium flex-nowrap whitespace-nowrap text-black">
                      {tFoot("google")}
                    </span>
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-begin-col gap-2">
                <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
                  {tFoot("question")}
                </p>
                <Link
                  href="#newsletter"
                  className="hover:shadow-header bg-accent-500 relative flex items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer md:w-[30rem] xl:w-fit"
                >
                  <span className="absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
                  <span className="absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
                  <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(3.2rem,1.66vw,6.4rem)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
                    <p className="paragraph-18-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
                      {tFoot("cta")}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Links and nav */}
          <div className="flex-begin-col gap-8 lg:flex-row">
            <div className="flex-begin-col gap-4">
              <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
                {tFoot("nav-title")}
              </p>
              <ul className="flex-begin-col gap-4">
                <li>
                  <Link
                    href="#features"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("nav-1")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#chat"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("nav-2")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#diary"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("nav-3")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#cookies"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("nav-4")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("nav-5")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-begin-col gap-4">
              <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
                {tFoot("legal-title")}
              </p>
              <ul className="flex-begin-col gap-4">
                <li>
                  <Link
                    href="/legal/terms-and-conditions"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("legal-1")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("legal-2")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/subcontractors"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("legal-3")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/community-rules"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("legal-5")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/legal-notice"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("legal-6")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/app-terms-and-conditions"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    {tFoot("legal-7")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/cookies"
                    className="paragraph-14-normal md:paragraph-18-normal text-black hover:cursor-pointer hover:underline"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Attributions */}
        <div className="flex-center-col w-full gap-1 md:flex-row md:justify-between">
          <p className="paragraph-14-normal text-primary-text-900">
            {tFoot("copyright")}
          </p>
          <div className="flex-center gap-1">
            <p className="paragraph-14-normal text-primary-text-900">
              {tFoot("attributions1")}
            </p>
            <Link
              href="https://www.estebansant.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="paragraph-14-normal text-primary-text-900 underline hover:cursor-pointer"
            >
              Es Media.
            </Link>
            <p className="paragraph-14-normal text-primary-text-900">
              {tFoot("attributions2")}
            </p>
            <Link
              href="https://icons8.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="paragraph-14-normal text-primary-text-900 underline hover:cursor-pointer"
            >
              Icons8
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
