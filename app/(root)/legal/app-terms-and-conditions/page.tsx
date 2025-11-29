import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "appTerms",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function AppTermsPage() {
  const t = await getTranslations("appTerms");

  const purposes = Array.from({ length: 14 }, (_, i) => i + 1);
  const permissions = ["ip", "camera", "microphone"];
  const legalBasisItems = [
    "obligations",
    "fraud",
    "serviceExecution",
    "contact",
    "account",
    "functionality",
    "sos",
    "sensitiveData",
    "moderation",
    "payments",
    "storage",
    "personalization",
    "metrics",
    "commercial",
    "psychologists",
  ];

  return (
    <div className="min-h-screen w-full bg-white py-[12rem]">
      <div className="flex-begin-col px-mobile md:px-tablet lg:px-desktop container mx-auto max-w-[180rem] gap-8 py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <p className="paragraph-18-normal text-primary-text-700 mb-[6.4rem]">
          {t("intro")}
        </p>

        {/* Purpose */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("purpose.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("purpose.intro")}
          </p>

          <ol className="mb-[3.2rem] space-y-[1.6rem]">
            {purposes.map((num) => (
              <li
                key={num}
                className="paragraph-18-normal text-primary-text-700"
              >
                <span className="paragraph-18-semibold text-primary-text-900">
                  {num}.{" "}
                </span>
                {t(`purpose.list.${num}`)}
              </li>
            ))}
          </ol>

          <p className="paragraph-18-normal text-primary-text-700">
            {t("purpose.beneficiaries")}
          </p>
        </section>

        {/* Permissions */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("permissions.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("permissions.intro")}
          </p>

          <ol className="mb-[3.2rem] space-y-[2.4rem]">
            {permissions.map((perm, idx) => (
              <li
                key={perm}
                className="paragraph-18-normal text-primary-text-700"
              >
                <span className="paragraph-18-semibold text-primary-text-900">
                  {idx + 1}. {t(`permissions.${perm}.title`)}:{" "}
                </span>
                {t(`permissions.${perm}.description`)}
              </li>
            ))}
          </ol>

          <p className="paragraph-18-normal text-primary-text-700">
            {t("permissions.compliance")}
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("intellectualProperty.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intellectualProperty.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intellectualProperty.p2")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("intellectualProperty.p3")}
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("privacyPolicy.title")}
          </h2>

          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("privacyPolicy.responsible.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("privacyPolicy.responsible.content")}
            </p>
          </div>

          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("privacyPolicy.purposeSection.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("privacyPolicy.purposeSection.content")}
            </p>
          </div>

          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("privacyPolicy.legalBasis.title")}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-text-50">
                    <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                      {t("privacyPolicy.legalBasis.table.purpose")}
                    </th>
                    <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                      {t("privacyPolicy.legalBasis.table.basis")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {legalBasisItems.map((item) => (
                    <tr key={item}>
                      <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                        {t(`privacyPolicy.legalBasis.items.${item}.purpose`)}
                      </td>
                      <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                        {t(`privacyPolicy.legalBasis.items.${item}.basis`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("privacyPolicy.retention.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("privacyPolicy.retention.content")}
            </p>
          </div>

          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("privacyPolicy.recipients.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("privacyPolicy.recipients.p1")}
            </p>
            <ul className="mb-[2.4rem] space-y-[1.2rem]">
              <li className="paragraph-18-normal text-primary-text-700 ml-[2.4rem]">
                <span className="paragraph-18-semibold text-primary-text-900">
                  •{" "}
                </span>
                {t("privacyPolicy.recipients.list.0")}
              </li>
              <li className="paragraph-18-normal text-primary-text-700 ml-[2.4rem]">
                <span className="paragraph-18-semibold text-primary-text-900">
                  •{" "}
                </span>
                {t("privacyPolicy.recipients.list.1")}
              </li>
            </ul>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("privacyPolicy.recipients.firebase")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("privacyPolicy.recipients.analytics")}
            </p>
          </div>

          <div>
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("privacyPolicy.rights.title")}
            </h3>
            <ul className="mb-[2.4rem] space-y-[1.2rem]">
              {["withdrawal", "access", "complaint"].map((right) => (
                <li
                  key={right}
                  className="paragraph-18-normal text-primary-text-700 ml-[2.4rem]"
                >
                  <span className="paragraph-18-semibold text-primary-text-900">
                    •{" "}
                  </span>
                  {t(`privacyPolicy.rights.list.${right}`)}
                </li>
              ))}
            </ul>
            <div className="bg-primary-text-50 rounded-[1.2rem] p-[2.4rem]">
              <p className="paragraph-18-semibold text-primary-text-900 mb-[1.2rem]">
                {t("privacyPolicy.rights.contact.title")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                OASYS NEST, S.L.U. C/ Cami Terminal 6a, C.P. 07009 - Palma De
                Mallorca (Islas Baleares). E-mail:{" "}
                <a
                  href="mailto:dpo@iziworld.app"
                  className="text-secondary-action hover:underline"
                >
                  dpo@iziworld.app
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Mandatory Information */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("mandatoryInfo.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("mandatoryInfo.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("mandatoryInfo.p2")}
          </p>
        </section>

        {/* Security Measures */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("security.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("security.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("security.p2")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("security.p3")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("security.p4")}{" "}
            <a
              href="mailto:dpo@iziworld.app"
              className="text-secondary-action hover:underline"
            >
              dpo@iziworld.app
            </a>
          </p>
        </section>

        {/* Liability Exclusion */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("liability.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("liability.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("liability.p2")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("liability.p3")}
          </p>
        </section>

        {/* Legislation */}
        <section className="flex-begin-col gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("legislation.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("legislation.content")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("legislation.acceptance")}
          </p>
        </section>
      </div>
    </div>
  );
}
