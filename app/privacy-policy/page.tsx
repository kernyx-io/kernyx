export const metadata = {
  title: "Privacy Policy - Kernyx",
  description: "Privacy policy for Kernyx gaming tools and calculators",
};

const heading = {
  fontFamily: "'Orbitron', sans-serif",
  color: "#00d4ff",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginTop: "2rem",
  marginBottom: "0.75rem",
};

export default function PrivacyPolicy() {
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
      <h1 style={{ ...heading, fontSize: "1.75rem", marginTop: 0 }}>Privacy Policy</h1>
      <p style={{ color: "#4a5568", fontSize: "0.85rem" }}>Last updated: February 2026</p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Introduction</h2>
      <p>
        Welcome to Kernyx. This privacy policy explains how we collect, use, and protect your
        information when you visit our website. By using Kernyx, you agree to the terms outlined
        in this policy.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Information We Collect</h2>
      <p>
        Kernyx does not require you to create an account or provide any personal information to
        use our gaming tools and calculators. However, we may automatically collect certain
        information through cookies and similar technologies, including your IP address, browser
        type, device type, pages visited, and time spent on the site. This data is collected
        through third-party analytics services to help us understand how visitors use the site.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Google AdSense</h2>
      <p>
        We use Google AdSense to display advertisements on our website. Google AdSense may use
        cookies and web beacons to collect information about your visits to this and other
        websites in order to provide relevant advertisements. Google&apos;s use of advertising
        cookies enables it and its partners to serve ads based on your visit to Kernyx and other
        sites on the internet. You may opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" style={{ color: "#00d4ff" }}>
          Google Ads Settings
        </a>
        .
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Google Analytics</h2>
      <p>
        We use analytics services to track and analyze website traffic. These services may
        collect information such as how often you visit the site, what pages you visit, and what
        other sites you used prior to coming to Kernyx. We use this information solely to improve
        our website and content.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Cookies</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. Kernyx and
        its third-party partners use cookies for analytics and advertising purposes. You can
        control cookie settings through your browser. Please note that disabling cookies may
        affect your experience on the site.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Third-Party Links</h2>
      <p>
        Kernyx may contain links to external websites. We are not responsible for the privacy
        practices or content of these third-party sites. We encourage you to review the privacy
        policies of any external sites you visit.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Children&apos;s Privacy</h2>
      <p>
        Kernyx is not directed at children under the age of 13. We do not knowingly collect
        personal information from children. If you believe a child has provided us with personal
        information, please contact us and we will take steps to remove that information.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on this
        page with an updated revision date. Your continued use of Kernyx after any changes
        indicates your acceptance of the updated policy.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please visit our{" "}
        <a href="/contact" style={{ color: "#00d4ff" }}>Contact</a> page.
      </p>
    </div>
  );
}
