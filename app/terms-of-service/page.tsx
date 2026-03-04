export const metadata = {
  title: "Terms of Service - Kernyx",
  description: "Terms of service for Kernyx gaming tools and calculators",
};

const heading = {
  fontFamily: "'Orbitron', sans-serif",
  color: "#00d4ff",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginTop: "2rem",
  marginBottom: "0.75rem",
};

export default function TermsOfService() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: "#c9d1d9",
        lineHeight: 1.8,
        fontSize: "0.95rem",
      }}
    >
      <h1 style={{ ...heading, fontSize: "1.75rem", marginTop: 0 }}>Terms of Service</h1>
      <p style={{ color: "#4a5568", fontSize: "0.85rem" }}>Last updated: February 2026</p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Acceptance of Terms</h2>
      <p>
        By accessing and using Kernyx, you agree to be bound by these terms of service. If you
        do not agree to these terms, please do not use the website.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Description of Service</h2>
      <p>
        Kernyx is a fan-made website that provides free gaming tools, calculators, and resources
        for various video games. Kernyx is not affiliated with, endorsed by, or connected to any
        game developers or publishers. All game names, logos, and related content are trademarks
        of their respective owners.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Use of the Website</h2>
      <p>
        You agree to use Kernyx only for lawful purposes. You may not use the website in any way
        that could damage, disable, or impair the site or interfere with any other party&apos;s
        use of the site. You may not attempt to gain unauthorized access to any part of the
        website or its systems.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Accuracy of Information</h2>
      <p>
        The tools and calculators on Kernyx are provided for informational and entertainment
        purposes only. While we strive to keep information accurate and up to date, we make no
        guarantees about the completeness or accuracy of any content on the site. Game data may
        change with updates and patches, and our tools may not always reflect the most current
        information.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Intellectual Property</h2>
      <p>
        The original content, features, and functionality of Kernyx are owned by Kernyx and are
        protected by applicable copyright and trademark laws. Game-related content, names, and
        images belong to their respective owners and are used here under fair use for fan and
        informational purposes.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Advertisements</h2>
      <p>
        Kernyx displays third-party advertisements through Google AdSense. We are not responsible
        for the content of these advertisements. Any interactions you have with advertisers are
        solely between you and the advertiser.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Limitation of Liability</h2>
      <p>
        Kernyx is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no
        warranties of any kind, whether express or implied. In no event shall Kernyx be liable
        for any damages arising from the use or inability to use the website.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Changes will be posted on this
        page with an updated date. Your continued use of Kernyx after changes are posted
        constitutes acceptance of the revised terms.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Contact Us</h2>
      <p>
        If you have any questions about these terms, please visit our{" "}
        <a href="/contact" style={{ color: "#00d4ff" }}>Contact</a> page.
      </p>
    </div>
  );
}
