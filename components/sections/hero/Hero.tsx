import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import imageData from "@/data/uploadedImages.json";

const Hero = () => {
  const tHero = useTranslations("Hero");

  return (
    <section className="flex-center-col px-mobile md:px-tablet lg:px-desktop h-fit w-full max-w-[180rem] justify-center gap-4 md:pt-[4rem] lg:flex-row lg:items-stretch lg:justify-between lg:pt-[10rem]">
      <div className="flex h-full w-fit flex-col items-start justify-center gap-10 py-10 xl:pt-[12rem]">
        <div className="flex w-fit max-w-[85rem] flex-col items-start justify-start gap-4">
          <h1
            className="subtitle-medium text-primery-text-900 md:h2-medium xl:h1-small 2xl:h1-big w-full text-center lg:text-left"
            dangerouslySetInnerHTML={{
              __html: tHero("title"),
            }}
          ></h1>
          <p className="paragraph-18-normal xl:paragraph-24-normal text-secondary-text-900 w-full text-center lg:text-left">
            {tHero("subtitle")}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 lg:items-start">
          {/* <div className="flex w-full flex-col items-start justify-start gap-1">
            <div className="flex-start gap-[-1.75rem]">#Set of images</div>
            <div className="flex-start w-hug w-full gap-1 text-nowrap">
               <span className="paragraph-18-medium text-primary-text-700 text-nowrap">
                + # de clientes viene de DB.
              </span> 
              <span className="paragraph-18-medium text-primary-text-700 text-nowrap">
                {tHero("people")}
              </span>
            </div>
          </div> */}
          <Link
            href="#pricing"
            className="hover:shadow-header bg-primary-action-900 relative flex items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <div className="border-elevated-surfaces-500 relative rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(3.2rem,1.66vw,6.4rem)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
              <p className="paragraph-18-semibold md:paragraph-24-medium text-secondary-text-500 lg: w-full text-center">
                {tHero("cta")}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="3xl:w-[48rem] 3xl:h-[68rem] relative h-[49rem] w-full max-w-[56.8rem] md:w-[32rem] lg:w-[36rem] xl:h-[52rem]">
        <Image
          src={imageData["izi-premium-phone-banner"]}
          alt={tHero("image-alt")}
          fill
          className="object-fill object-center"
        />
      </div>
    </section>
  );
};

export default Hero;
