function About({ profile }) {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>Building a strong frontend foundation.</h2>
      </div>

      <div className="about-layout">
        <div className="about-copy">
          <p className="lead-text">{profile.tagline}</p>
          <p>
            I am based in {profile.location}. This portfolio keeps my project
            work, developer profiles, and resume in one focused place.
          </p>
        </div>

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

        <div className="profile-links" aria-label="Profile links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          {profile.codolio && (
            <a href={profile.codolio} target="_blank" rel="noreferrer">Codolio</a>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
