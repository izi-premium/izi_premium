import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "legalNotice",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function LegalNotice() {
  const t = await getTranslations("legalNotice");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop min-h-screen w-full bg-white py-[12rem]">
      <div className="flex-begin-col container mx-auto max-w-[clamp(140rem,73vw,280rem)] gap-8 px-4 py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <p className="paragraph-18-normal text-primary-text-700 mb-[6.4rem]">
          {t("intro")}
        </p>

        {/* Company Info */}
        <section className="bg-primary-text-50 mb-[6.4rem] rounded-[1.2rem] p-[3.2rem]">
          <div className="space-y-[1.2rem]">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("company.labels.name")}:{" "}
              </span>
              {t("company.name")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("company.labels.nif")}:{" "}
              </span>
              {t("company.nif")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("company.labels.address")}:{" "}
              </span>
              {t("company.address")}
            </p>
          </div>
        </section>

        {/* Responsibility */}
        <section className="mb-[6.4rem]">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("responsibility.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("responsibility.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("responsibility.p2")}
          </p>
        </section>

        {/* Links */}
        <section className="mb-[6.4rem]">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("links.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("links.content")}
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-[6.4rem]">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("intellectualProperty.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intellectualProperty.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("intellectualProperty.p2")}
          </p>
        </section>

        {/* Data Protection */}
        <section>
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("dataProtection.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("dataProtection.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("dataProtection.p2")}{" "}
            <a
              href={`mailto:${t("company.email")}`}
              className="text-secondary-action hover:underline"
            >
              {t("company.email")}
            </a>{" "}
            {t("dataProtection.p2b")} {t("company.address")}
          </p>
        </section>
      </div>
    </div>
  );
}
