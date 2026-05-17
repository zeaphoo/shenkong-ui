import React from 'react'


import { ProgressRing } from '@/ui/progress-ring'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'PROGRESS RING',
  description: 'SVG circular gauge with a phosphor glow arc. Complements the linear Progress bar. Use for radar readouts, system health gauges, and capacity displays.',
  alternates: { canonical: '/components/progress-ring' },
}

const previewCode = `import { ProgressRing } from '@/ui/progress-ring'

<ProgressRing value={87} label="REACTOR" variant="ACTIVE" />
<ProgressRing value={61} label="SHIELDS" variant="WARNING" />
<ProgressRing value={23} label="HULL"    variant="CRITICAL" />
<ProgressRing value={50} label="FUEL"    variant="DEFAULT" />`

const installCode = `npx shadcn@latest add @shenkong/progress-ring`
const usageCode = `import { ProgressRing } from '@/ui/progress-ring'

export function SystemGauges() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <ProgressRing value={87} label="REACTOR" variant="ACTIVE"   size={120} />
      <ProgressRing value={61} label="SHIELDS" variant="WARNING"  size={120} />
      <ProgressRing value={23} label="HULL"    variant="CRITICAL" size={120} />
    </div>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "PROGRESS RING" ,
        description: "SVG circular gauge with a phosphor glow arc. Complements the linear Progress bar. Use for radar readouts, system health gauges, and capacity displays."                      }
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}
              , React.createElement(ProgressRing, { value: 87, label: "REACTOR", variant: "ACTIVE"}   )
              , React.createElement(ProgressRing, { value: 61, label: "SHIELDS", variant: "WARNING"}  )
              , React.createElement(ProgressRing, { value: 23, label: "HULL",    variant: "CRITICAL"} )
              , React.createElement(ProgressRing, { value: 50, label: "FUEL",    variant: "DEFAULT"}  )
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
        , React.createElement('div', { style: { display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}
          , (['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] ).map((v) => (
            React.createElement('div', { key: v, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              , React.createElement(ProgressRing, { value: 75, variant: v} )
              , React.createElement('span', { style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "variant=\""
                , v, "\""
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "SIZES"}
        , React.createElement('div', { style: { display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}
          , ([64, 90, 120, 160] ).map((s) => (
            React.createElement('div', { key: s, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              , React.createElement(ProgressRing, { value: 72, variant: "ACTIVE", size: s} )
              , React.createElement('span', { style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "size="
                , s
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'value',       type: 'number',                               defaultValue: '0',       description: 'Progress value 0–100. Clamped to range.' },
            { prop: 'variant',     type: 'DEFAULT | ACTIVE | WARNING | CRITICAL', defaultValue: 'DEFAULT', description: 'Controls the arc color and center value glow.' },
            { prop: 'size',        type: 'number',                               defaultValue: '120',     description: 'Diameter of the ring in pixels.' },
            { prop: 'strokeWidth', type: 'number',                               defaultValue: '6',       description: 'Width of the SVG stroke in pixels.' },
            { prop: 'label',       type: 'string',                               defaultValue: 'undefined', description: 'Small uppercase label shown below the value in the center.' },
            { prop: 'showValue',   type: 'boolean',                              defaultValue: 'true',    description: 'Show the numeric percentage in the center.' },
            { prop: 'className',   type: 'string',                               defaultValue: '—',       description: 'Additional classes merged via cn().' },
          ]}
        )
      )
    )
  )
}
