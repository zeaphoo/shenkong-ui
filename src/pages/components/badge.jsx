import React from 'react'


import { Badge } from '@/ui/badge'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'BADGE',
  description: 'Compact status indicator with semantic variants. Monospace font, uppercase, minimal padding. SCANNING variant includes a blink animation.',
  alternates: { canonical: '/components/badge' },
}

const previewCode = `import { Badge } from '@/ui/badge'

<Badge variant="ACTIVE">ONLINE</Badge>
<Badge variant="SCANNING">SCANNING</Badge>
<Badge variant="WARNING">WARNING</Badge>
<Badge variant="CRITICAL">CRITICAL</Badge>
<Badge variant="OFFLINE">OFFLINE</Badge>`

const installCode = `npx shadcn@latest add @shenkong/badge`
const usageCode = `import { Badge } from '@/ui/badge'

export function StatusBar() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge variant="ACTIVE">REACTOR ONLINE</Badge>
      <Badge variant="WARNING">SHIELD LOW</Badge>
      <Badge variant="CRITICAL">HULL BREACH</Badge>
    </div>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "BADGE",
        description: "Compact status indicator with semantic variants. Monospace font, uppercase, minimal padding. SCANNING variant includes a blink animation."                }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(React.Fragment, null
              , React.createElement(Badge, { variant: "ACTIVE"}, "ONLINE")
              , React.createElement(Badge, { variant: "SCANNING"}, "SCANNING")
              , React.createElement(Badge, { variant: "WARNING"}, "WARNING")
              , React.createElement(Badge, { variant: "CRITICAL"}, "CRITICAL")
              , React.createElement(Badge, { variant: "OFFLINE"}, "OFFLINE")
            )
          }
        )
      )

      , React.createElement(Section, { title: "INSTALLATION"}
        , React.createElement(CodeBlock, { code: installCode, language: "bash"} )
      )

      , React.createElement(Section, { title: "USAGE"}
        , React.createElement(CodeBlock, { code: usageCode} )
      )

      , React.createElement(Section, { title: "VARIANTS"}
        , React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
          }}

          , (['ACTIVE', 'SCANNING', 'WARNING', 'CRITICAL', 'OFFLINE'] ).map((v) => (
            React.createElement('div', {
              key: v,
              style: {
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            '0.75rem',
                padding:        '1.25rem',
                border:         '1px solid var(--border)',
                background:     'var(--surface)',
              }}

              , React.createElement(Badge, { variant: v}, v)
              , React.createElement('span', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "variant=\""
                , v, "\""
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'variant',   type: 'ACTIVE | SCANNING | WARNING | CRITICAL | OFFLINE', defaultValue: 'ACTIVE', description: 'Controls color, glow, and animated prefix symbol.' },
            { prop: 'className', type: 'string',                                            defaultValue: '—',      description: 'Additional classes merged via cn().' },
          ]}
        )
      )
    )
  )
}
