import * as React from 'react'
import { cn } from '../lib/utils.js'

const PRESET_CLASSES = {
  '2-col':        'grid-cols-1 sm:grid-cols-2',
  '3-col':        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4-col':        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  'sidebar-main': 'grid-cols-1 md:grid-cols-[240px_1fr]',
  'main-sidebar': 'grid-cols-1 md:grid-cols-[1fr_240px]',
}

const Grid = React.forwardRef(
  (
    {
      className,
      preset  = '2-col',
      columns,
      gap     = '1rem',
      rows,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          !columns && PRESET_CLASSES[preset],
          className
        )}
        style={{
          ...(columns ? { gridTemplateColumns: columns } : {}),
          gridTemplateRows: rows,
          gap: typeof gap === 'number' ? `${gap}px` : gap,
          ...style,
        }}
        {...props}
      />
    )
  }
)
Grid.displayName = 'Grid'

export { Grid }
