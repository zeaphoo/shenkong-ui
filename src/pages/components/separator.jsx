import React from 'react'


import { Separator } from '@/ui/separator'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'SEPARATOR',
  description: 'Thin horizontal or vertical divider built on Radix UI. Optional centered label splits the line for section headers.',
  alternates: { canonical: '/components/separator' },
}

const previewCode = `import { Separator } from '@/ui/separator'

<Separator />
<Separator label="SECTION" />
<Separator orientation="vertical" style={{ height: '32px' }} />`

const installCode = `npx shadcn@latest add @shenkong/separator`
const usageCode = `import { Separator } from '@/ui/separator'

export function Example() {
  return (
    <div>
      <p>Block A</p>
      <Separator label="— CHECKPOINT —" />
      <p>Block B</p>
    </div>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "SEPARATOR",
        description: "Thin horizontal or vertical divider built on Radix UI. Optional centered label splits the line for section headers."                 ,
        dependencies: ['@radix-ui/react-separator']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              , React.createElement(Separator, {} )
              , React.createElement(Separator, { label: "SECTION"} )
              , React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' }}
                , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' }}, "A")
                , React.createElement(Separator, { orientation: "vertical", style: { height: '32px' }} )
                , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' }}, "B")
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
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '2rem' }}
          , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            , React.createElement(Separator, {} )
            , React.createElement('span', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "DEFAULT (horizontal)" )
          )
          , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            , React.createElement(Separator, { label: "CHECKPOINT"} )
            , React.createElement('span', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "WITH LABEL" )
          )
          , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            , React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem', height: '40px' }}
              , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' }}, "LEFT")
              , React.createElement(Separator, { orientation: "vertical", style: { height: '40px' }} )
              , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' }}, "RIGHT")
            )
            , React.createElement('span', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "VERTICAL")
          )
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'label',       type: 'string',                       defaultValue: '—',          description: 'Text centered in the separator. Renders flex layout with line-line-text-line-line.' },
            { prop: 'orientation', type: '"horizontal" | "vertical"',    defaultValue: '"horizontal"',description: 'Direction of the separator line.' },
            { prop: 'decorative',  type: 'boolean',                      defaultValue: 'true',       description: 'When true, hidden from accessibility tree.' },
          ]}
        )
      )
    )
  )
}
