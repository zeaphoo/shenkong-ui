import React from 'react'


import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/ui/tooltip'
import { Button } from '@/ui/button'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'TOOLTIP',
  description: 'Contextual label built on Radix UI. Appears on hover/focus with fade + zoom animation. Requires wrapping TooltipProvider.',
  alternates: { canonical: '/components/tooltip' },
}

const previewCode = `import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/ui/tooltip'
import { Button } from '@/ui/button'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="OUTLINE" size="SM">HOVER ME</Button>
    </TooltipTrigger>
    <TooltipContent>ENGAGE WARP DRIVE</TooltipContent>
  </Tooltip>
</TooltipProvider>`

const installCode = `npx shadcn@latest add @shenkong/tooltip`
const usageCode = `import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/ui/tooltip'

// Wrap your app (or a section) with TooltipProvider once
export function App() {
  return (
    <TooltipProvider>
      {/* ... app content ... */}
    </TooltipProvider>
  )
}

// Then use Tooltip anywhere inside:
export function IconButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button>◎</button>
      </TooltipTrigger>
      <TooltipContent side="bottom">TARGET LOCK</TooltipContent>
    </Tooltip>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "TOOLTIP",
        description: "Contextual label built on Radix UI. Appears on hover/focus with fade + zoom animation. Requires wrapping TooltipProvider."                ,
        dependencies: ['@radix-ui/react-tooltip']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(TooltipProvider, {}
              , React.createElement(Tooltip, {}
                , React.createElement(TooltipTrigger, { asChild: true}
                  , React.createElement(Button, { variant: "OUTLINE", size: "SM"}, "HOVER ME" )
                )
                , React.createElement(TooltipContent, {}, "ENGAGE WARP DRIVE"  )
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

      , React.createElement(Section, { title: "PLACEMENT"}
        , React.createElement(TooltipProvider, {}
          , React.createElement('div', { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
            , (['top', 'right', 'bottom', 'left'] ).map((side) => (
              React.createElement(Tooltip, { key: side}
                , React.createElement(TooltipTrigger, { asChild: true}
                  , React.createElement(Button, { variant: "GHOST", size: "SM"}, side.toUpperCase())
                )
                , React.createElement(TooltipContent, { side: side}, "TOOLTIP ON "  , side.toUpperCase())
              )
            ))
          )
        )
      )

      , React.createElement(Section, { title: "ANATOMY"}
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
          , [
            ['TooltipProvider', 'Context provider. Required once per subtree. Controls open delay.'],
            ['Tooltip',         'Root — manages hover state.'],
            ['TooltipTrigger',  'The element that shows the tooltip on hover/focus. Use asChild to style any element.'],
            ['TooltipContent',  'The tooltip panel. Portaled. Has fade + zoom entrance animation.'],
          ].map(([comp, desc]) => (
            React.createElement('div', { key: comp, style: { display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}
              , React.createElement('code', { style: { color: 'var(--color-green)', fontSize: '0.7rem', minWidth: '160px', flexShrink: 0 }}, comp)
              , React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}, desc)
            )
          ))
        )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'side',        type: '"top" | "right" | "bottom" | "left"', defaultValue: '"top"', description: 'Side of the trigger where the tooltip appears.' },
            { prop: 'sideOffset',  type: 'number',                              defaultValue: '6',     description: 'Pixel offset from the trigger element.' },
            { prop: 'delayDuration',type: 'number (on Provider)',               defaultValue: '400',   description: 'Milliseconds before the tooltip opens on hover.' },
          ]}
        )
      )
    )
  )
}
