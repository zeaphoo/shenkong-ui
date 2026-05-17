import React from 'react'



import {
  ToastProvider, ToastViewport,
  Toast, ToastTitle, ToastDescription,
} from '@/ui/toast'
import { useToast, } from '@/ui/use-toast'
import { Button } from '@/ui/button'

export function ToastDemo() {
  const { toasts, toast } = useToast()

  const variants = [
    { v: 'STATUS',   label: 'STATUS',   title: 'SEQUENCE COMPLETE',   desc: 'All systems nominal.' },
    { v: 'WARNING',  label: 'WARNING',  title: 'SHIELD LOW',          desc: 'Power at 18%.' },
    { v: 'CRITICAL', label: 'CRITICAL', title: 'HULL BREACH DETECTED' },
    { v: 'INFO',     label: 'INFO',     title: 'MAINTENANCE IN 2H',   desc: 'Schedule a debrief.' },
  ]

  return (
    React.createElement(ToastProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
      , React.createElement('div', { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
        , variants.map(({ v, label, title, desc }) => (
          React.createElement(Button, {
            key: v,
            variant: "OUTLINE",
            size: "SM",
            onClick: () => toast({ title, description: desc, variant: v })}

            , label
          )
        ))
      )
      , toasts.map((t) => (
        React.createElement(Toast, { key: t.id, variant: t.variant}
          , React.createElement(ToastTitle, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, t.title)
          , t.description && React.createElement(ToastDescription, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}, t.description)
        )
      ))
      , React.createElement(ToastViewport, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 40}} )
    )
  )
}
