import { useState, useEffect } from 'react'

let nextId = 1

export function useToast() {
  const [toasts, setToasts] = useState([])

  function addToast(msg, type = 'info', duration = 3000) {
    const id = nextId++
    setToasts(prev => [...prev, { id, msg, type }])

    // auto remove after duration
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => t.id === id ? { ...t, exiting: true } : t)
      )
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 280)
    }, duration)

    return id
  }

  function dismiss(id) {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 280)
  }

  return { toasts, addToast, dismiss }
}


// debounce hook - grabbed this pattern off stackoverflow basically
export function useDebounce(val, delay = 300) {
  const [dVal, setDVal] = useState(val)

  useEffect(() => {
    const t = setTimeout(() => setDVal(val), delay)
    return () => clearTimeout(t)
  }, [val, delay])

  return dVal
}
