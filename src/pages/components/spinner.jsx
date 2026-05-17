import { Spinner } from '@/ui/spinner'
import { PageHeader } from '@/components/docs/page-header'
import { Section } from '@/components/docs/section'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const metadata = {
  title: 'SPINNER',
  description: 'Animated ASCII loader cycling through | / - \\ frames at 120ms. Optional text label with blink animation. Three sizes available.',
  alternates: { canonical: '/components/spinner' },
}

const previewCode = `import { Spinner } from '@/ui/spinner'

<Spinner />
<Spinner label="LOADING..." />
<Spinner size="LG" label="PROCESSING DATA..." />`

const installCode = `npx shadcn@latest add @shenkong/spinner`
const usageCode = `import { Spinner } from '@/ui/spinner'

export function LoadingState() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Spinner size="SM" />
      <span>SCANNING SECTOR...</span>
    </div>
  )
}`

export default function Page() {
  return (
    <div>
      <PageHeader
        title="SPINNER"
        description={"Animated ASCII loader cycling through | / - \\\\ frames at 120ms. Optional text label with blink animation. Three sizes available."} />
      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Spinner />
              <Spinner label="LOADING..." />
              <Spinner size="LG" label="PROCESSING DATA..." />
            </div>
          } />
      </Section>
      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
      </Section>
      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>
      <Section title="SIZES">
        <div
          style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {(['SM', 'MD', 'LG'] ).map((s) => (
                  <div
                    key={s}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <Spinner size={s} label={s} />
                    <span
                      style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                      size="
                      {s}
                      "
                    </span>
                  </div>
                ))}
        </div>
      </Section>
      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'size',  type: 'SM | MD | LG', defaultValue: 'MD',       description: 'Font size of the spinner frame: SM=0.75rem, MD=0.875rem, LG=1rem.' },
            { prop: 'label', type: 'string',        defaultValue: '—',        description: 'Optional text shown after the spinner frame. Has blink-cursor animation.' },
          ]} />
      </Section>
    </div>
  );
}
