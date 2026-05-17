import * as React from 'react'
import { cn } from '../lib/utils.js'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[var(--surface-raised)] border border-[var(--border)]',
        'rounded-none',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
