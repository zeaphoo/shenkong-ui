import React from 'react'


import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'ALERT',
  description: 'Full-width contextual message with left accent border. Four semantic variants for status, warning, critical, and info states.',
  alternates: { canonical: '/components/alert' },
}

const previewCode = `import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'

<Alert variant="STATUS">
  <AlertTitle>SYSTEM STATUS</AlertTitle>
  <AlertDescription>All subsystems operating within normal parameters.</AlertDescription>
</Alert>`

const installCode = `npx shadcn@latest add @shenkong/alert`
const usageCode = `import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'

export function Example() {
  return (
    <Alert variant="WARNING">
      <AlertTitle>WARNING</AlertTitle>
      <AlertDescription>
        Power core temperature exceeding safe threshold.
      </AlertDescription>
    </Alert>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "ALERT",
        description: "Full-width contextual message with left accent border. Four semantic variants for status, warning, critical, and info states."                }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              , React.createElement(Alert, { variant: "STATUS"}
                , React.createElement(AlertTitle, {}, "SYSTEM STATUS" )
                , React.createElement(AlertDescription, {}, "All subsystems operating within normal parameters."     )
              )
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
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem' }}
          , (['STATUS', 'WARNING', 'CRITICAL', 'INFO'] ).map((v) => (
            React.createElement('div', { key: v, style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
              , React.createElement(Alert, { variant: v}
                , React.createElement(AlertTitle, {}, v)
                , React.createElement(AlertDescription, {}
                  , v === 'STATUS'   && 'All systems nominal. Ready for operation.'
                  , v === 'WARNING'  && 'Elevated power consumption detected. Monitor closely.'
                  , v === 'CRITICAL' && 'Hull breach imminent. Evacuate affected sector immediately.'
                  , v === 'INFO'     && 'Scheduled maintenance cycle begins in 48 hours.'
                )
              )
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
            { prop: 'variant',   type: 'STATUS | WARNING | CRITICAL | INFO', defaultValue: 'STATUS', description: 'Controls left border color, glow, and prefix symbol.' },
            { prop: 'className', type: 'string',                              defaultValue: '—',      description: 'Additional classes merged via cn().' },
          ]}
        )
        , React.createElement('p', { style: { marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}, "AlertTitle and AlertDescription extend "
              , React.createElement('code', {}, "React.HTMLAttributes<HTMLDivElement>"), "."
        )
      )
    )
  )
}
