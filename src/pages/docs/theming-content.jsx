import React from 'react'

import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { CodeBlock } from '@/components/docs/code-block'
import { useNarrow } from '@/lib/use-narrow'
const overrideExample = `/* In your own CSS, after importing globals.css */
:root {
  /* Change the primary brand color */
  --color-green: #00ed3f;
  /* Adjust the background darkness */
  --background: #000000;
  /* Change the active border glow color */
  --border-active: #00ed3f;
}`
const glowExample = `/* Apply glow to any element */
.my-element {
  box-shadow: var(--glow-green);
  text-shadow: var(--text-glow-green);
}
/* Available glow values */
--glow-green   /* #64f0c8 */
--glow-amber   /* #ffb84c */
--glow-red     /* #ff5f63 */
--glow-blue    /* #44ccff */`
const clipExample = `/* Corner notch clip-path sizes */
--clip-corner-sm  /* 6px cut */
--clip-corner-md  /* 10px cut */
--clip-corner-lg  /* 16px cut */
/* Usage */
.my-panel {
  clip-path: var(--clip-corner-md);
}`
const palette = [
  { name: '--color-green',          value: '#64f0c8', role: 'Primary accent — alive / active / online' },
  { name: '--color-amber',          value: '#ffb84c', role: 'Warning / attention' },
  { name: '--color-amber-light',    value: '#ffa238', role: 'Soft amber highlight' },
  { name: '--color-red',            value: '#ff5f63', role: 'Danger / critical / stop' },
  { name: '--color-blue',           value: '#44ccff', role: 'Info / navigation / system' },
  { name: '--color-bone',           value: '#E0D5BE', role: 'Primary text — warm off-white' },
  { name: '--background',           value: '#020408', role: 'Main background' },
  { name: '--surface',              value: '#060e16', role: 'Panel / card background' },
  { name: '--surface-raised',       value: '#0c1824', role: 'Elevated elements, headers' },
  { name: '--border',               value: 'rgba(100,240,200,0.12)', role: 'Subtle border — dividers' },
  { name: '--border-active',        value: '#64f0c8', role: 'Active/focus border glow' },
  { name: '--text-primary',         value: '#64f0c8', role: 'Primary text color' },
  { name: '--text-secondary',       value: '#e8f4f0', role: 'Secondary text' },
  { name: '--text-muted',           value: '#6a8a82', role: 'Muted / label text' },
  { name: '--text-warning',         value: '#ffb84c', role: 'Warning text' },
  { name: '--text-danger',          value: '#ff5f63', role: 'Danger / error text' },
  { name: '--color-teal',           value: '#6DC3BB', role: 'Retained legacy color' },
  { name: '--color-pink',           value: '#B53082', role: 'Retained legacy color' },
  { name: '--color-orange',         value: '#F2963A', role: 'Retained legacy color' },
  { name: '--color-purple',         value: '#381B57', role: 'Retained legacy color' },
]
export default function ThemingContent() {
  const narrow = useNarrow()
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "THEMING",
        description: "The CSS variable token system — how it works and how to customize it."             }
      )
      , React.createElement(Section, { title: "HOW IT WORKS"  }
        , React.createElement('p', { style: { fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}, "All design decisions are expressed as CSS custom properties in"
                   , ' '
          , React.createElement('span', { style: { color: 'var(--color-green)' }}, "src/styles/globals.css"), ". There are two layers:"
        )
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          , [
            ['@theme {}',  'Tailwind v4 block — tokens that generate utility classes like text-teal, bg-void.'],
            [':root {}',   'Semantic tokens — contextual roles like --background, --text-primary, --glow-teal.'],
          ].map(([token, desc]) => (
            React.createElement('div', { key: token, style: { display: 'flex', gap: '1rem', padding: '0.6rem', border: '1px solid var(--border)', background: 'var(--surface)' }}
              , React.createElement('code', { style: { color: 'var(--color-green)', fontSize: '0.75rem', minWidth: '90px', flexShrink: 0 }}, token)
              , React.createElement('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}, desc)
            )
          ))
        )
      )
      , React.createElement(Section, { title: "COLOR PALETTE" }
        , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' }}
          , palette.map((c) => (
            React.createElement('div', {
              key: c.name,
              style: {
                display:       'flex',
                flexDirection: narrow ? 'column' : 'row',
                alignItems:    narrow ? 'flex-start' : 'center',
                gap:           '0.75rem',
                padding:       '0.4rem 0.6rem',
                background:    'var(--surface)',
                border:        '1px solid var(--border)',
              }}
              , React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                , React.createElement('div', {
                  style: {
                    width:      '28px',
                    height:     '28px',
                    background: c.value,
                    border:     '1px solid var(--border)',
                    flexShrink: 0,
                  }}
                )
                , React.createElement('code', { style: { fontSize: '0.7rem', color: 'var(--color-green)', ...(narrow ? {} : { minWidth: '200px', flexShrink: 0 }) }}
                  , c.name
                )
                , React.createElement('code', { style: { fontSize: '0.7rem', color: 'var(--color-amber)', ...(narrow ? {} : { minWidth: '80px', flexShrink: 0 }) }}
                  , c.value
                )
              )
              , React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' }}, c.role)
            )
          ))
        )
      )
      , React.createElement(Section, { title: "CUSTOMIZING"}
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}, "Override any CSS variable after importing globals.css. Components automatically pick up your changes."
        )
        , React.createElement(CodeBlock, { code: overrideExample, language: "css"} )
      )
      , React.createElement(Section, { title: "GLOW EFFECTS" }
        , React.createElement(CodeBlock, { code: glowExample, language: "css"} )
      )
      , React.createElement(Section, { title: "CORNER NOTCHES" }
        , React.createElement(CodeBlock, { code: clipExample, language: "css"} )
      )
    )
  )
}
