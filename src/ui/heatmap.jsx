import * as React from 'react'
import { cn } from '../lib/utils.js'

function accentForVariant(v) {
  switch (v) {
    case 'GREEN': return 'var(--color-green)'
    case 'AMBER': return 'var(--color-amber)'
    case 'RED':   return 'var(--color-red)'
  }
}

const Heatmap = React.forwardRef(
  (
    {
      className,
      data,
      columns,
      rowLabels,
      colLabels,
      title,
      variant   = 'GREEN',
      max,
      cellSize  = 16,
      style,
      ...props
    },
    ref
  ) => {
    const cells = data.map((d) =>
      typeof d === 'number' ? { value: d } : d
    )

    const computedMax = max ?? Math.max(...cells.map((c) => c.value), 1)
    const accentColor  = accentForVariant(variant)
    const rows         = Math.ceil(cells.length / columns)
    const hasRowLabels = rowLabels && rowLabels.length > 0
    const hasColLabels = colLabels && colLabels.length > 0

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          border:      '1px solid var(--border)',
          background:  'var(--surface)',
          fontFamily:  'var(--font-mono)',
          overflowX:   'auto',
          display:     'inline-block',
          maxWidth:    '100%',
          ...style,
        }}
        {...props}
      >
        {title && (
          <div
            style={{
              padding:       '0.4rem 0.75rem',
              borderBottom:  '1px solid var(--border)',
              background:    'var(--surface-raised)',
              fontSize:      '0.6rem',
              color:         'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        )}

        <div style={{ padding: '0.75rem' }}>
          {hasColLabels && (
            <div
              style={{
                display:     'flex',
                marginLeft:  hasRowLabels ? '3rem' : 0,
                marginBottom: '0.25rem',
                gap:          '2px',
              }}
            >
              {colLabels.slice(0, columns).map((lbl, i) => (
                <div
                  key={i}
                  style={{
                    width:         cellSize,
                    textAlign:     'center',
                    fontSize:      '0.5rem',
                    color:         'var(--text-muted)',
                    letterSpacing: '0.04em',
                    overflow:      'hidden',
                    whiteSpace:    'nowrap',
                    textOverflow:  'ellipsis',
                    flexShrink:    0,
                  }}
                >
                  {lbl}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <div key={rowIdx} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {hasRowLabels && (
                  <div
                    style={{
                      width:         '2.75rem',
                      fontSize:      '0.5rem',
                      color:         'var(--text-muted)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      overflow:      'hidden',
                      whiteSpace:    'nowrap',
                      textOverflow:  'ellipsis',
                      flexShrink:    0,
                      paddingRight:  '0.25rem',
                      textAlign:     'right',
                    }}
                  >
                    {rowLabels[rowIdx] ?? ''}
                  </div>
                )}

                {Array.from({ length: columns }).map((_, colIdx) => {
                  const cellIdx  = rowIdx * columns + colIdx
                  const cell     = cells[cellIdx]
                  if (!cell) {
                    return (
                      <div
                        key={colIdx}
                        style={{
                          width:      cellSize,
                          height:     cellSize,
                          flexShrink: 0,
                        }}
                      />
                    )
                  }
                  const alpha = 0.06 + (cell.value / computedMax) * 0.88

                  return (
                    <div
                      key={colIdx}
                      title={cell.label ?? String(cell.value)}
                      style={{
                        width:      cellSize,
                        height:     cellSize,
                        position:   'relative',
                        background: 'var(--surface-raised)',
                        flexShrink: 0,
                        cursor:     'default',
                      }}
                    >
                      <div
                        style={{
                          position:   'absolute',
                          inset:      0,
                          background: accentColor,
                          opacity:    Math.min(alpha, 1),
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
Heatmap.displayName = 'Heatmap'

export { Heatmap }
