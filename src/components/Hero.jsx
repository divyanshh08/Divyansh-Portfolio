import AsciiPortrait from "./AsciiPortrait";

function Hero({ profile }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-copy">
        <p className="eyebrow">Available from {profile.location}</p>
        <h1>
          {profile.name}
          <span>{profile.title}</span>
        </h1>
        <p className="hero-tagline">{profile.tagline}</p>

        <div className="hero-actions" aria-label="Primary links">
          <a className="button button-primary" href="#projects">
            See projects
          </a>
          <a className="button button-secondary" href="#contact">
            Get in touch
          </a>
        </div>

        <div className="hero-socials" aria-label="Profile links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer">
            LeetCode
          </a>
          {profile.codolio && (
            <a href={profile.codolio} target="_blank" rel="noreferrer">
              Codolio
            </a>
          )}
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-visual">
          <img
            src="/images/hero-static.png"
            alt="Portrait"
            className="hero-static-image"
          />
        </div>
        <div className="hero-note">
          <span>Frontend focus</span>
          <strong>{profile.tagline}</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
