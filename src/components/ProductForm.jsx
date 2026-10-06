import { useState } from 'react'
import { CATEGORIES, validateForm } from '../utils'

const blank = { name: '', category: '', price: '', stockQuantity: '', description: '' }

export default function ProductForm({ product, onSubmit, onCancel }) {
  const editing = !!product

  const [form, setForm] = useState(editing ? {
    name: product.name,
    category: product.category,
    price: String(product.price),
    stockQuantity: String(product.stockQuantity),
    description: product.description || '',
  } : { ...blank })

  const [touched, setTouched] = useState({})
  const [saving, setSaving] = useState(false)

  const errors = validateForm(form)

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setTouched(t => ({ ...t, [k]: true }))
  }

  async function submit(e) {
    e.preventDefault()
    setTouched(Object.fromEntries(Object.keys(blank).map(k => [k, true])))
    const errs = validateForm(form)
    if (Object.keys(errs).length) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 120))
    setSaving(false)
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      price: parseFloat(Number(form.price).toFixed(2)),
      stockQuantity: parseInt(form.stockQuantity, 10),
      description: form.description.trim(),
    })
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="modal-head">
        <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
        <button type="button" className="modal-x" onClick={onCancel}>×</button>
      </div>

      <div className="modal-body">
        <div className="form-row">

          <div className="form-group full">
            <label htmlFor="f-name">Product Name <span className="req">*</span></label>
            <input
              id="f-name"
              type="text"
              className={errors.name && touched.name ? 'err' : ''}
              placeholder="Enter product name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              maxLength={100}
              autoFocus
              autoComplete="off"
            />
            {errors.name && touched.name && <div className="err-msg">{errors.name}</div>}
          </div>

          <div className="form-group full">
            <label htmlFor="f-cat">Category <span className="req">*</span></label>
            <select
              id="f-cat"
              className={errors.category && touched.category ? 'err' : ''}
              value={form.category}
              onChange={e => set('category', e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, category: true }))}
            >
              <option value="">Select category</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && touched.category && <div className="err-msg">{errors.category}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="f-price">Price (₹) <span className="req">*</span></label>
            <input
              id="f-price"
              type="number"
              className={errors.price && touched.price ? 'err' : ''}
              placeholder="Enter price"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, price: true }))}
              min="0" step="0.01"
            />
            {errors.price && touched.price && <div className="err-msg">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="f-stock">Stock Quantity <span className="req">*</span></label>
            <input
              id="f-stock"
              type="number"
              className={errors.stockQuantity && touched.stockQuantity ? 'err' : ''}
              placeholder="Enter quantity"
              value={form.stockQuantity}
              onChange={e => set('stockQuantity', e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, stockQuantity: true }))}
              min="0" step="1"
            />
            {errors.stockQuantity && touched.stockQuantity && <div className="err-msg">{errors.stockQuantity}</div>}
          </div>

          <div className="form-group full">
            <label htmlFor="f-desc">Description</label>
            <textarea
              id="f-desc"
              placeholder="Enter description (optional)"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              maxLength={1000}
              rows={3}
            />
            {errors.description && <div className="err-msg">{errors.description}</div>}
          </div>

        </div>
      </div>

      <div className="modal-foot">
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={saving}>Cancel</button>
        <button type="submit" id="submit-btn" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  )
}
