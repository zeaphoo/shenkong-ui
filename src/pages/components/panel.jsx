import React from 'react'


import { Panel, PanelHeader, PanelTitle, PanelContent } from '@/ui/panel'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'PANEL',
  description: 'Composes PanelHeader, PanelContent, and PanelFooter sub-components for consistent internal layout.',
  alternates: { canonical: '/components/panel' },
}

const previewCode = `import { Panel, PanelHeader, PanelTitle, PanelContent } from '@/ui/panel'

<Panel>
  <PanelHeader>
    <PanelTitle>SECTOR STATUS</PanelTitle>
  </PanelHeader>
  <PanelContent>
    Panel content goes here.
  </PanelContent>
</Panel>`

const installCode = `npx shadcn@latest add @shenkong/panel`
const usageCode = `import { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter } from '@/ui/panel'

export function StatusPanel() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>NAVIGATION DATA</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <p>Current sector: ALPHA-7</p>
        <p>ETA: 04:32:11</p>
      </PanelContent>
      <PanelFooter>
        <span>LAST SYNC: 00:00:04</span>
      </PanelFooter>
    </Panel>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "PANEL",
        description: "Composes PanelHeader, PanelContent, and PanelFooter sub-components for consistent internal layout."              }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview:
            React.createElement(Panel, { style: { width: '100%', maxWidth: '340px' }}
              , React.createElement(PanelHeader, {}
                , React.createElement(PanelTitle, {}, "SECTOR STATUS" )
              )
              , React.createElement(PanelContent, {}
                , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' }}, "Panel content goes here."   )
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
            ['Panel',       'Root container. Applies border, surface background, overflow hidden.'],
            ['PanelHeader', 'Top section with bottom border. Surface-raised background.'],
            ['PanelTitle',  'h3 label inside header. Uppercase, small, muted.'],
            ['PanelContent','Main content area with 1rem padding.'],
            ['PanelFooter', 'Bottom section with top border. Surface-raised background.'],
          ].map(([comp, desc]) => (
            React.createElement('div', { key: comp, style: { display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}
              , React.createElement('code', { style: { color: 'var(--color-green)', fontSize: '0.7rem', minWidth: '130px', flexShrink: 0 }}, comp)
              , React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}, desc)
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'notch',     type: 'sm | md | lg | none', defaultValue: 'md',  description: 'Corner notch size. Uses clip-path polygon to cut the top-left and bottom-right corners.' },
            { prop: 'className', type: 'string',               defaultValue: '—',   description: 'Additional classes applied to the root element.' },
          ]}
        )
      )
    )
  )
}
