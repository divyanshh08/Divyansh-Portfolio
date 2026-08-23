function About({ profile }) {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>Building a strong frontend foundation.</h2>
      </div>

      <div className="about-layout">
        <p className="lead-text">{profile.tagline}</p>
        <p>
          I am based in {profile.location}. This portfolio is set up to keep my
          work, links, and learning progress organized in one place.
        </p>
        <dl className="profile-list">
          <div>
            <dt>Role</dt>
            <dd>{profile.title}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default About
