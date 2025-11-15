import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "termsConditions",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TermsConditions() {
  const t = await getTranslations("termsConditions");

  return (
    <div className="min-h-screen w-full bg-white py-[12rem]">
      <div className="flex-begin-col px-mobile md:px-tablet lg:px-desktop container mx-auto max-w-[180rem] gap-8 py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        {/* Provider Info */}
        <section className="flex-begin-col mb-[6.4rem] gap-6 rounded-[1.2rem] p-[3.2rem]">
          <h2 className="h2-medium text-primary-text-900 mb-[2.4rem]">
            {t("provider.title")}
          </h2>
          <div className="space-y-[2.4rem]">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("provider.labels.company")}:{" "}
              </span>
              {t("provider.company")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("provider.labels.address")}:{" "}
              </span>
              {t("provider.address")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("provider.labels.cif")}:{" "}
              </span>
              {t("provider.cif")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("provider.labels.phone")}:{" "}
              </span>
              {t("provider.phone")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("provider.labels.email")}:{" "}
              </span>
              <a
                href={`mailto:${t("provider.email")}`}
                className="text-secondary-action hover:underline"
              >
                {t("provider.email")}
              </a>
            </p>
          </div>
        </section>

        {/* Object */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("object.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("object.intro")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("object.acceptance")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("object.specific")}
          </p>
        </section>

        {/* Electronic Contracting */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("contracting.title")}
          </h2>

          <div className="mb-[4.8rem]">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("contracting.priorInfo.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("contracting.priorInfo.p1")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("contracting.priorInfo.p2")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("contracting.priorInfo.p3")}
            </p>
          </div>

          <div>
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("contracting.procedure.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("contracting.procedure.intro")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("contracting.procedure.access")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("contracting.procedure.phases")}
            </p>

            <ul className="mb-[2.4rem] space-y-[1.2rem]">
              {["identification", "selection", "confirmation"].map((phase) => (
                <li
                  key={phase}
                  className="paragraph-18-normal text-primary-text-700 ml-[2.4rem]"
                >
                  <span className="paragraph-18-semibold text-primary-text-900">
                    •{" "}
                  </span>
                  {t(`contracting.procedure.phaseList.${phase}`)}
                </li>
              ))}
            </ul>

            {Array.from({ length: 9 }).map((_, i) => (
              <p
                key={i}
                className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]"
              >
                {t(`contracting.procedure.p${i + 1}`)}
              </p>
            ))}

            <div className="bg-primary-text-50 mb-[2.4rem] rounded-[1.2rem] p-[2.4rem]">
              <p className="paragraph-18-semibold text-primary-text-900 mb-[1.6rem]">
                {t("contracting.procedure.paymentMethods.title")}
              </p>
              <ul className="space-y-[1.2rem]">
                {["googlePay", "applePay", "stripe"].map((method) => (
                  <li
                    key={method}
                    className="paragraph-18-normal text-primary-text-700 ml-[2.4rem]"
                  >
                    <span className="paragraph-18-semibold text-primary-text-900">
                      •{" "}
                    </span>
                    {t(`contracting.procedure.paymentMethods.${method}`)}
                  </li>
                ))}
              </ul>
            </div>

            <p className="paragraph-18-normal text-primary-text-700">
              {t("contracting.procedure.security")}
            </p>
          </div>
        </section>

        {/* Right of Withdrawal */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("withdrawal.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("withdrawal.intro")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("withdrawal.howTo")}
          </p>

          <div className="bg-primary-text-50 mb-[2.4rem] rounded-[1.2rem] p-[2.4rem]">
            <p className="paragraph-18-normal text-primary-text-700 mb-[1.2rem]">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("withdrawal.contact.postal")}:{" "}
              </span>
              {t("provider.address")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("withdrawal.contact.email")}:{" "}
              </span>
              <a
                href={`mailto:${t("provider.email")}`}
                className="text-secondary-action hover:underline"
              >
                {t("provider.email")}
              </a>
            </p>
          </div>

          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("withdrawal.proof")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("withdrawal.refund")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("withdrawal.condition")}
          </p>
        </section>

        {/* User Obligations */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("obligations.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("obligations.intro")}
          </p>

          <ul className="flex-begin-col gap-6 space-y-[2.4rem]">
            {Array.from({ length: 9 }).map((_, i) => (
              <li key={i} className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold text-primary-text-900">
                  •{" "}
                </span>
                {t(`obligations.list.${i}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* Guarantees */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("guarantees.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("guarantees.intro")}
          </p>

          <ul className="space-y-[2.4rem]">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold text-primary-text-900">
                  •{" "}
                </span>
                {t(`guarantees.list.${i}`)}
              </li>
            ))}
          </ul>

          <p className="paragraph-18-normal text-primary-text-700 mt-[3.2rem] mb-[2.4rem]">
            {t("guarantees.thirdParty")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("guarantees.rescission")}
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("intellectualProperty.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[3.2rem]">
            {t("intellectualProperty.intro")}
          </p>

          <div className="flex-begin-col mb-[4.8rem] gap-6">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("intellectualProperty.platform.title")}
            </h3>
            {Array.from({ length: 7 }).map((_, i) => (
              <p
                key={i}
                className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]"
              >
                {t(`intellectualProperty.platform.p${i + 1}`)}
              </p>
            ))}
          </div>

          <div className="flex-begin-col gap-6">
            <h3 className="subtitle-semibold text-primary-text-900 mb-[2.4rem]">
              {t("intellectualProperty.userContent.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
              {t("intellectualProperty.userContent.p1")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("intellectualProperty.userContent.p2")}
            </p>
          </div>
        </section>

        {/* Confidentiality */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("confidentiality.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("confidentiality.p1")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("confidentiality.p2")}
          </p>
        </section>

        {/* Temporal Conditions */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("temporal.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("temporal.duration")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("temporal.termination")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("temporal.specific")}
          </p>
        </section>

        {/* Economic Conditions */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("economic.title")}
          </h2>
          {Array.from({ length: 6 }).map((_, i) => (
            <p
              key={i}
              className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]"
            >
              {t(`economic.p${i + 1}`)}
            </p>
          ))}
        </section>

        {/* Customer Service */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("customerService.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("customerService.intro")}
          </p>
          <div className="bg-primary-text-50 mb-[2.4rem] rounded-[1.2rem] p-[2.4rem]">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold text-primary-text-900">
                {t("customerService.emailLabel")}:{" "}
              </span>
              {[
                "oasysnest@gmail.com",
                "soporte@iziworld.app",
                "dpo@iziworld.app",
              ].map((email, i, arr) => (
                <span key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-secondary-action hover:underline"
                  >
                    {email}
                  </a>
                  {i < arr.length - 1 ? "; " : ""}
                </span>
              ))}
            </p>
          </div>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("customerService.language")}
          </p>
        </section>

        {/* Contract Termination */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("termination.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("termination.intro")}
          </p>

          <ul className="mb-[3.2rem] space-y-[2.4rem]">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold text-primary-text-900">
                  •{" "}
                </span>
                {t(`termination.reasons.${i}`)}
              </li>
            ))}
          </ul>

          <p className="paragraph-18-normal text-primary-text-700 mb-[2.4rem]">
            {t("termination.payment")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("termination.unilateral")}
          </p>
        </section>

        {/* Dispute Resolution */}
        <section className="flex-begin-col mb-[6.4rem] gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("disputes.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("disputes.content")}{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/main/index.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-action hover:underline"
            >
              https://ec.europa.eu/consumers/odr/main/index.cfm
            </a>
          </p>
        </section>

        {/* Applicable Law */}
        <section className="flex-begin-col gap-6">
          <h2 className="h2-medium text-primary-text-900 mb-[3.2rem]">
            {t("law.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("law.content")}
          </p>
        </section>
      </div>
    </div>
  );
}
