import React from 'react'


import { Progress } from '@/ui/progress'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'PROGRESS',
  description: 'ASCII bracket progress bar. Fills with = characters across a 20-char width. Optional label and percentage readout.',
  alternates: { canonical: '/components/progress' },
}

const previewCode = `import { Progress } from '@/ui/progress'

<Progress value={67} label="POWER CORE" />
<Progress value={30} label="FUEL CELLS" />
<Progress value={95} label="SHIELD MATRIX" />`

const installCode = `npx shadcn@latest add @shenkong/progress`
const usageCode = `import { Progress } from '@/ui/progress'

export function StatusReadout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '240px' }}>
      <Progress value={72} label="REACTOR OUTPUT" />
      <Progress value={45} label="LIFE SUPPORT" showValue={false} />
    </div>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "PROGRESS",
        description: "ASCII bracket progress bar. Fills with = characters across a 20-char width. Optional label and percentage readout."                ,
        dependencies: ['@radix-ui/react-progress']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              , React.createElement(Progress, { value: 67, label: "POWER CORE" } )
              , React.createElement(Progress, { value: 30, label: "FUEL CELLS" } )
              , React.createElement(Progress, { value: 95, label: "SHIELD MATRIX" } )
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

      , React.createElement(Section, { title: "VALUES"}
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}
          , [0, 25, 50, 75, 100].map((v) => (
            React.createElement(Progress, { key: v, value: v, label: `VALUE: ${v}`} )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'value',     type: 'number',  defaultValue: '0',    description: 'Progress value from 0 to 100. Clamped to range.' },
            { prop: 'label',     type: 'string',  defaultValue: '—',    description: 'Optional label shown above the bar in uppercase muted text.' },
            { prop: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Show the percentage number after the closing bracket.' },
          ]}
        )
      )
    )
  )
}
