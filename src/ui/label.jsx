import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../lib/utils.js'

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-[0.7rem] font-mono font-medium uppercase tracking-widest',
      'text-[var(--text-secondary)]',
      'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
      'select-none',
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
