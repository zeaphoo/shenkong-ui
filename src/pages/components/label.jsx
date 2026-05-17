import React from 'react'


import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'LABEL',
  description: 'Accessible form label using Radix UI Label primitive.',
  alternates: { canonical: '/components/label' },
}

const previewCode = `<Label htmlFor="callsign">CALLSIGN</Label>
<Input id="callsign" placeholder="ENTER CALLSIGN" />`

const usageCode = `import { Label } from '@shenkong/ui'

export function Example() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">EMAIL</Label>
      <input id="email" type="email" />
    </div>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "LABEL",
        description: "Accessible form label using Radix UI Label primitive."       ,
        dependencies: ['@radix-ui/react-label']}
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { className: "flex flex-col gap-2"  }
              , React.createElement(Label, { htmlFor: "demo-callsign"}, "CALLSIGN")
              , React.createElement(Input, { id: "demo-callsign", placeholder: "ENTER CALLSIGN" } )
            )
          }
        )
      )
      , React.createElement(Section, { title: "INSTALLATION"}
        , React.createElement(CodeBlock, { code: "npx shadcn@latest add @shenkong/label"   , language: "bash"} )
      )
      , React.createElement(Section, { title: "USAGE"}
        , React.createElement(CodeBlock, { code: usageCode} )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            {
              prop: 'htmlFor',
              type: 'string',
              defaultValue: '—',
              description: 'ID of the associated form control.',
            },
            {
              prop: 'className',
              type: 'string',
              defaultValue: '—',
              description: 'Additional CSS classes.',
            },
          ]}
        )
      )
    )
  )
}
