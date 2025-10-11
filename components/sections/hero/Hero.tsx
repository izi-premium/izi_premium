import { useTranslations } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const tHero = useTranslations("Hero");

  return (
    <section className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full justify-between gap-[6.4rem] py-[8rem] lg:flex-row lg:justify-between lg:py-[10rem]">
      <div className="flex w-full flex-col items-start justify-start gap-10 py-10">
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <h1
            className="subtitle-medium text-primery-text-900 md:h2-medium lg:h1-big w-full text-center lg:text-left"
            dangerouslySetInnerHTML={{
              __html: tHero("title"),
            }}
          ></h1>
          <p className="paragraph-18-normal md:paragraph-24-normal lg:subtitle-normal text-secondary-text-900 w-full text-center md:text-left">
            {tHero("subtitle")}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-4 md:items-start">
          <div className="flex w-full flex-col items-start justify-start gap-1">
            {/* <div className="flex-start gap-[-1.75rem]">#Set of images</div> */}
            <div className="flex-start w-hug w-full gap-1 text-nowrap">
              {/* <span className="paragraph-18-medium text-primary-text-700 text-nowrap">
                + # de clientes viene de DB.
              </span> */}
              <span className="paragraph-18-medium text-primary-text-700 text-nowrap">
                {tHero("people")}
              </span>
            </div>
          </div>
          <Link
            href="#pricing"
            className="hover:shadow-header bg-primary-action-900 relative flex items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <div className="border-elevated-surfaces-500 relative rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(3.2rem,1.66vw,6.4rem)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
              <p className="paragraph-24-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
                {tHero("cta")}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="relative h-[52.4rem] w-full bg-red-200 lg:h-[62.8rem] lg:w-[25.4rem]">
        {/* Image */}
      </div>
    </section>
  );
};

export default Hero;
