import React from 'react'

import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { useNarrow } from '@/lib/use-narrow'
export default function IntroductionContent() {
  const narrow = useNarrow()
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "INTRODUCTION",
        description: "What shenkong/ui is, why it exists, and how it works."         }
      )
      , React.createElement(Section, { title: "WHAT IS SHENKONG/UI"  }
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}
          , React.createElement('p', {}
            , React.createElement('span', { style: { color: 'var(--color-green)', textShadow: 'var(--text-glow-green)' }}, "SHENKONG/UI"), " is a modern sci-fi React component library built on"         , ' '
            , React.createElement('span', { style: { color: 'var(--text-secondary)' }}, "Radix UI" ), " and" , ' '
            , React.createElement('span', { style: { color: 'var(--text-secondary)' }}, "Tailwind CSS v4"  ), ". "
          )
          , React.createElement('p', {}, "Unlike traditional component libraries, shenkong/ui is "
                  , React.createElement('span', { style: { color: 'var(--text-secondary)' }}, "not installed as an npm package"     ), ". Instead, you copy the component source files directly into your project. You own the code. Modify it freely. No version lock-in."
          )
        )
      )
      , React.createElement(Section, { title: "DESIGN LANGUAGE" }
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          , [
            ['ZERO ROUNDED CORNERS',   'Hard edges everywhere. border-radius: 0px enforced globally.'],
            ['MONOSPACE ONLY',         'IBM Plex Mono as the exclusive typeface. Every character on the grid.'],
            ['PHOSPHOR GLOW',          'box-shadow and text-shadow glow effects instead of drop shadows.'],
            ['DELIBERATE PALETTE',     'Green (alive), Amber (warning), Red (danger/stop), Blue (info/system).'],
            ['ALL CAPS LABELS',        'Variant names, labels, and UI text follow terminal conventions.'],
            ['CRT EFFECTS',            'Scanlines, flicker, and blink animations for tactile presence.'],
          ].map(([title, desc]) => (
            React.createElement('div', {
              key: title,
              style: {
                display:      'flex',
                flexDirection: narrow ? 'column' : 'row',
                gap:          '0.5rem',
                padding:      '0.6rem 0',
                borderBottom: '1px solid var(--border)',
              }}
              , React.createElement('span', {
                style: {
                  fontSize:      '0.65rem',
                  color:         'var(--color-green)',
                  letterSpacing: '0.08em',
                  whiteSpace:    'nowrap',
                  ...(narrow ? {} : { minWidth: '180px', flexShrink: 0 }),
                  paddingTop:    '2px',
                }}
                , title
              )
              , React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}
                , desc
              )
            )
          ))
        )
      )
      , React.createElement(Section, { title: "ACCESSIBILITY"}
        , React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}, "All interactive components are built on"
               , ' '
          , React.createElement('span', { style: { color: 'var(--text-secondary)' }}, "Radix UI primitives"  ), ", which provide WAI-ARIA compliance, keyboard navigation, focus management, and screen reader support. The modern aesthetic does not compromise on accessibility."
        )
      )
      , React.createElement(Section, { title: "BUILT WITH" }
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
          , [
            ['React 19',                   'Component framework'],
            ['TypeScript',                 'Type safety across all components'],
            ['Tailwind CSS v4',            'Utility-first styling with CSS-first config'],
            ['Radix UI',                   'Headless accessible primitives'],
            ['class-variance-authority',   'Type-safe variant system (CVA)'],
            ['clsx + tailwind-merge',      'Class merging utilities (cn())'],
          ].map(([pkg, desc]) => (
            React.createElement('div', { key: pkg, style: { display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: narrow ? '0.25rem' : '1rem', alignItems: 'baseline' }}
              , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--color-green)', ...(narrow ? {} : { minWidth: '220px', flexShrink: 0 }) }}
                , pkg
              )
              , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' }}, desc)
            )
          ))
        )
      )
    )
  )
}
