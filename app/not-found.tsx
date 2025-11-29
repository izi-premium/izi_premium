import Link from "next/link";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const tFound = useTranslations("NotFound");
  return (
    <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop h-fit min-h-[100vh] w-full gap-10 bg-white">
      <div className="w-full max-w-[clamp(50rem,20.8vw,80rem)] text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="from-accent-500 to-base-500 mb-4 bg-gradient-to-r bg-clip-text text-9xl font-bold text-transparent">
            404
          </h1>
          <div className="from-accent-500 to-base-500 mx-auto h-1 w-24 rounded-full bg-gradient-to-r"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="paragraph-24-medium md:subtitle-medium mb-2 w-full text-center text-gray-900">
            {tFound("title")}
          </h2>
          <p className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal mb-6 w-full text-gray-600">
            {tFound("subtitle")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:flex sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="bg-accent-500 relative flex items-center justify-center rounded-[0.8rem] p-1 px-8 py-3 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-lg md:w-[30rem] xl:w-fit xl:px-[clamp(3.2rem,1.66vw,6.4rem)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]"
          >
            <span className="absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <span className="absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <p className="paragraph-18-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
              {tFound("cta")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
