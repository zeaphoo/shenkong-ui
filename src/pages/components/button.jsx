import React from 'react'


import { Button } from '@/ui/button'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'BUTTON',
  description: 'Interactive trigger element with four semantic variants. Supports asChild for polymorphic rendering via Radix Slot.',
  alternates: { canonical: '/components/button' },
}

const previewCode = `import { Button } from '@/ui/button'

<Button variant="EXEC">EXECUTE</Button>
<Button variant="OUTLINE">STANDBY</Button>
<Button variant="GHOST">CANCEL</Button>
<Button variant="ABORT">ABORT</Button>`

const installCode = `npx shadcn@latest add @shenkong/button`
const usageCode = `import { Button } from '@/ui/button'

export function Example() {
  return (
    <Button variant="EXEC" size="MD">
      INITIATE SEQUENCE
    </Button>
  )
}`

const sizesCode = `<Button size="SM">SMALL</Button>
<Button size="MD">MEDIUM</Button>
<Button size="LG">LARGE</Button>`

const asChildCode = `import { Button } from '@/ui/button'
import { Link } from 'react-router-dom'

// Renders as <a> with Button styles
<Button asChild variant="EXEC">
  <Link to="/docs/introduction">READ DOCS</Link>
</Button>`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "BUTTON",
        description: "Interactive trigger element with four semantic variants. Supports asChild for polymorphic rendering via Radix Slot."              ,
        dependencies: ['@radix-ui/react-slot', 'class-variance-authority']}
      )

      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(React.Fragment, null
              , React.createElement(Button, { variant: "EXEC"}, "EXECUTE")
              , React.createElement(Button, { variant: "OUTLINE"}, "STANDBY")
              , React.createElement(Button, { variant: "GHOST"}, "CANCEL")
              , React.createElement(Button, { variant: "ABORT"}, "ABORT")
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}

          , (['EXEC', 'OUTLINE', 'GHOST', 'ABORT'] ).map((v) => (
            React.createElement('div', {
              key: v,
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}

              , React.createElement(Button, { variant: v}, v)
              , React.createElement('span', { style: { fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}, "variant=\""
                , v, "\""
              )
            )
          ))
        )
      )

      , React.createElement(Section, { title: "SIZES"}
        , React.createElement(ComponentPreview, {
          code: sizesCode,
          preview: 
            React.createElement(React.Fragment, null
              , React.createElement(Button, { size: "SM"}, "SMALL")
              , React.createElement(Button, { size: "MD"}, "MEDIUM")
              , React.createElement(Button, { size: "LG"}, "LARGE")
            )
          }
        )
      )

      , React.createElement(Section, { title: "AS CHILD" }
        , React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7 }}, "Use "
           , React.createElement('span', { style: { color: 'var(--color-green)' }}, "asChild"), " to render button styles on any element (e.g. a link)."
        )
        , React.createElement(CodeBlock, { code: asChildCode} )
      )

      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'variant', type: 'EXEC | OUTLINE | GHOST | ABORT', defaultValue: 'OUTLINE', description: 'Visual style and semantic meaning of the button.' },
            { prop: 'size', type: 'SM | MD | LG', defaultValue: 'MD', description: 'Controls height and horizontal padding.' },
            { prop: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Merge button props onto the child element instead of rendering a <button>.' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the button and reduces opacity.' },
            { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional Tailwind classes merged via cn().' },
          ]}
        )
      )
    )
  )
}
