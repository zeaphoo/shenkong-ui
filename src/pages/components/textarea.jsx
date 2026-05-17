import React from 'react'


import { Textarea } from '@/ui/textarea'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'TEXTAREA',
  description: 'Multi-line text field with optional label and inline error message. Non-resizable by default. Minimum height 80px. Green caret, amber error states.',
  alternates: { canonical: '/components/textarea' },
}

const previewCode = `import { Textarea } from '@/ui/textarea'

<Textarea label="MISSION BRIEFING" placeholder="Enter mission details..." />
<Textarea label="TRANSMISSION LOG" error="Message exceeds 512 byte limit." />`

const installCode = `npx shadcn@latest add @shenkong/textarea`
const usageCode = `import { Textarea } from '@/ui/textarea'

export function Example() {
  return (
    <Textarea
      label="ENCODED MESSAGE"
      placeholder="PASTE CIPHER TEXT HERE..."
      rows={6}
      onChange={(e) => console.log(e.target.value)}
    />
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "TEXTAREA",
        description: "Multi-line text field with optional label and inline error message. Non-resizable by default. Minimum height 80px. Green caret, amber error states."                    }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              , React.createElement(Textarea, { label: "MISSION BRIEFING" , placeholder: "Enter mission details..."  } )
              , React.createElement(Textarea, { label: "TRANSMISSION LOG" , error: "Message exceeds 512 byte limit."    } )
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
            { label: 'DEFAULT',  props: { label: 'FIELD NOTES', placeholder: 'Enter notes...' } },
            { label: 'ERROR',    props: { label: 'COORDINATES', defaultValue: 'invalid data', error: 'Coordinate format invalid.' } },
            { label: 'DISABLED', props: { label: 'LOCKED RECORD', defaultValue: 'READ ONLY — Access level insufficient.', disabled: true } },
          ].map((state) => (
            React.createElement('div', { key: state.label, style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
              , React.createElement(Textarea, { ...state.props} )
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
            { prop: 'label',    type: 'string',  defaultValue: '—',     description: 'Label text above the textarea. Auto-generates the id/htmlFor binding.' },
            { prop: 'error',    type: 'string',  defaultValue: '—',     description: 'Inline error message below. Turns border and label amber.' },
            { prop: 'rows',     type: 'number',  defaultValue: '—',     description: 'Number of visible text rows (HTML rows attribute).' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the textarea and reduces opacity.' },
            { prop: 'id',       type: 'string',  defaultValue: '—',     description: 'Override the auto-generated id.' },
          ]}
        )
      )
    )
  )
}
