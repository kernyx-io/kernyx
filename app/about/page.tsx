export const metadata = {
  title: "About - Kernyx",
  description: "About Kernyx - fan-made gaming tools and calculators",
};

export default function About() {
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
      <h1 style={{ ...headingStyle, fontSize: "2.25rem", marginTop: 0 }}>About Kernyx</h1>

      <p>
        Kernyx is a fan-made website dedicated to providing free, high-quality gaming tools and
        calculators for players who want to get the most out of their favorite games. Whether you
        are planning a naval fleet, calculating damage output, or just looking for useful
        resources, Kernyx is here to help.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Our Mission</h2>
      <p>
        We believe that gaming communities deserve accessible, well-designed tools that are free
        to use. Kernyx was built by gamers, for gamers, with the goal of creating a go-to hub for
        gaming utilities across multiple titles.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>What We Offer</h2>
      <p>
        Kernyx currently features tools and resources for games including World of Sea Battle and
        Skull and Bones, with plans to expand to more titles over time. Our tools include damage
        calculators, fleet builders, interactive maps, and more. Each tool is built with care and
        attention to accuracy based on real in-game data.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Community Driven</h2>
      <p>
        Kernyx grows with feedback from players like you. If you have a suggestion for a new tool
        or want to see support for a different game, reach out through our{" "}
        <a href="/contact" style={{ color: "#c9a84c" }}>Contact</a> page. Your input directly
        shapes what we build next.
      </p>

      <h2 style={{ ...headingStyle, fontSize: "1.5rem" }}>Disclaimer</h2>
      <p>
        Kernyx is an independent fan project and is not affiliated with, endorsed by, or
        connected to any game developers or publishers. All game titles, logos, and related
        content are trademarks of their respective owners. Content on this site is provided for
        informational and entertainment purposes under fair use.
      </p>
    </div>
  );
}
