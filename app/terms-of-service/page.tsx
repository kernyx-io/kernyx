export const metadata = {
  title: "Terms of Service - Kernyx",
  description: "Terms of service for Kernyx gaming tools and calculators",
};

export default function TermsOfService() {
  const pageStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "'Crimson Pro', serif",
    color: "#d0d8e8",
    lineHeight: 1.8,
    fontSize: "1.1rem",
  };

  const headingStyle = {
    fontFamily: "'Cinzel', serif",
    color: "#c9a84c",
    marginTop: "2rem",
    marginBottom: "1rem",
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ ...headingStyle, fontSize: "2.25rem", marginTop: 0 }}>Terms of Service</h1>
      <p>Last updated: February 2026</p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Acceptance of Terms</h2>
      <p>
        By accessing and using Kernyx, you agree to be bound by these terms of service. If you
        do not agree to these terms, please do not use the website.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Description of Service</h2>
      <p>
        Kernyx is a fan-made website that provides free gaming tools, calculators, and resources
        for various video games. Kernyx is not affiliated with, endorsed by, or connected to any
        game developers or publishers. All game names, logos, and related content are trademarks
        of their respective owners.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Use of the Website</h2>
      <p>
        You agree to use Kernyx only for lawful purposes. You may not use the website in any way
        that could damage, disable, or impair the site or interfere with any other party&apos;s
        use of the site. You may not attempt to gain unauthorized access to any part of the
        website or its systems.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Accuracy of Information</h2>
      <p>
        The tools and calculators on Kernyx are provided for informational and entertainment
        purposes only. While we strive to keep information accurate and up to date, we make no
        guarantees about the completeness or accuracy of any content on the site. Game data may
        change with updates and patches, and our tools may not always reflect the most current
        information.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Intellectual Property</h2>
      <p>
        The original content, features, and functionality of Kernyx are owned by Kernyx and are
        protected by applicable copyright and trademark laws. Game-related content, names, and
        images belong to their respective owners and are used here under fair use for fan and
        informational purposes.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Advertisements</h2>
      <p>
        Kernyx displays third-party advertisements through Google AdSense. We are not responsible
        for the content of these advertisements. Any interactions you have with advertisers are
        solely between you and the advertiser.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Limitation of Liability</h2>
      <p>
        Kernyx is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no
        warranties of any kind, whether express or implied. In no event shall Kernyx be liable
        for any damages arising from the use or inability to use the website.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Changes will be posted on this
        page with an updated date. Your continued use of Kernyx after changes are posted
        constitutes acceptance of the revised terms.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Contact Us</h2>
      <p>
        If you have any questions about these terms, please visit our{" "}
        <a href="/contact" style={{ color: "#c9a84c" }}>Contact</a> page.
      </p>
    </div>
  );
}
