import React from 'react'


import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'BREADCRUMB',
  description: 'Navigation breadcrumb trail showing current location hierarchy.',
  alternates: { canonical: '/components/breadcrumb' },
}

const previewCode = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">HOME</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">SYSTEMS</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>REACTOR</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

const usageCode = `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from '@shenkong/ui'

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">HOME</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>CURRENT</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

export default function Page() {
  return (
    React.createElement('div', {}
      , React.createElement(PageHeader, {
        title: "BREADCRUMB",
        description: "Navigation breadcrumb trail showing current location hierarchy."      }
      )
      , React.createElement(Section, { title: "PREVIEW"}
        , React.createElement(ComponentPreview, {
          code: previewCode,
          preview: 
            React.createElement(Breadcrumb, {}
              , React.createElement(BreadcrumbList, {}
                , React.createElement(BreadcrumbItem, {}
                  , React.createElement(BreadcrumbLink, { href: "#"}, "HOME")
                )
                , React.createElement(BreadcrumbSeparator, {} )
                , React.createElement(BreadcrumbItem, {}
                  , React.createElement(BreadcrumbLink, { href: "#"}, "SYSTEMS")
                )
                , React.createElement(BreadcrumbSeparator, {} )
                , React.createElement(BreadcrumbItem, {}
                  , React.createElement(BreadcrumbPage, {}, "REACTOR")
                )
              )
            )
          }
        )
      )
      , React.createElement(Section, { title: "INSTALLATION"}
        , React.createElement(CodeBlock, { code: "npx shadcn@latest add @shenkong/breadcrumb"   , language: "bash"} )
      )
      , React.createElement(Section, { title: "USAGE"}
        , React.createElement(CodeBlock, { code: usageCode} )
      )
      , React.createElement(Section, { title: "PROPS"}
        , React.createElement(PropsTable, {
          rows: [
            { prop: 'Breadcrumb', type: 'nav element', defaultValue: '—', description: 'Root nav wrapper with aria-label="breadcrumb".' },
            { prop: 'BreadcrumbList', type: 'ol element', defaultValue: '—', description: 'Ordered list of breadcrumb items.' },
            { prop: 'BreadcrumbItem', type: 'li element', defaultValue: '—', description: 'Individual breadcrumb entry.' },
            { prop: 'BreadcrumbLink', type: 'a element', defaultValue: '—', description: 'Clickable breadcrumb link.' },
            { prop: 'BreadcrumbPage', type: 'span element', defaultValue: '—', description: 'Current page indicator (non-clickable).' },
            { prop: 'BreadcrumbSeparator', type: 'li element', defaultValue: '">"', description: 'Separator between items. Children override the default ">" symbol.' },
          ]}
        )
      )
    )
  )
}
