import React from 'react'

import { RadarChart } from '@/ui/radar-chart'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { useNarrow } from '@/lib/use-narrow'
const shipSystems = [
  { axis: 'SHIELDS',  value: 82 },
  { axis: 'WEAPONS',  value: 74 },
  { axis: 'ENGINES',  value: 91 },
  { axis: 'SENSORS',  value: 68 },
  { axis: 'COMMS',    value: 55 },
  { axis: 'LIFE SUP', value: 97 },
]
const crewData = [
  { axis: 'COMBAT',   value: 88 },
  { axis: 'PILOTING', value: 72 },
  { axis: 'SCIENCE',  value: 94 },
  { axis: 'MEDICAL',  value: 61 },
  { axis: 'COMMAND',  value: 79 },
]
const threatData = [
  { axis: 'SPEED',     value: 95 },
  { axis: 'FIREPOWER', value: 88 },
  { axis: 'DEFENSE',   value: 42 },
  { axis: 'STEALTH',   value: 71 },
  { axis: 'RANGE',     value: 63 },
  { axis: 'AGILITY',   value: 85 },
  { axis: 'SHIELDS',   value: 38 },
  { axis: 'CREW',      value: 55 },
]
const previewCode = `import { RadarChart } from '@/ui/radar-chart'
const systems = [
  { axis: 'SHIELDS', value: 82 },
  { axis: 'WEAPONS', value: 74 },
  { axis: 'ENGINES', value: 91 },
  { axis: 'SENSORS', value: 68 },
  { axis: 'COMMS',   value: 55 },
  { axis: 'LIFE SUP',value: 97 },
]
<RadarChart data={systems} title="SHIP SYSTEMS" variant="ACTIVE" />`
const installCode = `npx shadcn@latest add @shenkong/radar-chart`
const usageCode = `import { RadarChart, type RadarChartEntry } from '@/ui/radar-chart'
const data: RadarChartEntry[] = [
  { axis: 'SHIELDS', value: 82 },
  { axis: 'WEAPONS', value: 74 },
  { axis: 'ENGINES', value: 91 },
  { axis: 'SENSORS', value: 68 },
]
<RadarChart
  data={data}
  title="SHIP SYSTEMS"
  variant="ACTIVE"
  size={240}
  showGrid
  showLabels
  showValues
/>`
export function RadarChartContent() {
  const narrow = useNarrow()
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "RADAR CHART" ,
        description: "SVG radar (spider) chart with configurable axes, concentric grid polygons, fade-in animation, and four color variants. Values normalized to 0–100."                   }
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center' }}
              , React.createElement(RadarChart, {
                data: shipSystems,
                title: "SHIP SYSTEMS // STATUS"   ,
                variant: "ACTIVE",
                size: 260}
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
      , React.createElement(Section, { title: "AXIS COUNTS" }
        , React.createElement('div', { style: { display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem', justifyItems: 'center' }}
          , React.createElement('div', { style: { textAlign: 'center' }}
            , React.createElement('p', { style: { marginBottom: '0.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}, "5 AXES" )
            , React.createElement(RadarChart, { data: crewData, size: 200} )
          )
          , React.createElement('div', { style: { textAlign: 'center' }}
            , React.createElement('p', { style: { marginBottom: '0.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}, "6 AXES" )
            , React.createElement(RadarChart, { data: shipSystems, size: 200, variant: "WARNING"} )
          )
          , React.createElement('div', { style: { textAlign: 'center' }}
            , React.createElement('p', { style: { marginBottom: '0.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}, "8 AXES" )
            , React.createElement(RadarChart, { data: threatData, size: 200, variant: "CRITICAL"} )
          )
        )
      )
      , React.createElement(Section, { title: "VARIANTS"}
        , React.createElement('div', { style: { display: 'grid', gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1rem', justifyItems: 'center' }}
          , (['ACTIVE', 'WARNING', 'CRITICAL', 'DEFAULT'] ).map((v) => (
            React.createElement('div', { key: v, style: { textAlign: 'center' }}
              , React.createElement('p', { style: { marginBottom: '0.35rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}, v)
              , React.createElement(RadarChart, { data: crewData, variant: v, size: 180} )
            )
          ))
        )
      )
      , React.createElement(Section, { title: "WITH VALUES" }
        , React.createElement('div', { style: { display: 'flex', justifyContent: 'center' }}
          , React.createElement(RadarChart, {
            data: shipSystems,
            title: "SHIP SYSTEMS // SHOW VALUES"    ,
            variant: "ACTIVE",
            size: 260,
            showValues: true}
          )
        )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'data',        type: 'RadarChartEntry[]',                        defaultValue: '—',        description: 'Array of { axis, value } entries. value is 0–100.' },
            { prop: 'variant',     type: 'DEFAULT | ACTIVE | WARNING | CRITICAL',    defaultValue: 'ACTIVE',   description: 'Controls polygon color and glow.' },
            { prop: 'title',       type: 'string',                                   defaultValue: 'undefined', description: 'Optional header label.' },
            { prop: 'size',        type: 'number',                                   defaultValue: '240',       description: 'SVG width and height in px.' },
            { prop: 'showGrid',    type: 'boolean',                                  defaultValue: 'true',      description: 'Show concentric polygon grid rings.' },
            { prop: 'showLabels',  type: 'boolean',                                  defaultValue: 'true',      description: 'Show axis labels at vertices.' },
            { prop: 'showValues',  type: 'boolean',                                  defaultValue: 'false',     description: 'Show numeric value near each vertex dot.' },
            { prop: 'className',   type: 'string',                                   defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        )
      )
    )
  )
}
