export const metadata = {
  title: "About - Kernyx",
  description: "About Kernyx - unofficial fan-made gaming tools and calculators",
};

const heading = {
  fontFamily: "'Orbitron', sans-serif",
  color: "#00d4ff",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginTop: "2rem",
  marginBottom: "0.75rem",
};

export default function About() {
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
      <h1 style={{ ...heading, fontSize: "1.75rem", marginTop: 0 }}>About Kernyx</h1>

      <p>
        Kernyx is a fan-made website dedicated to providing free, high-quality gaming tools and
        calculators for players who want to get the most out of their favorite games. Whether you
        are planning builds, calculating stats, or just looking for useful resources, Kernyx is
        here to help.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Our Mission</h2>
      <p>
        We believe that gaming communities deserve accessible, well-designed tools that are free
        to use. Kernyx was built by gamers, for gamers, with the goal of creating a go-to hub for
        gaming utilities across multiple titles.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>What We Offer</h2>
      <p>
        Kernyx provides tools and resources for a growing list of games, with plans to expand
        over time. Our tools include calculators, guides, interactive references, and more. Each
        tool is built with care and attention to accuracy based on real in-game data.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Community Driven</h2>
      <p>
        Kernyx grows with feedback from players like you. If you have a suggestion for a new tool
        or want to see support for a different game, reach out through our{" "}
        <a href="/contact" style={{ color: "#00d4ff" }}>Contact</a> page or use the Suggest a
        Game feature. Your input directly shapes what we build next.
      </p>

      <h2 style={{ ...heading, fontSize: "1.15rem" }}>Disclaimer</h2>
      <p>
        Kernyx is an independent fan project and is not affiliated with, endorsed by, or
        connected to any game developers or publishers. All game titles, logos, and related
        content are trademarks of their respective owners. Content on this site is provided for
        informational and entertainment purposes under fair use.
      </p>
    </div>
  );
}
