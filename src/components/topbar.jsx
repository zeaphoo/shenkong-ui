import React from "react";

export function Topbar({ onMenuToggle, isNarrow }) {
  return (
    React.createElement('header', {
      style: {
        height: "44px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
        gap: "0.75rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
        flexShrink: 0,
      }}

      /* Hamburger (mobile only) */
      , isNarrow && (
        React.createElement('button', {
          onClick: onMenuToggle,
          style: {
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontFamily: "var(--font-mono)",
            padding: "0.25rem 0.5rem",
            lineHeight: 1,
            flexShrink: 0,
          },
          'aria-label': "Toggle menu" }
, "☰"

        )
      )

      /* Left status (desktop only) */
      , !isNarrow && (
        React.createElement(React.Fragment, null
          , React.createElement('span', {
            style: {
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              flexShrink: 0,
            }}
, "SYS:ONLINE"

          )
          , React.createElement('span', {
            style: {
              color: "var(--color-green)",
              fontSize: "0.8rem",
              textShadow: "var(--text-glow-green)",
              letterSpacing: "0.08em",
              flexShrink: 0,
            }}
, "● ACTIVE"

          )
        )
      )

      /* Spacer */
      , React.createElement('div', { style: { flex: 1 }} )

      /* Version (desktop only) */
      , !isNarrow && (
        React.createElement('span', {
          style: {
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            flexShrink: 0,
          }}
, "v0.1.0"

        )
      )
    )
  );
}
