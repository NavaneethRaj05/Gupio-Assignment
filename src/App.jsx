import { useState, useEffect } from 'react'
import './index.css'

import {
  loadProducts,
  saveProducts,
  genId,
  applyFilters,
  fmtPrice,
} from './utils'

import { useToast, useDebounce } from './hooks'
import ToastContainer from './components/ToastContainer'
import Navbar from './components/Navbar'
import { StatsGrid } from './components/StatCard'
import FilterBar from './components/FilterBar'
import EmptyState from './components/EmptyState'
import Modal from './components/Modal'
import ProductForm from './components/ProductForm'
import { ProductCard, ProductTable } from './components/ProductViews'
import ProductDetailModal from './components/ProductDetailModal'
import ConfirmDialog from './components/ConfirmDialog'

export default function App() {
  const [products, setProducts] = useState(() => loadProducts())
  const [modal, setModal] = useState(null) // 'add' | 'edit' | 'view' | 'delete' | null
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [view, setView] = useState('grid')

  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 250)
  const [category, setCategory] = useState('')
  const [stockFilter, setStockFilter] = useState('')
  const [sort, setSort] = useState('newest')
  const [tableSort, setTableSort] = useState({ field: 'createdAt', dir: 'desc' })

  const { toasts, addToast, dismiss } = useToast()

  // Save products to localStorage on changes
  useEffect(() => {
    saveProducts(products)
  }, [products])

  // Close active modal on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && modal) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modal])

  const filteredProducts = applyFilters(products, { search, category, stockFilter, sort })

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stockQuantity, 0)
  const outOfStockCount = products.filter(p => p.stockQuantity === 0).length
  const lowStockCount = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length
  const totalCategories = new Set(products.map(p => p.category)).size

  function closeModal() {
    setModal(null)
    setSelectedProduct(null)
  }

  function handleAdd(data) {
    const newProduct = { id: genId(), createdAt: Date.now(), ...data }
    setProducts(prev => [newProduct, ...prev])
    addToast(`"${data.name}" added successfully`, 'success')
    closeModal()
  }

  function handleEdit(data) {
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...data } : p))
    addToast(`"${data.name}" updated`, 'success')
    closeModal()
  }

  function handleDelete(id) {
    const target = products.find(p => p.id === id)
    setProducts(prev => prev.filter(p => p.id !== id))
    addToast(`"${target?.name}" deleted`, 'info')
    closeModal()
  }

  function handleTableSort(field) {
    const dir = tableSort.field === field && tableSort.dir === 'asc' ? 'desc' : 'asc'
    setTableSort({ field, dir })

    const sortMap = {
      'name-asc': 'name-asc',
      'name-desc': 'name-desc',
      'price-asc': 'price-low',
      'price-desc': 'price-high',
      'stockQuantity-asc': 'stock-low',
      'stockQuantity-desc': 'stock-high',
      'createdAt-asc': 'oldest',
      'createdAt-desc': 'newest',
    }

    const sortKey = `${field}-${dir}`
    if (sortMap[sortKey]) {
      setSort(sortMap[sortKey])
    }
  }

  const hasFilters = Boolean(searchInput || category || stockFilter || sort !== 'newest')

  function clearAllFilters() {
    setSearchInput('')
    setCategory('')
    setStockFilter('')
    setSort('newest')
  }

  function openAddModal() {
    setSelectedProduct(null)
    setModal('add')
  }

  function openViewModal(product) {
    setSelectedProduct(product)
    setModal('view')
  }

  function openEditModal(product) {
    setSelectedProduct(product)
    setModal('edit')
  }

  function openDeleteModal(product) {
    setSelectedProduct(product)
    setModal('delete')
  }

  return (
    <div className="app">
      <Navbar onAddProduct={openAddModal} />

      <main className="container main-content">
        <StatsGrid
          totalProducts={products.length}
          stockValue={fmtPrice(totalValue)}
          lowStock={lowStockCount}
          outOfStock={outOfStockCount}
          categoriesCount={totalCategories}
        />

        <FilterBar
          search={searchInput}
          onSearchChange={setSearchInput}
          category={category}
          onCategoryChange={setCategory}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
          hasFilters={hasFilters}
          onClearFilters={clearAllFilters}
        />

        <div className="results-header">
          <p>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
            {hasFilters && ' (filtered)'}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <EmptyState
            isCatalogEmpty={products.length === 0}
            onAddProduct={openAddModal}
            onClearFilters={clearAllFilters}
          />
        ) : view === 'grid' ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onView={() => openViewModal(product)}
                onEdit={() => openEditModal(product)}
                onDelete={() => openDeleteModal(product)}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            sortField={tableSort.field}
            sortDir={tableSort.dir}
            onSort={handleTableSort}
            onView={openViewModal}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        )}
      </main>

      <Modal isOpen={Boolean(modal)} onClose={closeModal} maxWidth={modal === 'delete' ? 380 : undefined}>
        {modal === 'add' && <ProductForm onSubmit={handleAdd} onCancel={closeModal} />}
        {modal === 'edit' && <ProductForm product={selectedProduct} onSubmit={handleEdit} onCancel={closeModal} />}
        {modal === 'view' && (
          <ProductDetailModal
            product={selectedProduct}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onClose={closeModal}
          />
        )}
        {modal === 'delete' && (
          <ConfirmDialog product={selectedProduct} onConfirm={handleDelete} onCancel={closeModal} />
        )}
      </Modal>

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  )
}