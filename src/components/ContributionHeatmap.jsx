function ContributionHeatmap({ cells, label }) {
  return (
    <div className="heatmap-wrap">
      <div className="heatmap" role="img" aria-label={label}>
        {cells.map((level, index) => (
          <span
            className={`heatmap-cell heatmap-level-${level}`}
            key={`${level}-${index}`}
            title="Pending contribution data"
          />
        ))}
      </div>

      <div className="heatmap-legend" aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span className={`heatmap-cell heatmap-level-${level}`} key={level} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

export default ContributionHeatmap
