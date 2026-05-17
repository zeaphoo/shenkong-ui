import React from 'react'


import { Switch } from '@/ui/switch'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'SWITCH',
  description: 'Binary toggle built on Radix UI. Displays [OFF] / [ON] text labels instead of a sliding thumb. Green glow on checked state.',
  alternates: { canonical: '/components/switch' },
}

const previewCode = `import { Switch } from '@/ui/switch'

<Switch label="TARGETING SYSTEM" />
<Switch label="SHIELD MATRIX" defaultChecked />
<Switch label="OFFLINE" disabled />`

const installCode = `npx shadcn@latest add @shenkong/switch`
const usageCode = `import { Switch } from '@/ui/switch'

export function Example() {
  return (
    <Switch
      label="AUTO-PILOT"
      onCheckedChange={(checked) => console.log('auto-pilot:', checked)}
    />
  )
}`

const controlledCode = `import { useState } from 'react'
import { Switch } from '@/ui/switch'

export function Controlled() {
  const [enabled, setEnabled] = useState(false)
  return (
    <Switch
      label="WARP DRIVE"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "SWITCH",
        description: "Binary toggle built on Radix UI. Displays [OFF] / [ON] text labels instead of a sliding thumb. Green glow on checked state."                     ,
        dependencies: ['@radix-ui/react-switch']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              , React.createElement(Switch, { label: "TARGETING SYSTEM" } )
              , React.createElement(Switch, { label: "SHIELD MATRIX" , defaultChecked: true} )
              , React.createElement(Switch, { label: "OFFLINE", disabled: true} )
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
            { label: 'OFF',              checked: false, disabled: false },
            { label: 'ON',               checked: true,  disabled: false },
            { label: 'DISABLED OFF',     checked: false, disabled: true  },
            { label: 'DISABLED ON',      checked: true,  disabled: true  },
          ].map((state) => (
            React.createElement('div', { key: state.label, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              , React.createElement(Switch, { defaultChecked: state.checked, disabled: state.disabled} )
              , React.createElement('span', { style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}
                , state.label
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
            { prop: 'label',          type: 'string',  defaultValue: '—',     description: 'Optional text label next to the switch. Auto-generates the id/htmlFor binding.' },
            { prop: 'checked',        type: 'boolean', defaultValue: '—',     description: 'Controlled checked state.' },
            { prop: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Initial state (uncontrolled).' },
            { prop: 'onCheckedChange',type: '(checked: boolean) => void', defaultValue: '—', description: 'Callback fired on state change.' },
            { prop: 'disabled',       type: 'boolean', defaultValue: 'false', description: 'Disables the switch and reduces opacity.' },
          ]}
        )
      )
    )
  )
}
