// pages/community-rules.tsx
import { useTranslations } from "next-intl";
import { GetStaticProps } from "next";

export default function CommunityRules() {
  const t = useTranslations("communityRules");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full bg-white py-[12rem]">
      <div className="container mx-auto w-full max-w-[clamp(140rem,73vw,280rem)] py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <div className="mb-8">
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("intro")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("purpose")}
          </p>
        </div>

        <section className="mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="subtitle-semibold text-primary-text-900 mb-3">
                1. {t("rule1.title")}
              </h2>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("rule1.content")}
              </p>
            </div>

            <div>
              <h2 className="subtitle-semibold text-primary-text-900 mb-3">
                2. {t("rule2.title")}
              </h2>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("rule2.content")}
              </p>
            </div>

            <div>
              <h2 className="subtitle-semibold text-primary-text-900 mb-3">
                3. {t("rule3.title")}
              </h2>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("rule3.content")}
              </p>
            </div>

            <div>
              <h2 className="subtitle-semibold text-primary-text-900 mb-3">
                4. {t("rule4.title")}
              </h2>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("rule4.content")}
              </p>
            </div>

            <div>
              <h2 className="subtitle-semibold text-primary-text-900 mb-3">
                5. {t("rule5.title")}
              </h2>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("rule5.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-6">
            {t("consequences.title")}
          </h2>

          <div className="mb-4">
            <p className="paragraph-18-medium text-primary-text-700">
              {t("consequences.note")}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                1. {t("consequences.warning.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("consequences.warning.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                2. {t("consequences.temporaryBlock.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("consequences.temporaryBlock.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                3. {t("consequences.sevenDaySuspension.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("consequences.sevenDaySuspension.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                4. {t("consequences.chatExpulsion.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("consequences.chatExpulsion.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                5. {t("consequences.seriousExceptions.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("consequences.seriousExceptions.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-lg">
            <h2 className="h2-medium text-primary-text-900 mb-4">
              {t("reminder.title")}
            </h2>
            <p className="paragraph-18-medium text-primary-text-700">
              {t("reminder.content")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("contact.title")}
          </h2>
          <div className="space-y-3">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("contact.abuse")}
              </span>{" "}
              support@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("contact.privacy")}
              </span>{" "}
              privacy@iziworld.app
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
