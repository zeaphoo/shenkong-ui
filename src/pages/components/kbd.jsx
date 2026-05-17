import React from 'react'


import { Kbd } from '@/ui/kbd'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'KBD',
  description: 'Keyboard key display element styled as a terminal key cap.',
  alternates: { canonical: '/components/kbd' },
}

const previewCode = `<Kbd>Ctrl</Kbd>
<Kbd>⌘</Kbd>
<Kbd>⇧</Kbd>
<Kbd>Enter</Kbd>`

const usageCode = `import { Kbd } from '@shenkong/ui'

export function Example() {
  return (
    <p className="text-sm text-muted">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open command palette.
    </p>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "KBD",
        description: "Keyboard key display element styled as a terminal key cap."         }
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { className: "flex items-center gap-2"  }
              , React.createElement(Kbd, {}, "Ctrl")
              , React.createElement(Kbd, {}, "⌘")
              , React.createElement(Kbd, {}, "⇧")
              , React.createElement(Kbd, {}, "Enter")
            )
          }
        )
      )
      , React.createElement(Section, { title: "INSTALLATION"}
        , React.createElement(CodeBlock, { code: "npx shadcn@latest add @shenkong/kbd"   , language: "bash"} )
      )
      , React.createElement(Section, { title: "USAGE"}
        , React.createElement(CodeBlock, { code: usageCode} )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            {
              prop: 'children',
              type: 'ReactNode',
              defaultValue: '—',
              description: 'Key label content.',
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
