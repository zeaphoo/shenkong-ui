import React from 'react'


import { Input } from '@/ui/input'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'INPUT',
  description: 'Single-line text field with optional label, prefix symbol, and inline error message. Green caret, amber error states.',
  alternates: { canonical: '/components/input' },
}

const previewCode = `import { Input } from '@/ui/input'

<Input label="CALLSIGN" placeholder="ENTER IDENTIFIER..." />
<Input label="COORDINATES" prefix=">" placeholder="00.0000, 00.0000" />
<Input label="ACCESS CODE" error="Invalid authorization token." />`

const installCode = `npx shadcn@latest add @shenkong/input`
const usageCode = `import { Input } from '@/ui/input'

export function Example() {
  return (
    <Input
      label="TARGET DESIGNATION"
      placeholder="ENTER TARGET ID..."
      onChange={(e) => console.log(e.target.value)}
    />
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "INPUT",
        description: "Single-line text field with optional label, prefix symbol, and inline error message. Green caret, amber error states."                }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              , React.createElement(Input, { label: "CALLSIGN", placeholder: "ENTER IDENTIFIER..." } )
              , React.createElement(Input, { label: "COORDINATES", prefix: ">", placeholder: "00.0000, 00.0000" } )
              , React.createElement(Input, { label: "ACCESS CODE" , error: "Invalid authorization token."  } )
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

      , React.createElement(Section, { title: "STATES"}
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          , [
            { label: 'DEFAULT',  props: { label: 'SECTOR', placeholder: 'ALPHA-7...' } },
            { label: 'PREFIX',   props: { label: 'COMMAND', prefix: '$', placeholder: 'init sequence' } },
            { label: 'ERROR',    props: { label: 'AUTH TOKEN', defaultValue: 'invalid-xyz', error: 'Authorization failed.' } },
            { label: 'DISABLED', props: { label: 'SYSTEM ID', defaultValue: 'SYS-0042', disabled: true } },
          ].map((state) => (
            React.createElement('div', { key: state.label, style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
              , React.createElement(Input, { ...state.props} )
              , React.createElement('span', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
                , state.label
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'label',       type: 'string',  defaultValue: '—',     description: 'Label text displayed above the input. Auto-generates the id/htmlFor binding.' },
            { prop: 'error',       type: 'string',  defaultValue: '—',     description: 'Inline error message shown below. Turns border and label amber.' },
            { prop: 'prefix',      type: 'string',  defaultValue: '—',     description: 'Symbol rendered inside the left edge of the input.' },
            { prop: 'disabled',    type: 'boolean', defaultValue: 'false', description: 'Disables the field and reduces opacity.' },
            { prop: 'placeholder', type: 'string',  defaultValue: '—',     description: 'Placeholder text (inherits --text-muted color).' },
            { prop: 'id',          type: 'string',  defaultValue: '—',     description: 'Override the auto-generated id.' },
          ]}
        )
      )
    )
  )
}
