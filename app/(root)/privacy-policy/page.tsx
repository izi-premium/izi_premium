import { useTranslations } from "next-intl";
import { GetStaticProps } from "next";

export default function PrivacyPolicy() {
  const t = useTranslations("privacyPolicy");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full bg-white py-[12rem]">
      <div className="container mx-auto max-w-[clamp(140rem,73vw,280rem)] py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section1.title")}
          </h2>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section1.subsection1.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.subsection1.content")}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section1.subsection2.title")}
            </h3>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                OasysNest S.L.U
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                NIF: B22913834
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section1.subsection2.address")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section1.subsection2.email")} privacy@iziworld.app
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section1.subsection2.website")} iziworld.app
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section1.subsection3.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.subsection3.content")}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section1.subsection4.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section1.subsection4.content")}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section1.subsection5.title")}
            </h3>
            <div className="space-y-3">
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection5.appPolicy")}
                </span>{" "}
                {t("section1.subsection5.appPolicyContent")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection5.cookiePolicy")}
                </span>{" "}
                {t("section1.subsection5.cookiePolicyContent")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection5.terms")}
                </span>{" "}
                {t("section1.subsection5.termsContent")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section1.subsection5.conflict")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section1.subsection6.title")}
            </h3>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection6.website")}
                </span>{" "}
                {t("section1.subsection6.websiteContent")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection6.webUser")}
                </span>{" "}
                {t("section1.subsection6.webUserContent")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection6.cookies")}
                </span>{" "}
                {t("section1.subsection6.cookiesContent")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section1.subsection6.providers")}
                </span>{" "}
                {t("section1.subsection6.providersContent")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section2.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section2.intro")}
          </p>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section2.subsection1.title")}
            </h3>
            <div className="space-y-3">
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section2.subsection1.content.description")}
              </p>
              <div className="ml-4 space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section2.subsection1.content.name")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section2.subsection1.content.email")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section2.subsection1.content.phone")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section2.subsection1.content.country")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section2.subsection2.title")}
            </h3>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection2.content.name")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection2.content.email")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection2.content.message")}
              </p>
            </div>
            <p className="paragraph-18-normal text-primary-text-700 mt-3">
              {t("section2.subsection2.purpose")}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section2.subsection3.title")}
            </h3>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection3.content.ip")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection3.content.browser")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection3.content.cookies")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section2.subsection4.title")}
            </h3>
            <div className="space-y-3">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection4.content.billing")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection4.content.transactions")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section2.subsection4.content.stripe")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                <span className="paragraph-18-semibold">
                  {t("section2.subsection4.content.note")}
                </span>{" "}
                {t("section2.subsection4.content.noteContent")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section2.subsection5.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section2.subsection5.content")}
            </p>
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
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection1.content.createAccount")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection1.content.verifyAge")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection1.content.communications")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection2.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection2.content.respond")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection2.content.support")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection3.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection3.content.processPayments")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection3.content.issueInvoices")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection3.content.manageRequests")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection4.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection4.content.protectIntegrity")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection4.content.detectFraud")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection5.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection5.content.analyzeUsage")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection5.content.evaluateCampaigns")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section3.subsection6.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection6.content.authorities")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section3.subsection6.content.records")}
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
                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section4.subsection1.technical.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.technical.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.technical.consent")}
                  </p>
                </div>

                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section4.subsection1.personalization.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.personalization.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.personalization.consent")}
                  </p>
                </div>

                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section4.subsection1.analytics.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.analytics.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.analytics.tools")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.analytics.consent")}
                  </p>
                </div>

                <div>
                  <h4 className="paragraph-24-semibold text-primary-text-800 mb-2">
                    {t("section4.subsection1.advertising.title")}
                  </h4>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.advertising.description")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    {t("section4.subsection1.advertising.consent")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection2.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection2.banner")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection2.granular")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section4.subsection2.withdraw")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection3.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section4.subsection3.session")}
                  </span>{" "}
                  {t("section4.subsection3.sessionContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section4.subsection3.persistent")}
                  </span>{" "}
                  {t("section4.subsection3.persistentContent")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section4.subsection4.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section4.subsection5.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section4.subsection5.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section5.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section5.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection1.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection1.content.analytics")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection1.content.registration")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection1.content.newsletters")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection2.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection2.content.payments")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection2.content.registration")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection2.content.invoices")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection3.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection3.content.authorities")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection3.content.billing")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section5.subsection4.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection4.content.security")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection4.content.improvements")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section5.subsection4.content.defense")}
                </p>
              </div>
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
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection1.conserved")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection1.notActivated")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection2.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection2.duration")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection2.early")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection3.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection3.duration")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section6.subsection3.identifiers")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section6.subsection4.title")}
              </h3>
              <div className="space-y-2">
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
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section7.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section7.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection1.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.access")}
                  </span>{" "}
                  {t("section7.subsection1.accessContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.rectification")}
                  </span>{" "}
                  {t("section7.subsection1.rectificationContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.erasure")}
                  </span>{" "}
                  {t("section7.subsection1.erasureContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.portability")}
                  </span>{" "}
                  {t("section7.subsection1.portabilityContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.restriction")}
                  </span>{" "}
                  {t("section7.subsection1.restrictionContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.objection")}
                  </span>{" "}
                  {t("section7.subsection1.objectionContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection1.withdrawal")}
                  </span>{" "}
                  {t("section7.subsection1.withdrawalContent")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection2.contact")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  📧 privacy@iziworld.app
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  📮 Camí Terminal 6A, 07009, Palma de Mallorca, España
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection2.requirements")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.requirementsList.name")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.requirementsList.right")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section7.subsection2.requirementsList.country")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection3.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection3.euUk")}
                  </span>{" "}
                  {t("section7.subsection3.euUkContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection3.brazil")}
                  </span>{" "}
                  {t("section7.subsection3.brazilContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section7.subsection3.usa")}
                  </span>{" "}
                  {t("section7.subsection3.usaContent")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section7.subsection3.others")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section7.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section7.subsection4.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section8.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section8.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection1.content.description")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  <span className="paragraph-18-semibold">
                    {t("section8.subsection1.content.withinEEA")}
                  </span>{" "}
                  {t("section8.subsection1.content.withinEEAContent")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection2.content.providers")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection2.content.measures")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection3.content.canada")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection3.content.australia")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section8.subsection4.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection5.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section8.subsection5.content.main")}
                </p>
                <div className="ml-4 space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section8.subsection5.content.stripe")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section8.subsection5.content.google")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section8.subsection5.content.googleAds")}
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    • {t("section8.subsection5.content.hosting")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section8.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section8.subsection6.content.dpas")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section8.subsection6.content.certifications")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section8.subsection6.content.assessments")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section9.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section9.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection1.content.tls")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection1.content.aes")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection1.content.backups")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection2.content.mfa")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection2.content.roles")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection2.content.revocation")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection3.content.logs")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection3.content.monitoring")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection3.content.alerts")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection4.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection4.content.infrastructure")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection4.content.recovery")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection4.content.redundancy")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection5.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection5.content.contracts")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection5.content.training")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  • {t("section9.subsection5.content.review")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section9.subsection6.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section9.subsection6.content")}
              </p>
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
                  {t("section10.subsection1.content.restriction")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection1.content.requirement")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection2.content.verification")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection2.content.purpose")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection3.content.procedure")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection3.content.deadline")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section10.subsection3.content.blocking")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section10.subsection4.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section10.subsection5.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section10.subsection5.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section11.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section11.subsection1.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section11.subsection1.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section11.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section11.subsection2.content.changes")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section11.subsection2.content.cookies")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section11.subsection3.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section11.subsection3.content.effective")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section11.subsection3.content.continued")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section11.subsection3.content.disagreement")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section12.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700 mb-4">
            {t("section12.intro")}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section12.subsection1.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection1.content.gdpr")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection1.content.eprivacy")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection1.content.ukdpa")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section12.subsection2.title")}
              </h3>
              <div className="space-y-2">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection2.content.ccpa")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection2.content.state")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section12.subsection3.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section12.subsection3.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section12.subsection4.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section12.subsection4.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section12.subsection5.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section12.subsection5.content")}
              </p>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section12.subsection6.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection6.content.resolution")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section12.subsection6.content.mediation")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section13.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section13.subsection1.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section13.subsection1.content.contact")}
                </p>
                <div className="space-y-2">
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section13.subsection1.content.privacy")}
                    </span>{" "}
                    privacy@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section13.subsection1.content.support")}
                    </span>{" "}
                    support@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section13.subsection1.content.dpo")}
                    </span>{" "}
                    dpo@iziworld.app
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section13.subsection1.content.address")}
                    </span>{" "}
                    Camí Terminal 6A, 07009, Palma de Mallorca, España
                  </p>
                  <p className="paragraph-18-normal text-primary-text-700">
                    <span className="paragraph-18-semibold">
                      {t("section13.subsection1.content.website")}
                    </span>{" "}
                    iziworld.app
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section13.subsection2.title")}
              </h3>
              <div className="space-y-3">
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section13.subsection2.content.deadline")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section13.subsection2.content.complex")}
                </p>
                <p className="paragraph-18-normal text-primary-text-700">
                  {t("section13.subsection2.content.channel")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="subtitle-semibold text-primary-text-800 mb-3">
                {t("section13.subsection3.title")}
              </h3>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section13.subsection3.content")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section14.title")}
          </h2>
          <p className="paragraph-14-normal text-primary-text-600">
            {t("section14.lastUpdated")}
          </p>
          <p className="paragraph-14-normal text-primary-text-600">
            15/10/2025
          </p>
          <p className="paragraph-18-normal text-primary-text-700 mt-4">
            {t("section14.modification")}
          </p>
        </section>
      </div>
    </div>
  );
}
