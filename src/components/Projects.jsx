import ProjectCard from './ProjectCard.jsx'

function Projects({ projects }) {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading projects-heading">
        <p className="eyebrow">Projects</p>
        <h2>Practical browser projects, presented directly from data.</h2>
        <p>
          A selection of projects built to explore ideas, solve problems, and strengthen my development skills.
        </p>
      </div>

      <div className="project-grid">
        {/* Map turns every project object into one reusable ProjectCard component. */}
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            isFeatured={index === 0}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects
