import React from 'react'

import { useState} from 'react'
import { CodeBlock } from './code-block'






export function ComponentPreview({ preview, code }) {
  const [activeTab, setActiveTab] = useState('PREVIEW')

  const tabStyle = (tab) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: activeTab === tab
      ? '2px solid var(--color-green)'
      : '2px solid transparent',
    color: activeTab === tab ? 'var(--color-green)' : 'var(--text-muted)',
    fontSize: '0.7rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    fontFamily: 'var(--font-mono)',
    textShadow: activeTab === tab ? 'var(--text-glow-green)' : 'none',
    transition: 'all 0.15s',
  })

  return (
    React.createElement('div', { style: { border: '1px solid var(--border)' }}
      /* Tab bar */
      , React.createElement('div', {
        style: {
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '0 0.5rem',
        }}

        , React.createElement('button', { style: tabStyle('PREVIEW'), onClick: () => setActiveTab('PREVIEW')}, "PREVIEW"

        )
        , React.createElement('button', { style: tabStyle('CODE'), onClick: () => setActiveTab('CODE')}, "CODE"

        )
      )

      /* Content */
      , activeTab === 'PREVIEW' ? (
        React.createElement('div', {
          style: {
            padding: 'clamp(1rem, 5vw, 2.5rem)',
            background: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            minHeight: '120px',
          },
          className: "scanlines"}

          , preview
        )
      ) : (
        React.createElement(CodeBlock, { code: code} )
      )
    )
  )
}
