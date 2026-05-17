import React from 'react'


import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/ui/select'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'SELECT',
  description: 'Dropdown selector built on Radix UI. Portaled content with green highlighted item indicator. Supports groups, labels, and separators.',
  alternates: { canonical: '/components/select' },
}

const previewCode = `import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/ui/select'

<Select>
  <SelectTrigger style={{ width: '220px' }}>
    <SelectValue placeholder="SELECT SECTOR..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="alpha">ALPHA-7</SelectItem>
    <SelectItem value="beta">BETA-3</SelectItem>
    <SelectItem value="gamma">GAMMA-9</SelectItem>
  </SelectContent>
</Select>`

const installCode = `npx shadcn@latest add @shenkong/select`
const usageCode = `import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem, SelectLabel, SelectGroup,
} from '@/ui/select'

export function SectorSelect() {
  return (
    <Select onValueChange={(v) => console.log(v)}>
      <SelectTrigger style={{ width: '240px' }}>
        <SelectValue placeholder="SELECT SECTOR..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>INNER SYSTEMS</SelectLabel>
          <SelectItem value="alpha">ALPHA-7</SelectItem>
          <SelectItem value="beta">BETA-3</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>OUTER RIM</SelectLabel>
          <SelectItem value="gamma">GAMMA-9</SelectItem>
          <SelectItem value="delta">DELTA-2</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "SELECT",
        description: "Dropdown selector built on Radix UI. Portaled content with green highlighted item indicator. Supports groups, labels, and separators."                 ,
        dependencies: ['@radix-ui/react-select']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(Select, {}
              , React.createElement(SelectTrigger, { style: { width: '220px' }}
                , React.createElement(SelectValue, { placeholder: "SELECT SECTOR..." } )
              )
              , React.createElement(SelectContent, {}
                , React.createElement(SelectItem, { value: "alpha"}, "ALPHA-7")
                , React.createElement(SelectItem, { value: "beta"}, "BETA-3")
                , React.createElement(SelectItem, { value: "gamma"}, "GAMMA-9")
                , React.createElement(SelectItem, { value: "delta"}, "DELTA-2")
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

      , React.createElement(Section, { title: "ANATOMY"}
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
          , [
            ['Select',          'Root — manages open/value state.'],
            ['SelectTrigger',   'Button that opens the dropdown. Shows selected value or placeholder.'],
            ['SelectValue',     'Displays the current selected value. Renders placeholder when empty.'],
            ['SelectContent',   'Portaled dropdown list. Positions relative to trigger width.'],
            ['SelectGroup',     'Groups related items together. Pair with SelectLabel.'],
            ['SelectLabel',     'Non-interactive group heading. Uppercase, muted, small.'],
            ['SelectItem',      'Selectable option. Highlights green on hover. Shows ■ when selected.'],
            ['SelectSeparator', 'Horizontal rule between groups.'],
          ].map(([comp, desc]) => (
            React.createElement('div', { key: comp, style: { display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}
              , React.createElement('code', { style: { color: 'var(--color-green)', fontSize: '0.7rem', minWidth: '150px', flexShrink: 0 }}, comp)
              , React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}, desc)
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'value',         type: 'string',                    defaultValue: '—',     description: 'Controlled value.' },
            { prop: 'defaultValue',  type: 'string',                    defaultValue: '—',     description: 'Initial value (uncontrolled).' },
            { prop: 'onValueChange', type: '(value: string) => void',   defaultValue: '—',     description: 'Callback when selection changes.' },
            { prop: 'disabled',      type: 'boolean',                   defaultValue: 'false', description: 'Disables the trigger.' },
            { prop: 'placeholder',   type: 'string (on SelectValue)',   defaultValue: '—',     description: 'Text shown when no value is selected.' },
          ]}
        )
      )
    )
  )
}
