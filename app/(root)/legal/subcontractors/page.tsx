import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "subcontractors",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function Subcontractors() {
  const t = await getTranslations("subcontractors");

  const subcontractors = [
    {
      provider: "Google LLC (Firebase)",
      service: t("providers.firebase.service"),
      data: t("providers.firebase.data"),
      location: t("providers.firebase.location"),
      guarantees: t("providers.firebase.guarantees"),
    },
    {
      provider: "Stripe, Inc.",
      service: t("providers.stripe.service"),
      data: t("providers.stripe.data"),
      location: t("providers.stripe.location"),
      guarantees: t("providers.stripe.guarantees"),
    },
    {
      provider: "Apple Inc. (App Store)",
      service: t("providers.apple.service"),
      data: t("providers.apple.data"),
      location: t("providers.apple.location"),
      guarantees: t("providers.apple.guarantees"),
    },
    {
      provider: "Google Play (Google LLC)",
      service: t("providers.googlePlay.service"),
      data: t("providers.googlePlay.data"),
      location: t("providers.googlePlay.location"),
      guarantees: t("providers.googlePlay.guarantees"),
    },
    {
      provider: "Google Cloud Vision API (Google LLC)",
      service: t("providers.cloudVision.service"),
      data: t("providers.cloudVision.data"),
      location: t("providers.cloudVision.location"),
      guarantees: t("providers.cloudVision.guarantees"),
    },
    {
      provider: "Perspective API (Google Jigsaw)",
      service: t("providers.perspective.service"),
      data: t("providers.perspective.data"),
      location: t("providers.perspective.location"),
      guarantees: t("providers.perspective.guarantees"),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white py-[12rem]">
      <div className="px-mobile md:px-tablet lg:px-desktop mx-auto w-full max-w-[180rem] py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <section className="mb-8">
          <h2 className="paragraph-24-medium md:h2-medium text-primary-text-900 mb-4">
            {t("section1.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section1.content")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="paragraph-24-medium md:h2-medium text-primary-text-900 mb-6">
            {t("section2.title")}
          </h2>

          <div className="overflow-x-auto">
            <table className="border-primary-text-300 w-full border-collapse border">
              <thead>
                <tr className="bg-primary-text-50">
                  <th className="border-primary-text-300 paragraph-18-semibold text-primary-text-900 border p-4 text-left">
                    {t("table.headers.provider")}
                  </th>
                  <th className="border-primary-text-300 paragraph-18-semibold text-primary-text-900 border p-4 text-left">
                    {t("table.headers.service")}
                  </th>
                  <th className="border-primary-text-300 paragraph-18-semibold text-primary-text-900 border p-4 text-left">
                    {t("table.headers.data")}
                  </th>
                  <th className="border-primary-text-300 paragraph-18-semibold text-primary-text-900 border p-4 text-left">
                    {t("table.headers.location")}
                  </th>
                  <th className="border-primary-text-300 paragraph-18-semibold text-primary-text-900 border p-4 text-left">
                    {t("table.headers.guarantees")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {subcontractors.map((subcontractor, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-primary-text-50/50"
                    }
                  >
                    <td className="border-primary-text-300 paragraph-18-medium text-primary-text-900 border p-4">
                      {subcontractor.provider}
                    </td>
                    <td className="border-primary-text-300 paragraph-18-normal text-primary-text-700 border p-4">
                      {subcontractor.service}
                    </td>
                    <td className="border-primary-text-300 paragraph-18-normal text-primary-text-700 border p-4">
                      {subcontractor.data}
                    </td>
                    <td className="border-primary-text-300 paragraph-18-normal text-primary-text-700 border p-4">
                      {subcontractor.location}
                    </td>
                    <td className="border-primary-text-300 paragraph-18-normal text-primary-text-700 border p-4">
                      {subcontractor.guarantees}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="paragraph-24-medium md:h2-medium text-primary-text-900 mb-4">
            {t("section3.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section3.content.updates")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section3.content.notifications")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section3.content.currentVersion")}
              </span>{" "}
              15/10/2025
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="paragraph-24-medium md:h2-medium text-primary-text-900 mb-4">
            {t("section4.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section4.content.intro")}
          </p>
          <div className="space-y-3">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section4.content.contact")}
              </span>{" "}
              privacy@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section4.content.dpo")}
              </span>{" "}
              dpo@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section4.content.address")}
              </span>{" "}
              Camí Terminal 6A, 07009, Palma de Mallorca
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
