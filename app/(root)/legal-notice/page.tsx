import { useTranslations } from "next-intl";

export default function LegalNotice() {
  const t = useTranslations("legalNotice");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full bg-white py-[12rem]">
      <div className="container mx-auto w-full max-w-[clamp(140rem,73vw,280rem)] py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section1.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.company")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.nif")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.address")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.emailGeneral")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.emailPrivacy")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.domain")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.content.registryData")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section2.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section2.content.description")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section2.content.dpoEmail")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section2.content.dpoAddress")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section3.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section3.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section4.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section4.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section5.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section5.content.description")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section5.content.trademark")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section6.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section6.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section7.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section7.content.description")}
            </p>
            <div className="ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section7.content.technicalFailures")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section7.content.misuse")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section7.content.userDecisions")}
              </p>
            </div>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section7.content.maxResponsibility")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section8.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section8.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section9.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section9.content.navigation")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section9.content.cookies")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section10.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.content.description")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.content.paymentMethods")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.content.dataStorage")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.content.receipt")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.content.withdrawal")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.content.refunds")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section11.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section11.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section12.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section12.content.description")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section13.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-medium text-primary-text-700">
              {t("section13.content.euUk")}
            </p>
            <p className="paragraph-18-medium text-primary-text-700">
              {t("section13.content.usa")}
            </p>
            <p className="paragraph-18-medium text-primary-text-700">
              {t("section13.content.canada")}
            </p>
            <p className="paragraph-18-medium text-primary-text-700">
              {t("section13.content.australia")}
            </p>
            <p className="paragraph-18-medium text-primary-text-700">
              {t("section13.content.latam")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section13.content.noSpecific")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section14.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section14.content.euUkJurisdiction")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section14.content.otherCountries")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section14.content.mediation")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section14.content.ecPlatform")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section15.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section15.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section16.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section16.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section17.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section17.content.info")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section17.content.support")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section17.content.privacy")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section17.content.dpo")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section17.content.address")}
            </p>
            <p className="paragraph-14-normal text-primary-text-600 mt-8">
              {t("lastUpdated")}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
