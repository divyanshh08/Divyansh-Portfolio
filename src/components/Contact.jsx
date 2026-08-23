function Contact({ profile }) {
  const hasResume = Boolean(profile.resume && profile.resume !== '#')

  return (
    <section className="contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s connect.</h2>
        <p className="contact-copy">
          Reach me directly by email or through the profiles where I share code
          and coding progress.
        </p>
      </div>

      <div className="contact-links">
        <a className="contact-primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
        {profile.codolio && (
          <a href={profile.codolio} target="_blank" rel="noreferrer">Codolio</a>
        )}
        {hasResume && <a href={profile.resume}>Resume</a>}
      </div>
    </section>
  )
}

export default Contact
