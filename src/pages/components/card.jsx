import React from 'react'


import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/ui/card'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'CARD',
  description: 'Surface container with header, content, and footer sections.',
  alternates: { canonical: '/components/card' },
}

const previewCode = `<Card className="w-72">
  <CardHeader>
    <CardTitle>REACTOR CORE</CardTitle>
    <CardDescription>Power generation subsystem alpha</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-[var(--text-secondary)]">
      Output: 1.21 GW · Temp: 847°C · Efficiency: 94%
    </p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="EXEC" size="SM">ENGAGE</Button>
    <Button variant="OUTLINE" size="SM">MONITOR</Button>
  </CardFooter>
</Card>`

const usageCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@shenkong/ui'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MODULE ALPHA</CardTitle>
        <CardDescription>System subsection</CardDescription>
      </CardHeader>
      <CardContent>Content goes here.</CardContent>
      <CardFooter>Footer actions</CardFooter>
    </Card>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "CARD",
        description: "Surface container with header, content, and footer sections."       }
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(Card, { className: "w-72"}
              , React.createElement(CardHeader, {}
                , React.createElement('div', { className: "flex items-center justify-between"  }
                  , React.createElement(CardTitle, {}, "REACTOR CORE" )
                  , React.createElement(Badge, { variant: "ACTIVE"}, "ONLINE")
                )
                , React.createElement(CardDescription, {}, "Power generation subsystem alpha"   )
              )
              , React.createElement(CardContent, {}
                , React.createElement('p', { className: "text-sm text-[var(--text-secondary)]" }, "Output: 1.21 GW · Temp: 847°C · Efficiency: 94%"

                )
              )
              , React.createElement(CardFooter, { className: "gap-2"}
                , React.createElement(Button, { variant: "EXEC", size: "SM"}, "ENGAGE")
                , React.createElement(Button, { variant: "OUTLINE", size: "SM"}, "MONITOR")
              )
            )
          }
        )
      )
      , React.createElement(Section, { title: "INSTALLATION"}
        , React.createElement(CodeBlock, { code: "npx shadcn@latest add @shenkong/card"   , language: "bash"} )
      )
      , React.createElement(Section, { title: "USAGE"}
        , React.createElement(CodeBlock, { code: usageCode} )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'Card', type: 'HTMLDivElement', defaultValue: '—', description: 'Root card container.' },
            { prop: 'CardHeader', type: 'HTMLDivElement', defaultValue: '—', description: 'Top section with title and description.' },
            { prop: 'CardTitle', type: 'HTMLHeadingElement', defaultValue: '—', description: 'Card heading text.' },
            { prop: 'CardDescription', type: 'HTMLParagraphElement', defaultValue: '—', description: 'Subtitle or descriptive text.' },
            { prop: 'CardContent', type: 'HTMLDivElement', defaultValue: '—', description: 'Main body content area.' },
            { prop: 'CardFooter', type: 'HTMLDivElement', defaultValue: '—', description: 'Bottom action area.' },
          ]}
        )
      )
    )
  )
}
