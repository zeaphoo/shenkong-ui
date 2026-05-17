import React from 'react'











export function PropsTable({ rows }) {
  const thStyle = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.12em',
    fontWeight: 600,
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface-raised)',
    whiteSpace: 'nowrap',
  }

  const tdStyle = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    borderBottom: '1px solid var(--border)',
    verticalAlign: 'top',
    lineHeight: 1.5,
  }

  return (
    React.createElement('div', { style: { border: '1px solid var(--border)', overflowX: 'auto' }}
      , React.createElement('table', { style: { width: '100%', minWidth: '560px', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)' }}
        , React.createElement('thead', {}
          , React.createElement('tr', {}
            , React.createElement('th', { style: thStyle}, "PROP")
            , React.createElement('th', { style: thStyle}, "TYPE")
            , React.createElement('th', { style: thStyle}, "DEFAULT")
            , React.createElement('th', { style: { ...thStyle, width: '100%' }}, "DESCRIPTION")
          )
        )
        , React.createElement('tbody', {}
          , rows.map((row, i) => (
            React.createElement('tr', {
              key: row.prop,
              style: { background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}

              , React.createElement('td', { style: { ...tdStyle, color: 'var(--color-green)', whiteSpace: 'nowrap' }}
                , row.prop
              )
              , React.createElement('td', { style: { ...tdStyle, color: 'var(--color-blue)', whiteSpace: 'nowrap' }}
                , row.type
              )
              , React.createElement('td', { style: { ...tdStyle, color: 'var(--color-amber)', whiteSpace: 'nowrap' }}
                , row.defaultValue
              )
              , React.createElement('td', { style: { ...tdStyle, color: 'var(--text-secondary)' }}
                , row.description
              )
            )
          ))
        )
      )
    )
  )
}
