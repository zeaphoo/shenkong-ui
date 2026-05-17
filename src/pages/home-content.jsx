import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { Panel, PanelHeader, PanelTitle, PanelContent } from '@/ui/panel'
import { Spinner } from '@/ui/spinner'
import { Progress } from '@/ui/progress'
const features = [
  {
    title: "ZERO ROUNDED CORNERS",
    desc: "Hard edges. Sharp geometry. No compromise.",
    icon: "□",
  },
  {
    title: "PHOSPHOR GLOW FX",
    desc: "Green, amber, and red glow effects on active states.",
    icon: "◈",
  },
  {
    title: "RADIX A11Y",
    desc: "Every component is accessible — keyboard, screen reader, ARIA.",
    icon: "◎",
  },
  {
    title: "COPY-PASTE",
    desc: "Own the code. No version lock-in. Modify everything.",
    icon: "▶",
  },
];
const componentList = [
  "ALERT",
  "BADGE",
  "BUTTON",
  "CHECKBOX",
  "DIALOG",
  "INPUT",
  "PANEL",
  "PROGRESS",
  "SELECT",
  "SEPARATOR",
  "SPINNER",
  "SWITCH",
  "TABS",
  "TEXTAREA",
  "TOAST",
  "TOOLTIP",
];
export default function HomeContent() {
  return (
    React.createElement('div', { style: { display: "flex", flexDirection: "column", gap: "4rem" }}
      /* Hero */
      , React.createElement('section', { style: { paddingTop: "1rem" }}
        , React.createElement('div', {
          style: {
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.2em",
            marginBottom: "1rem",
          }}
, "▶ SYSTEM INITIALIZED — COMPONENT LIBRARY ONLINE"
        )
        , React.createElement('pre', {
          style: {
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(1rem, 3vw, 1.75rem)",
            fontWeight: 700,
            color: "var(--color-green)",
            textShadow: "var(--text-glow-green)",
            letterSpacing: "0.12em",
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}
          , `╔═════════════════════════╗\n║  S H E N K O N G / U I  ║\n╚═════════════════════════╝`
        )
        , React.createElement('p', {
          style: {
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            maxWidth: "560px",
            marginBottom: "1.5rem",
          }}
, "A modern sci-fi React component library. Built on Radix UI and Tailwind CSS. Copy-paste components into your project and own the code."
        )
        , React.createElement('div', { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          , React.createElement(Button, { variant: "EXEC", size: "LG", asChild: true}
            , React.createElement(Link, { to: "/docs/introduction"}, "EXPLORE DOCS" )
          )
          , React.createElement(Button, { variant: "OUTLINE", size: "LG", asChild: true}
            , React.createElement(Link, { to: "/components/button"}, "VIEW COMPONENTS" )
          )
        )
      )
      /* Component preview strip */
      , React.createElement('section', {}
        , React.createElement('div', {
          style: {
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
, "— LIVE PREVIEW ——————————————————————"
        )
        , React.createElement(Panel, {
          notch: "md",
          style: {
            padding: "1.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          },
          className: "scanlines"}
          , React.createElement(Badge, { variant: "ACTIVE"}, "ONLINE")
          , React.createElement(Badge, { variant: "SCANNING"}, "SCANNING")
          , React.createElement(Badge, { variant: "WARNING"}, "WARNING")
          , React.createElement(Badge, { variant: "CRITICAL"}, "CRITICAL")
          , React.createElement(Badge, { variant: "OFFLINE"}, "OFFLINE")
          , React.createElement('div', {
            style: {
              width: "1px",
              height: "24px",
              background: "var(--border)",
            }}
          )
          , React.createElement(Button, { variant: "EXEC", size: "SM"}, "EXECUTE"
          )
          , React.createElement(Button, { variant: "OUTLINE", size: "SM"}, "STANDBY"
          )
          , React.createElement(Button, { variant: "ABORT", size: "SM"}, "ABORT"
          )
          , React.createElement('div', {
            style: {
              width: "1px",
              height: "24px",
              background: "var(--border)",
            }}
          )
          , React.createElement(Spinner, { label: "SCANNING..."} )
          , React.createElement('div', { style: { width: "160px" }}
            , React.createElement(Progress, { value: 67, label: "POWER CORE" } )
          )
        )
      )
      /* Features grid */
      , React.createElement('section', {}
        , React.createElement('div', {
          style: {
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
, "— SYSTEM FEATURES —————————————————————"
        )
        , React.createElement('div', {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
          , features.map((f) => (
            React.createElement('div', {
              key: f.title,
              style: {
                background: "var(--surface)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
              , React.createElement('span', {
                style: {
                  color: "var(--color-green)",
                  fontSize: "1.25rem",
                  textShadow: "var(--text-glow-green)",
                }}
                , f.icon
              )
              , React.createElement('div', {
                style: {
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.1em",
                }}
                , f.title
              )
              , React.createElement('div', {
                style: {
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
                , f.desc
              )
            )
          ))
        )
      )
      /* Quick start */
      , React.createElement('section', {}
        , React.createElement('div', {
          style: {
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
, "— QUICK START ————————————————————————"
        )
        , React.createElement(Panel, { notch: "sm"}
          , React.createElement(PanelHeader, {}
            , React.createElement(PanelTitle, {}, "INSTALLATION")
          )
          , React.createElement(PanelContent, {}
            , React.createElement('pre', {
              style: {
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                margin: 0,
                fontFamily: "var(--font-mono)",
              }}
              , `# 1. Install dependencies\nnpm install tailwindcss @tailwindcss/vite \\\n  @radix-ui/react-slot class-variance-authority \\\n  clsx tailwind-merge\n\n# 2. Copy globals.css into your project\n# 3. Copy any component from src/ui/\n\n# Example: using Button\nimport { Button } from '@/ui/button'\n\n<Button variant="EXEC">INITIATE</Button>`
            )
          )
        )
      )
      /* Component list */
      , React.createElement('section', {}
        , React.createElement('div', {
          style: {
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
, "— AVAILABLE COMPONENTS ——————————————"
        )
        , React.createElement('div', { style: { display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
          , componentList.map((name) => (
            React.createElement(Link, {
              key: name,
              to: `/components/${name.toLowerCase()}`,
              style: {
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                padding: "3px 8px",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "all 0.15s",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = "var(--color-green)";
                e.currentTarget.style.borderColor = "var(--color-green)";
                e.currentTarget.style.textShadow = "var(--text-glow-green)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.textShadow = "none";
              }}
              , name
            )
          ))
        )
      )
    )
  )
}
