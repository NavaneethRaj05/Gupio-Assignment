import { stockStatus, fmtPrice, fmtDate } from '../utils'

export default function ProductDetailModal({ product, onEdit, onDelete, onClose }) {
  if (!product) return null

  const stock = stockStatus(product.stockQuantity)
  const percent = Math.min(100, (product.stockQuantity / Math.max(100, product.stockQuantity)) * 100)
  const barColor = product.stockQuantity === 0 ? '#ef4444' : product.stockQuantity <= 10 ? '#d97706' : '#16a34a'

  return (
    <>
      <div className="modal-head">
        <div>
          <h2 style={{ marginBottom: 4 }}>{product.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="card-category">{product.category}</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span className={`status-indicator ${stock.cls}`}>
              <span className="status-dot" />
              {stock.label}
            </span>
          </div>
        </div>
        <button className="modal-x" onClick={onClose}>×</button>
      </div>

      <div className="modal-body">
        <div className="detail-grid">
          <div className="detail-item">
            <div className="dlabel">Price</div>
            <div className="dprice">{fmtPrice(product.price)}</div>
          </div>
          <div className="detail-item">
            <div className="dlabel">Stock</div>
            <div className="dval" style={{ fontSize: 20, fontWeight: 700 }}>
              {product.stockQuantity} <span style={{ fontSize: 13, fontWeight: 400, color: '#6b7280' }}>units</span>
            </div>
          </div>
        </div>

        <div className="detail-item" style={{ marginBottom: 14 }}>
          <div className="dlabel">Description</div>
          <div className={`dval ${!product.description ? 'dval-empty' : ''}`}>
            {product.description || 'No description available'}
          </div>
        </div>

        <div className="divider" />

        <div className="detail-grid">
          <div className="detail-item">
            <div className="dlabel">Added on</div>
            <div className="dval">{fmtDate(product.createdAt)}</div>
          </div>
          <div className="detail-item">
            <div className="dlabel">ID</div>
            <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9ca3af', wordBreak: 'break-all' }}>{product.id}</div>
          </div>
        </div>

        <div className="stock-bar-wrap">
          <div className="stock-bar-label">Stock Level</div>
          <div className="stock-bar">
            <div className="stock-bar-fill" style={{ width: `${percent}%`, background: barColor }} />
          </div>
        </div>
      </div>

      <div className="modal-foot">
        <button className="btn btn-danger-outline" onClick={() => onDelete(product)}>Delete</button>
        <button className="btn btn-outline" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={() => onEdit(product)}>Edit Product</button>
      </div>
    </>
  )
}
