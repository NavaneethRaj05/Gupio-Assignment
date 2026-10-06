import { CATEGORIES, SORT_OPTIONS } from '../utils'

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  hasFilters,
  onClearFilters,
}) {
  return (
    <section className="control-bar">
      <div className="search-box">
        <input
          id="product-search"
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="filter-group">
        <select
          id="filter-cat"
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          id="filter-stock"
          value={stockFilter}
          onChange={e => onStockFilterChange(e.target.value)}
        >
          <option value="">All Stock</option>
          <option value="in-stock">In Stock (&gt;10)</option>
          <option value="low">Low Stock (1-10)</option>
          <option value="out">Out of Stock (0)</option>
        </select>

        <select
          id="sort-select"
          value={sort}
          onChange={e => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasFilters && (
          <button id="clear-btn" className="btn btn-ghost btn-sm" onClick={onClearFilters}>
            Clear
          </button>
        )}

        <div className="view-toggle">
          <button
            id="grid-btn"
            className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => onViewChange('grid')}
          >
            Grid
          </button>
          <button
            id="list-btn"
            className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => onViewChange('list')}
          >
            List
          </button>
        </div>
      </div>
    </section>
  )
}
