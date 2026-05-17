import React from 'react'






export function PageHeader({ title, description, dependencies }) {
  return (
    React.createElement('div', {
      style: {
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border)',
      }}

      , React.createElement('h1', {
        style: {
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
        }}

        , title
      )
      , React.createElement('p', {
        style: {
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          marginBottom: dependencies && dependencies.length > 0 ? '1rem' : '0',
        }}

        , description
      )
      , dependencies && dependencies.length > 0 && (
        React.createElement('div', { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}
          , React.createElement('span', { style: { color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.08em' }}, "DEPS:"

          )
          , dependencies.map((dep) => (
            React.createElement('span', {
              key: dep,
              style: {
                fontSize: '0.7rem',
                color: 'var(--color-green)',
                border: '1px solid var(--border)',
                padding: '1px 6px',
                letterSpacing: '0.04em',
              }}

              , dep
            )
          ))
        )
      )
    )
  )
}
