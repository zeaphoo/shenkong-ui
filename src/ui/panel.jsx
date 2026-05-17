import * as React from 'react'
import { cn } from '../lib/utils.js'

/* ── Panel (outer container) ── */
const Panel = React.forwardRef(({ className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('rounded-none', className)}
      style={{
        background:  'var(--surface)',
        border:      '1px solid var(--border)',
        overflow:    'hidden',
        ...style,
      }}
      {...props}
    />
  )
})
Panel.displayName = 'Panel'

/* ── PanelHeader ── */
const PanelHeader = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{
      display:      'flex',
      alignItems:   'center',
      padding:      '0.6rem 1rem',
      borderBottom: '1px solid var(--border)',
      background:   'var(--surface-raised)',
      gap:          '0.5rem',
      ...style,
    }}
    {...props}
  />
))
PanelHeader.displayName = 'PanelHeader'

/* ── PanelTitle ── */
const PanelTitle = React.forwardRef(({ className, style, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(className)}
    style={{
      fontSize:      '0.7rem',
      fontWeight:    600,
      color:         'var(--text-muted)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      margin:        0,
      ...style,
    }}
    {...props}
  />
))
PanelTitle.displayName = 'PanelTitle'

/* ── PanelContent ── */
const PanelContent = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{ padding: '1rem', ...style }}
    {...props}
  />
))
PanelContent.displayName = 'PanelContent'

/* ── PanelFooter ── */
const PanelFooter = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{
      display:    'flex',
      alignItems: 'center',
      padding:    '0.6rem 1rem',
      borderTop:  '1px solid var(--border)',
      background: 'var(--surface-raised)',
      gap:        '0.5rem',
      ...style,
    }}
    {...props}
  />
))
PanelFooter.displayName = 'PanelFooter'

export { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter }
