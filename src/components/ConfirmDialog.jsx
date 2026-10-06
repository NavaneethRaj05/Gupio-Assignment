export default function ConfirmDialog({ product, onConfirm, onCancel }) {
  if (!product) return null

  return (
    <>
      <div className="modal-head">
        <h2>Confirm Delete</h2>
        <button className="modal-x" onClick={onCancel}>×</button>
      </div>
      <div className="modal-body confirm-body">
        <h3 style={{ marginBottom: 8 }}>Delete this product?</h3>
        <p>
          Are you sure you want to delete <strong>"{product.name}"</strong>? This action cannot be undone.
        </p>
      </div>
      <div className="modal-foot">
        <button id="cancel-del" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button id="confirm-del" className="btn btn-danger-outline" onClick={() => onConfirm(product.id)}>Yes, Delete</button>
      </div>
    </>
  )
}
