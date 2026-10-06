import { stockStatus, fmtPrice } from '../utils'

export function ProductCard({ product, onView, onEdit, onDelete }) {
  const stock = stockStatus(product.stockQuantity)

  return (
    <article className="product-card" onClick={onView}>
      <div className="card-top">
        <span className="card-category">{product.category}</span>
        <span className={`status-indicator ${stock.cls}`}>
          <span className="status-dot" />
          {stock.label}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-name">{product.name}</h3>
        <p className={`card-desc ${!product.description ? 'card-desc-empty' : ''}`}>
          {product.description || 'No description available'}
        </p>
      </div>

      <div className="card-footer">
        <div>
          <div className="card-price">{fmtPrice(product.price)}</div>
          <div className="card-stock">{product.stockQuantity} in stock</div>
        </div>
        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button id={`view-${product.id}`} className="btn btn-ghost btn-sm" onClick={onView}>
            View
          </button>
          <button id={`edit-${product.id}`} className="btn btn-outline btn-sm" onClick={onEdit}>
            Edit
          </button>
          <button id={`del-${product.id}`} className="btn btn-danger-outline btn-sm" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

const TABLE_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stockQuantity', label: 'Stock' },
  { key: 'createdAt', label: 'Added' },
]

export function ProductTable({ products, sortField, sortDir, onSort, onView, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {TABLE_COLUMNS.map(col => (
              <th key={col.key} onClick={() => onSort(col.key)}>
                {col.label} {sortField === col.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const stock = stockStatus(product.stockQuantity)
            const dateStr = new Date(product.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })

            return (
              <tr key={product.id} onClick={() => onView(product)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className="tbl-name">{product.name}</div>
                  <div
                    className={`tbl-desc ${!product.description ? 'tbl-desc-empty' : ''}`}
                    title={product.description || ''}
                  >
                    {product.description || 'No description available'}
                  </div>
                </td>
                <td>
                  <span className="tbl-category">{product.category}</span>
                </td>
                <td style={{ fontWeight: 600 }}>{fmtPrice(product.price)}</td>
                <td>
                  <span className={`status-indicator ${stock.cls}`}>
                    <span className="status-dot" />
                    {product.stockQuantity} units ({stock.label})
                  </span>
                </td>
                <td style={{ color: '#6b7280', fontSize: 12 }}>{dateStr}</td>
                <td onClick={e => e.stopPropagation()}>
                  <div className="tbl-actions">
                    <button id={`tv-${product.id}`} className="btn btn-ghost btn-sm" onClick={() => onView(product)}>
                      View
                    </button>
                    <button id={`te-${product.id}`} className="btn btn-outline btn-sm" onClick={() => onEdit(product)}>
                      Edit
                    </button>
                    <button id={`td-${product.id}`} className="btn btn-danger-outline btn-sm" onClick={() => onDelete(product)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
