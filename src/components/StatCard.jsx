export function StatCard({ title, value, meta, variant }) {
  return (
    <div className="stat-card">
      <span className="stat-title">{title}</span>
      <span className={`stat-value ${variant || ''}`}>{value}</span>
      {meta && <span className="stat-meta">{meta}</span>}
    </div>
  )
}

export function StatsGrid({ totalProducts, stockValue, lowStock, outOfStock, categoriesCount }) {
  return (
    <section className="stats-grid">
      <StatCard
        title="Total Products"
        value={totalProducts}
        meta={`${categoriesCount} ${categoriesCount === 1 ? 'category' : 'categories'}`}
      />
      <StatCard
        title="Stock Value"
        value={stockValue}
        meta="total catalog value"
      />
      <StatCard
        title="Low Stock"
        value={lowStock}
        meta="10 units or less"
        variant="warn"
      />
      <StatCard
        title="Out of Stock"
        value={outOfStock}
        meta="requires restocking"
        variant="danger"
      />
    </section>
  )
}
