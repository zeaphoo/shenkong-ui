import React from 'react'

import { useState } from 'react'
import { PageHeader } from '@/components/docs/page-header'
import { CodeBlock } from '@/components/docs/code-block'
const addMultiple = `npx shadcn@latest add @shenkong/button @shenkong/badge @shenkong/panel
npx shadcn@latest add @shenkong/dialog @shenkong/toast @shenkong/tabs`
const initCode = `npx shadcn@latest init`
const registryCode = `{
  "registries": {
    "shenkong": "https://shenkong.dev/r"
  }
}`
const globalsCode = `/* src/index.css — or wherever your root CSS lives */
@import './styles/globals.css';`
const usageCode = `import { Button } from '@/ui/button'
import { Badge }  from '@/ui/badge'
export function MyPage() {
  return (
    <>
      <Button variant="EXEC">INITIATE</Button>
      <Badge variant="ACTIVE">ONLINE</Badge>
    </>
  )
}`
// ── Manual track ──────────────────────────────────────────────────────────
const manualDeps = `npm install tailwindcss @tailwindcss/vite \\
  @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-select \\
  @radix-ui/react-switch @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-toast @radix-ui/react-progress \\
  @radix-ui/react-separator class-variance-authority clsx tailwind-merge
npm install -D vite-tsconfig-paths`
const manualVite = `// vite.config.js
import { defineConfig } from 'vite'
import react          from '@vitejs/plugin-react'
import tailwindcss    from '@tailwindcss/vite'
import tsconfigPaths  from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
})`
const manualTsconfig = `// tsconfig.app.json — inside compilerOptions:
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }`
const manualUtils = `// src/lib/utils.js
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}`
const manualUsage = `// Copy src/ui/button.jsx into your project, then:
import { Button } from '@/ui/button'
export function MyPage() {
  return <Button variant="EXEC">INITIATE</Button>
}`
// ── Step indicator ────────────────────────────────────────────────────────
function Step({ n, title, children }) {
  return (
    React.createElement('div', {
      style: {
        display:      'grid',
        gridTemplateColumns: '2rem 1fr',
        gap:          '1rem',
        marginBottom: '2rem',
      }}
      /* Number */
      , React.createElement('div', { style: { paddingTop: '0.1rem' }}
        , React.createElement('div', {
          style: {
            width:          '2rem',
            height:         '2rem',
            border:         '1px solid var(--color-green)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '0.7rem',
            fontWeight:     700,
            color:          'var(--color-green)',
            textShadow:     'var(--text-glow-green)',
            fontFamily:     'var(--font-mono)',
            flexShrink:     0,
          }}
          , n
        )
        /* Connector line */
        , React.createElement('div', {
          style: {
            width:      '1px',
            flex:       1,
            minHeight:  '1.5rem',
            margin:     '0.25rem auto 0',
            background: 'var(--border)',
          }}
        )
      )
      /* Content */
      , React.createElement('div', {}
        , React.createElement('div', {
          style: {
            fontSize:      '0.7rem',
            fontWeight:    600,
            color:         'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom:  '0.75rem',
            paddingTop:    '0.45rem',
          }}
          , title
        )
        , children
      )
    )
  )
}
// ── Manual toggle ─────────────────────────────────────────────────────────
function ManualSection() {
  const [open, setOpen] = useState(false)
  return (
    React.createElement('div', { style: { marginTop: '3rem' }}
      , React.createElement('button', {
        onClick: () => setOpen(o => !o),
        style: {
          background:    'transparent',
          border:        '1px solid var(--border)',
          color:         'var(--text-muted)',
          fontSize:      '0.7rem',
          letterSpacing: '0.12em',
          padding:       '0.5rem 1rem',
          cursor:        'pointer',
          fontFamily:    'var(--font-mono)',
          textTransform: 'uppercase',
          display:       'flex',
          alignItems:    'center',
          gap:           '0.5rem',
          width:         '100%',
          justifyContent:'space-between',
          transition:    'border-color 0.15s, color 0.15s',
        },
        onMouseEnter: e => {
          e.currentTarget.style.borderColor = 'var(--text-muted)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        },
        onMouseLeave: e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
        , React.createElement('span', {}, "Manual installation — without shadcn CLI"     )
        , React.createElement('span', {}, open ? '▲' : '▼')
      )
      , open && (
        React.createElement('div', {
          style: {
            borderLeft:  '1px solid var(--border)',
            marginTop:   '1.5rem',
            paddingLeft: '1.5rem',
            display:     'flex',
            flexDirection: 'column',
            gap:         '1.5rem',
          }}
          , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}, "For projects not using the shadcn CLI. You handle dependencies, path aliases, and file copying yourself."
          )
          , React.createElement('div', {}
            , React.createElement('p', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}, "1 — INSTALL DEPENDENCIES"
            )
            , React.createElement(CodeBlock, { code: manualDeps, language: "bash"} )
          )
          , React.createElement('div', {}
            , React.createElement('p', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}, "2 — CONFIGURE VITE"
            )
            , React.createElement(CodeBlock, { code: manualVite, language: "ts"} )
          )
          , React.createElement('div', {}
            , React.createElement('p', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}, "3 — ADD PATH ALIAS"
            )
            , React.createElement(CodeBlock, { code: manualTsconfig, language: "json"} )
          )
          , React.createElement('div', {}
            , React.createElement('p', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}, "4 — CREATE CN() UTILITY"
            )
            , React.createElement(CodeBlock, { code: manualUtils, language: "ts"} )
          )
          , React.createElement('div', {}
            , React.createElement('p', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}, "5 — IMPORT GLOBALS.CSS (same as CLI track)"
            )
            , React.createElement(CodeBlock, { code: globalsCode, language: "css"} )
          )
          , React.createElement('div', {}
            , React.createElement('p', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.6rem' }}, "6 — COPY A COMPONENT + USE"
            )
            , React.createElement(CodeBlock, { code: manualUsage, language: "tsx"} )
            , React.createElement('p', { style: { marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}, "Each component lives at"
                 , ' '
              , React.createElement('span', { style: { color: 'var(--color-green)' }}, "src/ui/", '{', "name", '}', ".jsx"), ". Copy it into your project's component directory and import as shown."
            )
          )
        )
      )
    )
  )
}
// ── Page ─────────────────────────────────────────────────────────────────
export default function InstallationContent() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "INSTALLATION",
        description: "Add any component with a single command. The shadcn CLI downloads the source into your project and installs dependencies automatically."                   }
      )
      /* Step flow */
      , React.createElement(Step, { n: 1, title: "First time only — init shadcn + add registry"        }
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}, "If you don't have shadcn set up yet, initialise it first:"
        )
        , React.createElement(CodeBlock, { code: initCode, language: "bash"} )
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: '1rem 0 0.75rem' }}, "Then add the shenkong registry to"
               , ' '
          , React.createElement('span', { style: { color: 'var(--color-green)' }}, "components.json"), ":"
        )
        , React.createElement(CodeBlock, { code: registryCode, language: "json"} )
      )
      , React.createElement(Step, { n: 2, title: "Add globals.css — required once"    }
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}, "Copy"
          , ' '
          , React.createElement('span', { style: { color: 'var(--color-green)' }}, "src/styles/globals.css"), ' ', "from the"
           , ' '
          , React.createElement('a', {
            href: "https://github.com/shenkong/shenkong-ui",
            target: "_blank",
            rel: "noopener noreferrer" ,
            style: { color: 'var(--color-green)', textDecoration: 'none' }}
, "shenkong-ui repo"
          ), ' ', "into your project, then import it at your root:"
        )
        , React.createElement(CodeBlock, { code: globalsCode, language: "css"} )
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '0.75rem' }}, "This file defines every design token — CSS variables, Tailwind"
                   , ' '
          , React.createElement('span', { style: { color: 'var(--color-green)' }}, "@theme"), " blocks, glow animations, and the three theme overrides. Components won't render correctly without it."
        )
      )
      , React.createElement(Step, { n: 3, title: "Add components" }
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}, "Install one or several at a time. The CLI copies the source into your project and runs "
            , React.createElement('span', { style: { color: 'var(--color-green)' }}, "npm install" ), " for any peer dependencies:"
        )
        , React.createElement(CodeBlock, { code: addMultiple, language: "bash"} )
      )
      , React.createElement(Step, { n: 4, title: "Use it" }
        , React.createElement(CodeBlock, { code: usageCode, language: "tsx"} )
      )
      , React.createElement(ManualSection, {} )
    )
  )
}
