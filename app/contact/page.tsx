export const metadata = {
  title: "Contact - Kernyx",
  description: "Contact Kernyx for questions, feedback, or suggestions",
};

const heading = {
  fontFamily: "'Orbitron', sans-serif",
  color: "#00d4ff",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginTop: "2rem",
  marginBottom: "0.75rem",
};

export default function Contact() {
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
      <h1 style={{ ...heading, fontSize: "1.75rem", marginTop: 0 }}>Contact Us</h1>

      <p>
        Have a question, suggestion, or found a bug in one of our tools? We would love to hear
        from you. Kernyx is a community-driven project and your feedback helps make it better
        for everyone.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Get in Touch</h2>
      <p>
        You can reach us by email at:{" "}
        <a href="mailto:contact@kernyx.com" style={{ color: "#00d4ff" }}>
          contact@kernyx.com
        </a>
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Feedback and Suggestions</h2>
      <p>
        Want to see a tool for a game we do not currently support? Have an idea for improving an
        existing calculator? Let us know. We are always looking to expand and improve the tools
        available on Kernyx.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Bug Reports</h2>
      <p>
        If you find an error in any of our calculators or tools, please let us know so we can fix
        it. Include as much detail as possible, such as which tool you were using, what inputs you
        entered, and what the expected result should have been.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Response Time</h2>
      <p>
        Kernyx is maintained by a small team, so please allow a few days for a response. We
        appreciate your patience and support.
      </p>
    </div>
  );
}
