export default function Modal({ isOpen, onClose, maxWidth, children }) {
  if (!isOpen) return null

  return (
    <div
      className="overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" style={maxWidth ? { maxWidth } : {}}>
        {children}
      </div>
    </div>
  )
}
