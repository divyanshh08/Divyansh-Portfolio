function Skills({ projects }) {
  const skills = [...new Set(projects.flatMap((project) => project.technologies))]
  const skillGroups = [
    {
      title: 'Project stack',
      description: 'Technologies currently represented in the projects data.',
      items: skills,
    },
  ]

  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>Current tools, kept honest by project data.</h2>
      </div>

      <div className="skill-groups">
        {skillGroups.map((group) => (
          <article className="skill-panel" key={group.title}>
            <div>
              <p>{group.title}</p>
              <span>{group.description}</span>
            </div>

            {group.items.length > 0 ? (
              <div className="skill-list" aria-label={group.title}>
                {group.items.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="muted-text">Add technologies to your projects data.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
