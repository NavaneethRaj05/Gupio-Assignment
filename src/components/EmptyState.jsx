export default function EmptyState({ isCatalogEmpty, onAddProduct, onClearFilters }) {
  return (
    <div className="empty">
      <p className="empty-title">
        {isCatalogEmpty ? 'No products in catalog' : 'No matching products'}
      </p>
      <p className="empty-sub">
        {isCatalogEmpty
          ? 'Click "+ Add Product" above to create your first item.'
          : 'Try adjusting your search query or clear active filters.'}
      </p>
      {isCatalogEmpty ? (
        <button
          className="btn btn-primary"
          onClick={onAddProduct}
          style={{ marginTop: 14 }}
        >
          + Add Product
        </button>
      ) : (
        <button
          className="btn btn-outline"
          onClick={onClearFilters}
          style={{ marginTop: 12 }}
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
