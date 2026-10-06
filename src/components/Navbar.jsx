export default function Navbar({ onAddProduct }) {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <div className="brand">
          <div>
            <h1 className="brand-title">Product Management Dashboard</h1>
            <p className="brand-sub">Inventory catalog & stock management</p>
          </div>
        </div>
        <button
          id="add-product-btn"
          className="btn btn-primary"
          onClick={onAddProduct}
        >
          + Add Product
        </button>
      </div>
    </header>
  )
}
