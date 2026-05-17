import React from 'react'


import { Grid } from '@/ui/grid'
import { StatCard } from '@/ui/stat-card'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'GRID',
  description: 'Responsive dashboard layout wrapper. Pre-baked column presets for common layouts. Accepts a custom columns string for full CSS grid-template-columns control.',
  alternates: { canonical: '/components/grid' },
}

// Placeholder tile for layout demos
function Tile({ label, muted }) {
  return (
    React.createElement('div', {
      style: {
        border:        '1px solid var(--border)',
        background:    muted ? 'var(--surface)' : 'var(--surface-raised)',
        padding:       '1rem',
        fontSize:      '0.6rem',
        color:         muted ? 'var(--text-muted)' : 'var(--text-secondary)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textAlign:     'center',
      }}

      , label
    )
  )
}

const previewCode = `import { Grid } from '@/ui/grid'
import { StatCard } from '@/ui/stat-card'

<Grid preset="4-col" gap="1rem">
  <StatCard label="REACTOR OUTPUT" value="94.7%"  variant="ACTIVE"   sublabel="NOMINAL"  />
  <StatCard label="HULL INTEGRITY" value="61%"    variant="WARNING"  sublabel="DEGRADED" />
  <StatCard label="CREW MANIFEST"  value="312"                       sublabel="ABOARD"   />
  <StatCard label="CORE TEMP"      value="4820°K" variant="CRITICAL" sublabel="CRITICAL" />
</Grid>`

const installCode = `npx shadcn@latest add @shenkong/grid`
const usageCode = `import { Grid } from '@/ui/grid'

// Pre-baked preset
<Grid preset="3-col" gap="1rem">
  <Panel>...</Panel>
  <Panel>...</Panel>
  <Panel>...</Panel>
</Grid>

// sidebar + main layout
<Grid preset="sidebar-main" gap="1rem">
  <nav>...</nav>
  <main>...</main>
</Grid>

// Custom template
<Grid columns="2fr 1fr 1fr" gap="0.75rem">
  ...
</Grid>`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "GRID",
        description: "Responsive dashboard layout wrapper. Pre-baked column presets for common layouts. Accepts a custom columns string for full CSS grid-template-columns control."                   }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(Grid, { preset: "4-col", gap: "1rem", style: { width: '100%' }}
              , React.createElement(StatCard, { label: "REACTOR OUTPUT" , value: "94.7%",  variant: "ACTIVE",   sublabel: "NOMINAL"}  )
              , React.createElement(StatCard, { label: "HULL INTEGRITY" , value: "61%",    variant: "WARNING",  sublabel: "DEGRADED"} )
              , React.createElement(StatCard, { label: "CREW MANIFEST" ,  value: "312",                       sublabel: "ABOARD"}   )
              , React.createElement(StatCard, { label: "CORE TEMP" ,      value: "4820°K", variant: "CRITICAL", sublabel: "CRITICAL"} )
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

      , React.createElement(Section, { title: "PRESETS"}
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}
          , (
            [
              { preset: '2-col',        slots: ['COLUMN A', 'COLUMN B'] },
              { preset: '3-col',        slots: ['COLUMN A', 'COLUMN B', 'COLUMN C'] },
              { preset: '4-col',        slots: ['COL A', 'COL B', 'COL C', 'COL D'] },
              { preset: 'sidebar-main', slots: ['SIDEBAR 240px', 'MAIN CONTENT 1fr'] },
              { preset: 'main-sidebar', slots: ['MAIN CONTENT 1fr', 'SIDEBAR 240px'] },
            ] 
          ).map(({ preset, slots }) => (
            React.createElement('div', { key: preset}
              , React.createElement('p', {
                style: {
                  marginBottom:  '0.4rem',
                  fontSize:      '0.6rem',
                  color:         'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}
, "preset=\""
                , preset, "\""
              )
              , React.createElement(Grid, { preset: preset, gap: "0.5rem", style: { width: '100%' }}
                , slots.map((label, i) => (
                  React.createElement(Tile, { key: i, label: label, muted: i > 0} )
                ))
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'preset',    type: '2-col | 3-col | 4-col | sidebar-main | main-sidebar', defaultValue: '"2-col"',    description: 'Pre-baked grid-template-columns value.' },
            { prop: 'columns',   type: 'string',                                              defaultValue: 'undefined', description: 'Custom CSS grid-template-columns. Overrides preset.' },
            { prop: 'gap',       type: 'string | number',                                     defaultValue: '"1rem"',    description: 'CSS gap between grid cells.' },
            { prop: 'rows',      type: 'string',                                              defaultValue: 'undefined', description: 'Custom CSS grid-template-rows.' },
            { prop: 'className', type: 'string',                                              defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        )
      )
    )
  )
}
