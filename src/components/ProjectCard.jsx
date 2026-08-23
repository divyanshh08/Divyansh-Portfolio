function ProjectCard({ project, isFeatured }) {
  const hasImage = Boolean(project.image)
  const hasGithub = Boolean(project.github && !project.github.includes('YOUR_'))
  const hasLive = Boolean(
    project.live &&
      !project.live.includes('YOUR_') &&
      project.live !== project.github,
  )

  return (
    <article className={isFeatured ? 'project-card project-card-featured' : 'project-card'}>
      <div className="project-media">
        {hasImage ? (
          <img src={project.image} alt={`${project.title} screenshot`} />
        ) : (
          <div className="project-placeholder" aria-label={`${project.title} preview not added`}>
            <span>{project.title.slice(0, 2)}</span>
            <small>Preview pending</small>
          </div>
        )}
      </div>

      <div className="project-content">
        <p className="project-label">{isFeatured ? 'Featured project' : 'Project'}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-tech-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-links">
          {/* Props let this card receive different project data without duplicating JSX. */}
          {hasGithub && (
            <a className="project-link-primary" href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {hasLive && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live demo
            </a>
          )}
          {!hasGithub && !hasLive && <span className="project-link-missing">Links pending</span>}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
