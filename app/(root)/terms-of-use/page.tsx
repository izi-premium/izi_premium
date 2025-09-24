import { useTranslations } from "next-intl";
import { GetStaticProps } from "next";

export default function TermsConditions() {
  const t = useTranslations("termsConditions");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full bg-white py-[12rem]">
      <div className="container mx-auto max-w-[clamp(140rem,73vw,280rem)] px-4 py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section1.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection1.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section1.subsection1.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection2.content.acceptance")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection2.content.binding")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection3.content.documents")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section1.subsection3.content.privacyPolicy")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section1.subsection3.content.cookiePolicy")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section1.subsection3.content.appTerms")}
                  </p>
                </div>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection3.content.conflict")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section1.subsection4.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection5.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection5.content.ageLimit")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection5.content.minors")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection6.content.nature")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection6.content.noSubstitute")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection7.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection7.content.asIs")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection7.content.noGuarantee")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection8.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection8.content.modifications")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection8.content.notification")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section1.subsection9.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection9.content.spanish")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section1.subsection9.content.translations")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section2.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section2.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section2.subsection1.content.compliance")}
                </p>
                <div className="space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection1.content.company")}
                    </span>{" "}
                    OasysNest S.L.U
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection1.content.nif")}
                    </span>{" "}
                    B22913834
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection1.content.address")}
                    </span>{" "}
                    Camí Terminal 6A, 07009, Palma de Mallorca, España
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection1.content.email")}
                    </span>{" "}
                    info@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection1.content.privacy")}
                    </span>{" "}
                    privacy@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection1.content.website")}
                    </span>{" "}
                    https://iziworld.app
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section2.subsection2.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section2.subsection2.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section2.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section2.subsection3.content.compliance")}
                </p>
                <div className="space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection3.content.dpoEmail")}
                    </span>{" "}
                    dpo@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection3.content.dpoAddress")}
                    </span>{" "}
                    Camí Terminal 6A, 07009, Palma de Mallorca, España
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section2.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section2.subsection4.content.authorities")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection4.content.euUk")}
                    </span>{" "}
                    {t("section2.subsection4.content.euUkDeadline")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection4.content.brazil")}
                    </span>{" "}
                    {t("section2.subsection4.content.brazilDeadline")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection4.content.canada")}
                    </span>{" "}
                    {t("section2.subsection4.content.canadaDeadline")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection4.content.usa")}
                    </span>{" "}
                    {t("section2.subsection4.content.usaDeadline")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section2.subsection4.content.others")}
                    </span>{" "}
                    {t("section2.subsection4.content.othersDeadline")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section3.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section3.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection1.content.ageLimit")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection1.content.minors")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection2.content.requirements")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection2.content.responsibility")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection2.content.acceptance")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection3.content.commitment")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section3.subsection3.content.legitimate")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section3.subsection3.content.noFraud")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section3.subsection3.content.noCommercial")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection4.content.ownership")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection4.content.prohibition")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection4.content.userRights")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection5.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection5.content.technical")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection5.content.blocking")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection6.content.responsibility")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section3.subsection6.content.noGuarantee")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section4.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section4.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection1.content.creation")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection1.content.requirements")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection2.content.guarantee")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection2.content.rejection")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection3.content.immediate")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection3.content.activation")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection4.content.responsibility")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection4.content.recommendations")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection4.content.notification")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection5.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection5.content.deletion")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection5.content.reregister")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection6.content.rights")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section4.subsection6.content.block")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section4.subsection6.content.delete")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section5.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection1.content.methods")}
                </p>
                <div className="ml-4">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • Stripe
                  </p>
                </div>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection1.content.storage")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection2.content.standard")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection2.content.processing")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection2.content.controls")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection3.content.completion")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection3.content.subscriptions")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection4.content.final")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection4.content.eu")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection4.content.execution")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection5.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection5.content.automatic")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection5.content.deactivate")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section5.subsection5.content.notification")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection6.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section5.subsection6.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section6.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section6.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection1.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section6.subsection1.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section6.subsection2.technical.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.technical.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.technical.consent")}
                  </p>
                </div>

                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section6.subsection2.personalization.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.personalization.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.personalization.consent")}
                  </p>
                </div>

                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section6.subsection2.analytics.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.analytics.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.analytics.tools")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.analytics.consent")}
                  </p>
                </div>

                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section6.subsection2.advertising.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.advertising.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section6.subsection2.advertising.consent")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection3.content.banner")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection3.content.withdrawal")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section6.subsection4.session")}
                  </span>{" "}
                  {t("section6.subsection4.sessionContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section6.subsection4.persistent")}
                  </span>{" "}
                  {t("section6.subsection4.persistentContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section6.subsection4.analytics")}
                  </span>{" "}
                  {t("section6.subsection4.analyticsContent")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection5.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section6.subsection5.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection6.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section6.subsection6.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section7.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection1.content.responsibility")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection1.content.asIs")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection2.content.measures")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection2.content.affected")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.content.maintenance")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.content.incidents")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.content.failures")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.content.forceMajeure")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection3.content.links")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection3.content.responsibility")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection4.content.nature")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection4.content.substitute")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection5.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section7.subsection5.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection6.content.notResponsible")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection6.content.stripe")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection6.content.providers")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection6.content.errors")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section8.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection1.content.functions")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection1.content.updates")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection2.content.substantial")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection2.content.direct")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection2.content.minor")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection3.content.version")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection3.content.continued")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection3.content.nonAcceptance")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section9.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection1.content.gdpr")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection1.content.eprivacy")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection1.content.ukdpa")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section9.subsection1.content.resolution")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection2.content.ccpa")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection2.content.state")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section9.subsection2.content.disputes")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection3.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section9.subsection3.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section9.subsection4.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection5.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section9.subsection5.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section9.subsection6.content.friendly")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section9.subsection6.content.courts")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section9.subsection6.content.mediation")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section10.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection1.content.contact")}
                </p>
                <div className="space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section10.subsection1.content.info")}
                    </span>{" "}
                    info@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section10.subsection1.content.support")}
                    </span>{" "}
                    support@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section10.subsection1.content.privacy")}
                    </span>{" "}
                    privacy@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section10.subsection1.content.dsa")}
                    </span>{" "}
                    dsa-legal@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section10.subsection1.content.address")}
                    </span>{" "}
                    OasysNest S.L., Camí Terminal 6A, 07009, Palma de Mallorca,
                    España
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section10.subsection1.content.website")}
                    </span>{" "}
                    https://iziworld.app
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection2.content.response")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection2.content.complex")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection2.content.channel")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection3.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section10.subsection3.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section11.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section11.content.approval")}
            </p>
            <p className="paragraph-14-normal text-primary-text-600">
              15/10/2025
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section11.content.modifications")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section11.content.availability")}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
