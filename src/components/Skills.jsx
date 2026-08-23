function Skills({ projects }) {
  const skills = [...new Set(projects.flatMap((project) => project.technologies))]

  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>Tools visible in my current project work.</h2>
      </div>

      <div className="skill-panel">
        <p>Project technologies</p>
        {skills.length > 0 ? (
          <div className="skill-list" aria-label="Skills">
            {skills.map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="muted-text">Add technologies to your projects data.</p>
        )}
      </div>
    </section>
  )
}

export default Skills
