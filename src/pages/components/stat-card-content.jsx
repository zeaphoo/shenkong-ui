import React from 'react'

import { StatCard } from '@/ui/stat-card'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { useNarrow } from '@/lib/use-narrow'
const previewCode = `import { StatCard } from '@/ui/stat-card'
<StatCard label="REACTOR OUTPUT" value="94.7%" delta="+2.3%" deltaPositive sublabel="NOMINAL" variant="ACTIVE" />
<StatCard label="HULL INTEGRITY" value="61%" delta="-8.1%" deltaPositive={false} sublabel="DEGRADED" variant="WARNING" />
<StatCard label="CREW MANIFEST" value="312" sublabel="ALL ABOARD" />
<StatCard label="CORE TEMP" value="4820°K" delta="+320°K" deltaPositive={false} sublabel="CRITICAL" variant="CRITICAL" />`
const installCode = `npx shadcn@latest add @shenkong/stat-card`
const usageCode = `import { StatCard } from '@/ui/stat-card'
export function DashboardMetrics() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
      <StatCard
        label="REACTOR OUTPUT"
        value="94.7%"
        delta="+2.3%"
        deltaPositive
        sublabel="NOMINAL"
        variant="ACTIVE"
      />
      <StatCard
        label="HULL INTEGRITY"
        value="61%"
        delta="-8.1%"
        deltaPositive={false}
        sublabel="DEGRADED"
        variant="WARNING"
      />
    </div>
  )
}`
export function StatCardContent() {
  const narrow = useNarrow()
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "STAT CARD" ,
        description: "Metric tile for dashboards. Displays a primary value, contextual label, optional delta trend indicator, and a sublabel status line."                  }
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(2, 1fr)', gap: '1rem', width: '100%' }}
              , React.createElement(StatCard, { label: "REACTOR OUTPUT" , value: "94.7%",  delta: "+2.3%",  deltaPositive: true,        sublabel: "NOMINAL",   variant: "ACTIVE"}   )
              , React.createElement(StatCard, { label: "HULL INTEGRITY" , value: "61%",    delta: "-8.1%",  deltaPositive: false, sublabel: "DEGRADED",  variant: "WARNING"}  )
              , React.createElement(StatCard, { label: "CREW MANIFEST" ,  value: "312",                                         sublabel: "ALL ABOARD" }                   )
              , React.createElement(StatCard, { label: "CORE TEMP" ,      value: "4820°K", delta: "+320°K", deltaPositive: false, sublabel: "CRITICAL",  variant: "CRITICAL"} )
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
        , React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
          , (['DEFAULT', 'ACTIVE', 'WARNING', 'CRITICAL'] ).map((v) => (
            React.createElement('div', { key: v}
              , React.createElement(StatCard, {
                label: "POWER LEVEL" ,
                value: "88%",
                delta: "+4%",
                deltaPositive: true,
                sublabel: v,
                variant: v}
              )
              , React.createElement('span', {
                style: {
                  display:       'block',
                  marginTop:     '0.5rem',
                  fontSize:      '0.65rem',
                  color:         'var(--text-muted)',
                  letterSpacing: '0.08em',
                }}
, "variant=\""
                , v, "\""
              )
            )
          ))
        )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'label',         type: 'string',                               defaultValue: '—',         description: 'Small uppercase label above the value.' },
            { prop: 'value',         type: 'string | number',                      defaultValue: '—',         description: 'Primary metric displayed large.' },
            { prop: 'delta',         type: 'string',                               defaultValue: 'undefined', description: 'Change indicator text, e.g. "+2.3%".' },
            { prop: 'deltaPositive', type: 'boolean',                              defaultValue: 'undefined', description: 'true = green ▲, false = red ▼, undefined = neutral —.' },
            { prop: 'sublabel',      type: 'string',                               defaultValue: 'undefined', description: 'Footer status line at the bottom of the card.' },
            { prop: 'variant',       type: 'DEFAULT | ACTIVE | WARNING | CRITICAL', defaultValue: 'DEFAULT',   description: 'Controls the border and value accent color.' },
            { prop: 'className',     type: 'string',                               defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        )
      )
    )
  )
}
