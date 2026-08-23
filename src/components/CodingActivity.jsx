import CodingStats from './CodingStats.jsx'
import ContributionHeatmap from './ContributionHeatmap.jsx'

function CodingActivity({ profile, activity }) {
  return (
    <section className="section coding-section" id="activity">
      <div className="section-heading">
        <p className="eyebrow">Coding Activity</p>
        <h2>Coding signals ready for real integrations.</h2>
      </div>

      <div className="activity-grid">
        <article className="activity-panel activity-panel-large">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">{activity.github.label}</p>
              <h3>Contribution calendar</h3>
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>

          <ContributionHeatmap
            cells={activity.github.heatmap}
            label="GitHub contribution preview with pending data"
          />

          <p className="pending-note">
            {activity.github.status}. This is a visual placeholder for a future
            GitHub integration, not live contribution data.
          </p>
        </article>

        <CodingStats stats={activity.github.stats} />
      </div>
    </section>
  )
}

export default CodingActivity
