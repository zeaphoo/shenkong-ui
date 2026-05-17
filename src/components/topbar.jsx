import React from "react";

export function Topbar({ onMenuToggle, isNarrow }) {
  return (
    <header
      style={{
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
      }}>
      {isNarrow && (
          <button
            onClick={onMenuToggle}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontFamily: "var(--font-mono)",
              padding: "0.25rem 0.5rem",
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label="Toggle menu">
            ☰
          </button>
        )

      /* Left status (desktop only) */}
      {!isNarrow && (
          <React.Fragment>
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}>
              SYS:ONLINE
            </span>
            <span
              style={{
                color: "var(--color-green)",
                fontSize: "0.8rem",
                textShadow: "var(--text-glow-green)",
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}>
              ● ACTIVE
            </span>
          </React.Fragment>
        )

      /* Spacer */}
      {<div style={{ flex: 1 }} />

      /* Version (desktop only) */}
      {!isNarrow && (
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              flexShrink: 0,
            }}>
            v0.1.0
          </span>
        )}
    </header>

    /* Hamburger (mobile only) */
  );
}
