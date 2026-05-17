import React from 'react'


import { Checkbox } from '@/ui/checkbox'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'CHECKBOX',
  description: 'Binary toggle built on Radix UI. Shows a filled square indicator when checked. Supports optional label with auto-generated ID binding.',
  alternates: { canonical: '/components/checkbox' },
}

const previewCode = `import { Checkbox } from '@/ui/checkbox'

<Checkbox label="ENABLE TARGETING" />
<Checkbox label="SHIELD MATRIX" defaultChecked />
<Checkbox label="OFFLINE SYSTEMS" disabled />`

const installCode = `npx shadcn@latest add @shenkong/checkbox`
const usageCode = `import { Checkbox } from '@/ui/checkbox'

export function Example() {
  return (
    <Checkbox
      label="ENABLE AUTO-TARGETING"
      onCheckedChange={(checked) => console.log(checked)}
    />
  )
}`

const controlledCode = `import { useState } from 'react'
import { Checkbox } from '@/ui/checkbox'

export function Controlled() {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      label="ENGAGE WARP DRIVE"
      checked={checked}
      onCheckedChange={(v) => setChecked(v === true)}
    />
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "CHECKBOX",
        description: "Binary toggle built on Radix UI. Shows a filled square indicator when checked. Supports optional label with auto-generated ID binding."                   ,
        dependencies: ['@radix-ui/react-checkbox']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              , React.createElement(Checkbox, { label: "ENABLE TARGETING" } )
              , React.createElement(Checkbox, { label: "SHIELD MATRIX" , defaultChecked: true} )
              , React.createElement(Checkbox, { label: "OFFLINE SYSTEMS" , disabled: true} )
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
        , React.createElement('div', { style: { display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}
          , [
            { label: 'Unchecked',         checked: false, disabled: false },
            { label: 'Checked',           checked: true,  disabled: false },
            { label: 'Disabled',          checked: false, disabled: true  },
            { label: 'Checked + Disabled',checked: true,  disabled: true  },
          ].map((state) => (
            React.createElement('div', { key: state.label, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              , React.createElement(Checkbox, { defaultChecked: state.checked, disabled: state.disabled} )
              , React.createElement('span', { style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}
                , state.label.toUpperCase()
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "CONTROLLED"}
        , React.createElement(CodeBlock, { code: controlledCode} )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'label',            type: 'string',  defaultValue: '—',     description: 'Optional text label rendered next to the checkbox. Auto-generates the id/htmlFor binding.' },
            { prop: 'checked',          type: 'boolean | "indeterminate"', defaultValue: '—', description: 'Controlled checked state.' },
            { prop: 'defaultChecked',   type: 'boolean', defaultValue: 'false', description: 'Initial checked state (uncontrolled).' },
            { prop: 'onCheckedChange',  type: '(checked: boolean | "indeterminate") => void', defaultValue: '—', description: 'Callback fired when the checked state changes.' },
            { prop: 'disabled',         type: 'boolean', defaultValue: 'false', description: 'Disables the checkbox and reduces opacity.' },
            { prop: 'id',               type: 'string',  defaultValue: '—',     description: 'Override the auto-generated id.' },
          ]}
        )
      )
    )
  )
}
