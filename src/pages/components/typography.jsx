import React from 'react'


import { Typography } from '@/ui/typography'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'TYPOGRAPHY',
  description: 'Type scale components for headings, body text, and code display.',
  alternates: { canonical: '/components/typography' },
}

const previewCode = `<Typography variant="H1">SYSTEM ONLINE</Typography>
<Typography variant="H2">Subsystem Alpha</Typography>
<Typography variant="H3">Module Status</Typography>
<Typography variant="P">All systems nominal. Awaiting further instructions.</Typography>
<Typography variant="MUTED">Last updated: 2077-03-15 04:22 UTC</Typography>
<Typography variant="CODE">npm install @shenkong/ui</Typography>`

const usageCode = `import { Typography } from '@shenkong/ui'

export function Example() {
  return (
    <Typography variant="H1">SYSTEM ONLINE</Typography>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "TYPOGRAPHY",
        description: "Type scale components for headings, body text, and code display."         }
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { className: "flex flex-col gap-3"  }
              , React.createElement(Typography, { variant: "H1"}, "SYSTEM ONLINE" )
              , React.createElement(Typography, { variant: "H2"}, "Subsystem Alpha" )
              , React.createElement(Typography, { variant: "H3"}, "Module Status" )
              , React.createElement(Typography, { variant: "P"}, "All systems nominal. Awaiting further instructions from command."       )
              , React.createElement(Typography, { variant: "MUTED"}, "Last updated: 2077-03-15 04:22 UTC"    )
              , React.createElement(Typography, { variant: "CODE"}, "npm install @shenkong/ui"  )
            )
          }
        )
      )
      , React.createElement(Section, { title: "INSTALLATION"}
        , React.createElement(CodeBlock, { code: "npx shadcn@latest add @shenkong/typography"   , language: "bash"} )
      )
      , React.createElement(Section, { title: "USAGE"}
        , React.createElement(CodeBlock, { code: usageCode} )
      )
      , React.createElement(Section, { title: "VARIANTS"}
        , React.createElement('div', { className: "flex flex-col gap-4 p-4 border border-[var(--border)]"     }
          , (['H1','H2','H3','H4','P','LEAD','MUTED','CODE'] ).map((v) => (
            React.createElement('div', { key: v, className: "flex items-baseline gap-4"  }
              , React.createElement('span', { className: "text-[0.65rem] font-mono text-[var(--text-muted)] w-12 shrink-0"    }, v)
              , React.createElement(Typography, { variant: v}, "The quick brown fox"   )
            )
          ))
        )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'variant', type: '"H1" | "H2" | "H3" | "H4" | "P" | "LEAD" | "MUTED" | "CODE"', defaultValue: '"P"', description: 'Typography style variant.' },
            { prop: 'as', type: 'string', defaultValue: '—', description: 'Override the rendered HTML element.' },
            { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional CSS classes.' },
          ]}
        )
      )
    )
  )
}
