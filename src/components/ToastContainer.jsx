export default function ToastContainer({ toasts, dismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast ${t.type}${t.exiting ? ' exiting' : ''}`}
          onClick={() => dismiss(t.id)}
          title="click to dismiss"
        >
          <span className="toast-dot" />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
