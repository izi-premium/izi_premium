import { getTranslations } from "next-intl/server";

export default async function DSACompliance() {
  const t = await getTranslations("dsaCompliance");

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full bg-white py-[12rem]">
      <div className="container mx-auto w-full max-w-[clamp(140rem,73vw,280rem)] py-8">
        <h1 className="subtitle-medium md:h1-small text-primary-text-900 mb-8">
          {t("title")}
        </h1>

        <div className="mb-8 space-y-4">
          <p className="paragraph-18-normal text-primary-text-700">
            <span className="paragraph-18-semibold">{t("version")}</span> 1.0 ·{" "}
            <span className="paragraph-18-semibold">{t("date")}</span>{" "}
            15/10/2025
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            <span className="paragraph-18-semibold">{t("scope")}</span>{" "}
            {t("scopeContent")}
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            <span className="paragraph-18-semibold">{t("serviceOwner")}</span>{" "}
            OasysNest S.L.U
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            <span className="paragraph-18-semibold">{t("generalContact")}</span>{" "}
            support@iziworld.app
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            <span className="paragraph-18-semibold">{t("dsaContact")}</span>{" "}
            dsa-legal@iziworld.app
          </p>
          <p className="paragraph-18-normal text-primary-text-700">
            <span className="paragraph-18-semibold">
              {t("relationshipOtherDocs")}
            </span>{" "}
            {t("relationshipContent")}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section0.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section0.classification")}
              </span>{" "}
              {t("section0.classificationContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section0.coverage")}
              </span>{" "}
              {t("section0.coverageContent")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section1.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section1.singleContact")}
              </span>{" "}
              dsa-legal@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section1.userContact")}
              </span>{" "}
              support@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section1.rightsContact")}
              </span>{" "}
              Privacy@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section1.contactLanguage")}
              </span>{" "}
              ES/EN
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section1.euRepresentative")}
              </span>{" "}
              {t("section1.euRepresentativeContent")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section2.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section2.notice")}
              </span>{" "}
              {t("section2.noticeContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section2.action")}
              </span>{" "}
              {t("section2.actionContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section2.motivation")}
              </span>{" "}
              {t("section2.motivationContent")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section3.title")}
          </h2>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section3.subsection1.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section3.subsection1.content")}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section3.subsection2.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section3.subsection2.content")}
            </p>
            <div className="mt-3 ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                (a) {t("section3.subsection2.requirements.a")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (b) {t("section3.subsection2.requirements.b")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (c) {t("section3.subsection2.requirements.c")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (d) {t("section3.subsection2.requirements.d")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section3.subsection3.title")}
            </h3>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section3.subsection3.acknowledgment")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section3.subsection3.slaClassification")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section3.subsection3.slaResolution")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section3.subsection3.prioritization")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section3.subsection4.title")}
            </h3>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section3.subsection4.content")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("section3.subsection4.conservation")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="subtitle-semibold text-primary-text-800 mb-3">
              {t("section3.subsection5.title")}
            </h3>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section3.subsection5.content")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section4.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section4.content")}
            </p>
            <div className="ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                (a) {t("section4.requirements.a")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (b) {t("section4.requirements.b")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (c) {t("section4.requirements.c")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (d) {t("section4.requirements.d")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (e) {t("section4.requirements.e")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section5.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section5.channel")}
              </span>{" "}
              {t("section5.channelContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section5.deadline")}
              </span>{" "}
              {t("section5.deadlineContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">{t("section5.sla")}</span>{" "}
              {t("section5.slaContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section5.review")}
              </span>{" "}
              {t("section5.reviewContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section5.result")}
              </span>{" "}
              {t("section5.resultContent")}
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
              {t("section7.content")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section7.registry")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section7.metrics")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section8.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section8.content")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section8.period")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section8.appeal")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section9.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section9.hybrid")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section9.automated")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section9.humanReview")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section9.logic")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section10.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section10.systems")}
            </p>
            <div className="ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section10.uses.matchmaking")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section10.uses.content")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section10.uses.suggestions")}
              </p>
            </div>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section10.parameters")}
              </span>{" "}
              {t("section10.parametersContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section10.noProfiling")}
              </span>{" "}
              {t("section10.noProfilingContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section10.userControls")}
              </span>{" "}
              {t("section10.userControlsContent")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section11.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section11.launch")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section11.ifAdvertising")}
            </p>
            <div className="ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section11.requirements.labeling")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section11.requirements.parameters")}
              </p>
            </div>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section11.prohibitions")}
              </span>{" "}
              {t("section11.prohibitionsContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section11.archive")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section12.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section12.exclusive")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section12.verification")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section12.sensitive")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section13.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section13.content")}
            </p>
            <div className="ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                (a) {t("section13.items.notices")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (b) {t("section13.items.actions")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (c) {t("section13.items.proactive")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (d) {t("section13.items.appeals")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (e) {t("section13.items.requests")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (f) {t("section13.items.abuse")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                (g) {t("section13.items.changes")}
              </p>
            </div>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section13.format")}
              </span>{" "}
              {t("section13.formatContent")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section14.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section14.content")}
          </p>
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
              {t("section17.content")}
            </p>
            <div className="ml-4 space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section17.items.risks")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section17.items.audit")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section17.items.repository")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section17.items.dataAccess")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                • {t("section17.items.crisis")}
              </p>
            </div>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section17.threshold")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section18.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section18.responsible")}
              </span>{" "}
              {t("section18.responsibleContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section18.legalSupport")}
              </span>{" "}
              ATICO34, dpo@iziworld.app
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section18.security")}
              </span>{" "}
              {t("section18.securityContent")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              <span className="paragraph-18-semibold">
                {t("section18.review")}
              </span>{" "}
              {t("section18.reviewContent")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section19.title")}
          </h2>
          <div className="space-y-4">
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section19.conservation")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section19.cooperation")}
            </p>
            <p className="paragraph-18-normal text-primary-text-700">
              {t("section19.reports")}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="h2-medium text-primary-text-900 mb-4">
            {t("section20.title")}
          </h2>
          <p className="paragraph-18-normal text-primary-text-700">
            {t("section20.content")}
          </p>
        </section>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="h2-medium text-primary-text-900 mb-4">
              {t("annexA.title")}
            </h2>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.identification")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.reason")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.description")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.country")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.contact")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.declaration")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexA.documentation")}
              </p>
            </div>
          </section>

          <section>
            <h2 className="h2-medium text-primary-text-900 mb-4">
              {t("annexB.title")}
            </h2>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexB.rule")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexB.facts")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexB.automation")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexB.measure")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexB.resources")}
              </p>
            </div>
          </section>

          <section>
            <h2 className="h2-medium text-primary-text-900 mb-4">
              {t("annexC.title")}
            </h2>
            <div className="space-y-2">
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.noticesByCategory")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.actionsByResult")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.averageTimes")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.automatedVsHuman")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.appeals")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.trustedFlaggers")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.authorityRequests")}
              </p>
              <p className="paragraph-18-normal text-primary-text-700">
                {t("annexC.modelChanges")}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
