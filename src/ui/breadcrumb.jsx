import * as React from 'react'
import { cn } from '../lib/utils.js'

const Breadcrumb = React.forwardRef(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5',
      'font-mono text-xs text-[var(--text-muted)]',
      'uppercase tracking-wider',
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'text-[var(--text-muted)] hover:text-[var(--color-green)]',
      'transition-colors duration-150',
      className
    )}
    {...props}
  />
))
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('text-[var(--color-green)]', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('text-[var(--border-active)]', className)}
    {...props}
  >
    {children ?? '>'}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
