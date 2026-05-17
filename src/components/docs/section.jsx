import React from 'react'







export function Section({ title, children }) {
  return (
    React.createElement('section', { style: { marginBottom: '2.5rem' }}
      , React.createElement('h2', {
        style: {
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.15em',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--border)',
          textTransform: 'uppercase',
        }}

        , title
      )
      , children
    )
  )
}
