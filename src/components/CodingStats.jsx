function CodingStats({ stats }) {
  return (
    <article className="activity-panel stats-panel">
      <div>
        <p className="panel-kicker">GitHub statistics</p>
        <h3>Live numbers pending</h3>
      </div>

      <dl className="coding-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export default CodingStats
