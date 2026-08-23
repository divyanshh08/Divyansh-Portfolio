import { skills } from '../data/skills'

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <p className="eyebrow">Technologies & Tools</p>
        <h2>Tools I use to build and learn.</h2>
      </div>

      <div className="skill-groups">
        {skills.map((group) => (
          <article className="skill-panel" key={group.title}>
            <div>
              <p>{group.title}</p>
              <span>{group.description}</span>
            </div>

            <div className="skill-list" aria-label={group.title}>
              {group.items.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills