import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "privacyPolicy",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PrivacyPolicy() {
  const t = await getTranslations("privacyPolicy");

  const purposes = Array.from({ length: 11 }, (_, i) => i + 1);
  const dataCategories = [
    "registration",
    "contact",
    "technical",
    "payment",
    "analytics",
  ];
  const providers = ["google", "stripe", "apple"];

  return (
    <div className="min-h-screen w-full bg-white py-[12rem]">
      <div className="flex-begin-col px-mobile md:px-tablet lg:px-desktop container mx-auto max-w-[180rem] gap-8 py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <p className="paragraph-18-normal text-primary-text-700 mb-[6.4rem]">
          {t("intro")}
        </p>

        {/* Responsible Party */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("responsible.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("responsible.intro")}
          </p>
          <div className="bg-primary-text-50 rounded-[1.2rem] p-[2.4rem]">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("responsible.company")}:{" "}
              </span>
              OASYS NEST, S.L.U.
            </p>
          </div>
        </section>

        {/* Purpose */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("purpose.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("purpose.intro")}
          </p>

          <ol className="space-y-[1.6rem]">
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

          <p className="paragraph-18-normal text-primary-text-700 mt-[3.2rem]">
            {t("purpose.reminder")}
          </p>
        </section>

        {/* Data Collected */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("dataCollected.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("dataCollected.intro")}
          </p>

          <div className="space-y-[3.2rem]">
            {dataCategories.map((category) => (
              <div key={category}>
                <h3 className="subtitle-semibold text-primary-text-900 mb-[1.6rem]">
                  {t(`dataCollected.${category}.title`)}
                </h3>
                <ul className="space-y-[1.2rem]">
                  {t
                    .raw(`dataCollected.${category}.items`)
                    .map((item: string, idx: number) => (
                      <li
                        key={idx}
                        className="paragraph-18-normal text-primary-text-700 ml-[2.4rem]"
                      >
                        <span className="paragraph-18-semibold text-primary-text-900">
                          •{" "}
                        </span>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Retention Period */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("retention.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("retention.content")}
          </p>
        </section>

        {/* Legal Basis */}
        <section className="mb-[6.4rem]">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("legalBasis.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("legalBasis.intro")}
          </p>

          <ol className="mb-[3.2rem] space-y-[1.6rem]">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
              <li
                key={num}
                className="paragraph-18-normal text-primary-text-700"
              >
                <span className="paragraph-18-semibold text-primary-text-900">
                  {num}.{" "}
                </span>
                {t(`legalBasis.list.${num}`)}
              </li>
            ))}
          </ol>

          <p className="paragraph-18-normal text-primary-text-700">
            {t("legalBasis.note")}
          </p>
        </section>

        {/* Data Origin */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("dataOrigin.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("dataOrigin.content")}
          </p>
        </section>

        {/* International Transfers */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("transfers.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("transfers.intro")}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-text-50">
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("transfers.table.provider")}
                  </th>
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("transfers.table.service")}
                  </th>
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("transfers.table.location")}
                  </th>
                  <th className="paragraph-18-semibold text-primary-text-900 border-primary-text-200 border p-[1.6rem] text-left">
                    {t("transfers.table.guarantees")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider}>
                    <td className="paragraph-18-medium text-primary-text-900 border-primary-text-200 border p-[1.6rem]">
                      {t(`transfers.providers.${provider}.name`)}
                    </td>
                    <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                      {t(`transfers.providers.${provider}.service`)}
                    </td>
                    <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                      {t(`transfers.providers.${provider}.location`)}
                    </td>
                    <td className="paragraph-18-normal text-primary-text-700 border-primary-text-200 border p-[1.6rem]">
                      {t(`transfers.providers.${provider}.guarantees`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="paragraph-18-normal text-primary-text-700 mt-[3.2rem]">
            {t("transfers.note")}
          </p>
        </section>

        {/* Data Accuracy */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("accuracy.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("accuracy.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("accuracy.p2")}
          </p>
        </section>

        {/* User Data */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("userData.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("userData.content")}
          </p>
        </section>

        {/* Intellectual Property Web */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("intellectualPropertyWeb.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intellectualPropertyWeb.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("intellectualPropertyWeb.p2")}
          </p>
        </section>

        {/* Intellectual Property Software */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("intellectualPropertySoftware.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intellectualPropertySoftware.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("intellectualPropertySoftware.p2")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("intellectualPropertySoftware.p3")}
          </p>
        </section>

        {/* Hosted Content IP */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("hostedContentIP.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("hostedContentIP.intro")}
          </p>

          <ol className="mb-[3.2rem] space-y-[1.6rem]">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
              <li
                key={num}
                className="paragraph-18-normal text-primary-text-700"
              >
                <span className="paragraph-18-semibold text-primary-text-900">
                  {num}.{" "}
                </span>
                {t(`hostedContentIP.prohibited.${num}`)}
              </li>
            ))}
          </ol>

          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("hostedContentIP.userResponsibility")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("hostedContentIP.indemnity")}
          </p>
        </section>

        {/* Data Backup */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("dataBackup.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("dataBackup.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("dataBackup.p2")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("dataBackup.p3")}
          </p>
        </section>

        {/* Commercial Communications */}
        <section className="flex-begin-col gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("communications.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("communications.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("communications.p2")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("communications.p3")}
          </p>
        </section>
      </div>
    </div>
  );
}
