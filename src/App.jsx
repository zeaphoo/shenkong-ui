import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DocsShell } from './components/docs-shell.jsx'

export default function App() {
  const location = useLocation()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return <DocsShell><Outlet /></DocsShell>
}
