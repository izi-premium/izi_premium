import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "cookies" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function CookiesPage() {
  const t = useTranslations("cookies");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full bg-white py-[12rem]">
      <div className="flex-begin-col container mx-auto max-w-[clamp(140rem,73vw,280rem)] gap-8 px-4 py-8">
        {/* Header */}
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        {/* Company Info */}
        <div className="mb-[6.4rem]">
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intro.company")}
          </p>
          <p className="paragraph-18-medium text-primary-text-800">
            {t("intro.url")}
          </p>
        </div>

        {/* What are cookies */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("whatAreCookies.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 leading-[150%]">
            {t("whatAreCookies.description")}
          </p>
        </section>

        {/* Types of cookies */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("typesOfCookies.title")}
          </h2>

          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("typesOfCookies.intro")}
          </p>

          {/* By entity */}
          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("typesOfCookies.byEntity.title")}
            </h3>

            <div className="space-y-[2.4rem]">
              <div>
                <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                  {t("typesOfCookies.byEntity.own.title")}
                </h4>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("typesOfCookies.byEntity.own.description")}
                </p>
              </div>

              <div>
                <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                  {t("typesOfCookies.byEntity.thirdParty.title")}
                </h4>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("typesOfCookies.byEntity.thirdParty.description")}
                </p>
              </div>
            </div>

            <p className="paragraph-18-normal text-primary-text-700 mt-[2.4rem]">
              {t("typesOfCookies.byEntity.note")}
            </p>
          </div>

          {/* By duration */}
          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("typesOfCookies.byDuration.title")}
            </h3>

            <div className="space-y-[2.4rem]">
              <div>
                <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                  {t("typesOfCookies.byDuration.session.title")}
                </h4>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("typesOfCookies.byDuration.session.description")}
                </p>
              </div>

              <div>
                <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                  {t("typesOfCookies.byDuration.persistent.title")}
                </h4>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("typesOfCookies.byDuration.persistent.description")}
                </p>
              </div>
            </div>
          </div>

          {/* By purpose */}
          <div>
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("typesOfCookies.byPurpose.title")}
            </h3>

            <div className="space-y-[3.2rem]">
              {[
                "technical",
                "personalization",
                "analytics",
                "advertising",
                "behavioral",
                "socialMedia",
              ].map((type) => (
                <div key={type}>
                  <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                    {t(`typesOfCookies.byPurpose.${type}.title`)}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t(`typesOfCookies.byPurpose.${type}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disable cookies */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("disableCookies.title")}
          </h2>

          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("disableCookies.intro")}
          </p>

          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("disableCookies.description")}
          </p>

          <div className="space-y-[1.6rem]">
            {[
              {
                name: "Internet Explorer",
                url: "http://windows.microsoft.com/es-es/windowsvista/Block-or-allow-cookies",
              },
              {
                name: "Mozilla Firefox",
                url: "http://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-suspreferencia",
              },
              {
                name: "Chrome",
                url: "https://support.google.com/accounts/answer/61416?hl=es",
              },
              {
                name: "Safari",
                url: "http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies/",
              },
              {
                name: "Opera",
                url: "http://help.opera.com/Linux/10.60/es-ES/cookies.html",
              },
            ].map((browser) => (
              <div key={browser.name}>
                <span className="paragraph-18-semibold text-primary-text-900">
                  {browser.name}:{" "}
                </span>
                <a
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paragraph-18-normal text-secondary-action hover:underline"
                >
                  {browser.url}
                </a>
              </div>
            ))}
          </div>

          <p className="paragraph-18-normal text-primary-text-700 mt-[3.2rem] mb-[2.4rem]">
            {t("disableCookies.tools")}
          </p>

          <div className="space-y-[1.6rem]">
            <div>
              <span className="paragraph-18-semibold text-primary-text-900">
                Ghostery:{" "}
              </span>
              <a
                href="https://www.ghostery.com"
                target="_blank"
                rel="noopener noreferrer"
                className="paragraph-18-normal text-secondary-action hover:underline"
              >
                www.ghostery.com
              </a>
            </div>
            <div>
              <span className="paragraph-18-semibold text-primary-text-900">
                Your Online Choices:{" "}
              </span>
              <a
                href="https://www.youronlinechoices.com/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="paragraph-18-normal text-secondary-action hover:underline"
              >
                www.youronlinechoices.com/es/
              </a>
            </div>
          </div>
        </section>

        {/* Cookies used */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("cookiesUsed.title")}
          </h2>

          <p className="paragraph-18-normal text-primary-text-700 mb-[4.8rem]">
            {t("cookiesUsed.intro")}
          </p>

          {/* Cookies table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-text-50">
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("cookiesUsed.table.cookie")}
                  </th>
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("cookiesUsed.table.type")}
                  </th>
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("cookiesUsed.table.duration")}
                  </th>
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("cookiesUsed.table.description")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {["stripeMid", "stripeSid", "stripeM"].map((cookie) => (
                  <tr key={cookie}>
                    <td className="paragraph-18-medium text-primary-text-900 border-primary-text-200 border p-[1.6rem]">
                      {t(`cookiesUsed.cookies.${cookie}.name`)}
                    </td>
                    <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                      {t(`cookiesUsed.cookies.${cookie}.type`)}
                    </td>
                    <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                      {t(`cookiesUsed.cookies.${cookie}.duration`)}
                    </td>
                    <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                      {t(`cookiesUsed.cookies.${cookie}.description`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer actions */}
        <section className="flex-begin-col gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("footer.title")}
          </h2>

          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("footer.info")}
          </p>

          <div className="space-y-[2.4rem]">
            <div>
              <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                {t("footer.actions.accept.title")}
              </h4>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("footer.actions.accept.description")}
              </p>
            </div>

            <div>
              <h4 className="paragraph-24-semibold text-primary-text-900 mb-[1.2rem]">
                {t("footer.actions.modify.title")}
              </h4>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("footer.actions.modify.description")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
