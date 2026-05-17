import React from 'react'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
  Badge,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  StatCard,
  Terminal,
  StatusGrid,
  ProgressRing,
  Grid,
} from '@/ui'
const ORBITAL_MAP = `  ORBITAL MAP: NEXUS-7 // SECTOR ALPHA // LIVE SWEEP
  ┌─────────────────────────────────────────────┐
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ○  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← DSV PROMETHEUS [INBOUND]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ⊕  ·  ·  ·  ·  ◇  ·  ·  · │  ← NEXUS-7 · CSS HERALD
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  △  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← TGV BLACKSTAR [HOLD]
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │
  │  ·  ·  ·  ·  ·  ·  ·  ·  ·  □  ·  ·  ·  · │  ← RSV MERIDIAN [DEPART]
  └─────────────────────────────────────────────┘
  TRACKED: 4 VESSELS // NEXT ARRIVAL: BAY 3 // COLLISION RISK: NONE`
const modules = [
  { name: 'HABITAT RING A', status: 'ACTIVE'  },
  { name: 'HABITAT RING B', status: 'ACTIVE'  },
  { name: 'RESEARCH LAB', status: 'WARNING'  },
  { name: 'DOCKING CLUSTER', status: 'ACTIVE'  },
  { name: 'ENGINEERING BAY', status: 'SCANNING'  },
  { name: 'MEDICAL BAY', status: 'ACTIVE'  },
  { name: 'COMMAND DECK', status: 'ACTIVE'  },
  { name: 'EXTERNAL ARRAY', status: 'OFFLINE'  },
]
const crew = [
  { name: 'REYES, A.', role: 'OPS COMMANDER', status: 'ACTIVE'  },
  { name: 'CHEN, M.', role: 'NAVIGATION', status: 'ACTIVE'  },
  { name: 'KOVACS, D.', role: 'ENGINEERING', status: 'ACTIVE'  },
  { name: 'OSEI, F.', role: 'MEDICAL', status: 'ACTIVE'  },
  { name: 'TANAKA, R.', role: 'EXTERNAL OPS', status: 'WARNING'  },
]
const vessels = [
  {
    id: 'DSV-PROMETHEUS',
    name: 'DSV PROMETHEUS',
    class: 'DEEP SPACE FREIGHTER',
    origin: 'GANYMEDE DEPOT',
    eta: '02:14',
    bay: 'BAY 3',
    status: 'CRITICAL' ,
    note: 'EMERGENCY DOCKING REQUEST',
  },
  {
    id: 'CSS-HERALD',
    name: 'CSS HERALD',
    class: 'COLONY TRANSPORT',
    origin: 'EARTH L2',
    eta: '06:33',
    bay: 'BAY 1',
    status: 'SCANNING' ,
    note: 'SCHEDULED ARRIVAL',
  },
  {
    id: 'TGV-BLACKSTAR',
    name: 'TGV BLACKSTAR',
    class: 'TUG VESSEL',
    origin: 'BELT OPS',
    eta: 'PENDING',
    bay: 'HOLD',
    status: 'WARNING' ,
    note: 'AWAITING CLEARANCE',
  },
  {
    id: 'RSV-MERIDIAN',
    name: 'RSV MERIDIAN',
    class: 'RESEARCH VESSEL',
    origin: 'NEXUS-7',
    eta: '00:47',
    bay: 'DEPARTED',
    status: 'ACTIVE' ,
    note: 'OUTBOUND TO DEEP SPACE',
  },
]
const comms = [
  {
    from: 'DSV PROMETHEUS',
    msg: 'MAYDAY MAYDAY. Reactor coolant breach in section 4. Requesting emergency docking clearance. 2 crew critical. Please respond.',
    time: '04:17:02',
    tag: 'CRITICAL' ,
  },
  {
    from: 'DEEP SPACE RELAY 9',
    msg: 'Anomalous signal detected in sector 7-G. Origin unknown. Estimated source: beyond charted space. Forwarding raw data.',
    time: '03:55:41',
    tag: 'WARNING' ,
  },
  {
    from: 'COLONIAL ADMIN',
    msg: 'Cargo transfer order NX-7-2291 approved. CSS Herald manifest confirmed. Docking bay 1 reserved for 09:00 standard.',
    time: '03:22:18',
    tag: 'STATUS' ,
  },
  {
    from: 'EARTH COMMAND',
    msg: 'Quarterly resupply schedule transmitted. All personnel rotation requests acknowledged. Next supply run: 14 sols.',
    time: '02:48:30',
    tag: 'INFO' ,
  },
]
const missionLog = [
  { type: 'system', text: 'NEXUS-7 OPS CONTROL ONLINE — ALL SYSTEMS NOMINAL', timestamp: '04:00:00' },
  { type: 'output', text: 'DSV PROMETHEUS position lock acquired — 0.4 AU inbound', timestamp: '04:02:15' },
  { type: 'warn',   text: 'PROMETHEUS: reactor coolant breach detected in section 4', timestamp: '04:10:44' },
  { type: 'error',  text: 'MAYDAY received — PROMETHEUS requesting emergency docking Bay 3', timestamp: '04:13:07' },
  { type: 'input',  text: 'authorize docking --vessel DSV-PROMETHEUS --bay 3', timestamp: '04:15:02' },
  { type: 'output', text: 'Bay 3 corridor pressurised. Medical team on standby.', timestamp: '04:15:04' },
  { type: 'warn',   text: 'RESEARCH LAB coolant pressure below nominal — maintenance dispatched', timestamp: '04:17:22' },
  { type: 'system', text: 'EXTERNAL ARRAY offline — scheduled maintenance window', timestamp: '04:18:00' },
  { type: 'input',  text: 'status --all', timestamp: '04:20:00' },
]
function useNarrow(threshold = 900) {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < threshold
  )
  useEffect(() => {
    const handle = () => setNarrow(window.innerWidth < threshold)
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [threshold])
  return narrow
}
export function SciFiContent() {
  const [dockingAuthorized, setDockingAuthorized] = useState(false)
  const [tick, setTick] = useState(0)
  const narrow = useNarrow()
  // Apply default theme on mount
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme')
    return () => {
      if (prev) {
        document.documentElement.setAttribute('data-theme', prev)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [])
  // Live clock tick for blinking effect
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false })
  return (
    React.createElement(React.Fragment, null
      , React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
      }}
      /* ── TOP COMMAND BAR ── */
      , React.createElement('header', {
        style: {
          height: '44px',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem',
          gap: '0.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          flexShrink: 0,
        }}
        , React.createElement(Link, {
          to: "/showcase",
          style: {
            textDecoration: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            flexShrink: 0,
          },
          onMouseEnter: (e) => (e.currentTarget.style.color = 'var(--color-green)'),
          onMouseLeave: (e) => (e.currentTarget.style.color = 'var(--text-muted)')}
, "◄ SHOWCASE"
        )
        , React.createElement('span', { style: { color: 'var(--border)', flexShrink: 0 }}, "│")
        , React.createElement('span', {
          style: {
            color: 'var(--color-green)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textShadow: 'var(--text-glow-green)',
            flexShrink: 0,
          }}
, "NEXUS STATION-7"
        )
        , !narrow && (
          React.createElement('span', {
            style: {
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              flexShrink: 0,
            }}
, "// SECTOR ALPHA // OPERATIONS CONTROL"
          )
        )
        , React.createElement('div', { style: { flex: 1 }} )
        , dockingAuthorized ? (
          React.createElement(Badge, { variant: "ACTIVE"}, "BAY 3 OPEN"  )
        ) : (
          React.createElement(Badge, { variant: "CRITICAL"}, "EMERGENCY DOCKING" )
        )
        , React.createElement(Badge, { variant: "SCANNING"}, "LIVE SWEEP" )
        , React.createElement('span', {
          style: {
            color: 'var(--color-green)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textShadow: 'var(--text-glow-green)',
            flexShrink: 0,
            opacity: tick % 2 === 0 ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
          , timeStr
        )
      )
      /* ── MAIN 3-COLUMN GRID ── */
      , React.createElement('div', {
        style: {
          flex: 1,
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : '256px 1fr 260px',
          gap: '1px',
          background: 'var(--border)',
          overflow: narrow ? 'visible' : 'hidden',
        }}
        /* ── LEFT: STATION STATUS ── */
        , React.createElement('div', {
          style: {
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
          }}
          /* Station modules */
          , React.createElement(Panel, { notch: "sm"}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "STATION MODULES" )
              , React.createElement('div', { style: { marginLeft: 'auto' }}
                , React.createElement(Badge, { variant: "WARNING"}, "1 FAULT" )
              )
            )
            , React.createElement(StatusGrid, {
              systems: modules.map((m) => ({ name: m.name, status: m.status  }))}
            )
          )
          /* Active crew */
          , React.createElement(Panel, { notch: "sm"}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "ON-SHIFT CREW" )
              , React.createElement('div', { style: { marginLeft: 'auto' }}
                , React.createElement(Badge, { variant: "ACTIVE"}, "5 ON DUTY"  )
              )
            )
            , React.createElement(PanelContent, {}
              , React.createElement('div', { style: { display: 'flex', flexDirection: 'column' }}
                , crew.map((member, i) => (
                  React.createElement('div', {
                    key: i,
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.4rem 0',
                      borderBottom: i < crew.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                    , React.createElement('div', {}
                      , React.createElement('div', {
                        style: {
                          fontSize: '0.68rem',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.04em',
                        }}
                        , member.name
                      )
                      , React.createElement('div', {
                        style: {
                          fontSize: '0.57rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.08em',
                          marginTop: '1px',
                        }}
                        , member.role
                      )
                    )
                    , React.createElement(Badge, { variant: member.status}, member.status)
                  )
                ))
              )
            )
          )
          /* Research lab fault */
          , React.createElement(Panel, { notch: "sm"}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "ACTIVE FAULTS" )
            )
            , React.createElement(PanelContent, { style: { display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
              , React.createElement(Alert, { variant: "WARNING"}
                , React.createElement(AlertTitle, {}, "RESEARCH LAB — COOLANT"   )
                , React.createElement(AlertDescription, {}, "Secondary coolant loop pressure below nominal. Maintenance crew dispatched. ETA to resolution: 01h 20m."
                )
              )
              , React.createElement(Alert, { variant: "STATUS"}
                , React.createElement(AlertTitle, {}, "EXTERNAL ARRAY — OFFLINE"   )
                , React.createElement(AlertDescription, {}, "Scheduled maintenance window. Array restored by sol-end. No operational impact."
                )
              )
            )
          )
        )
        /* ── CENTER: OPS TABS ── */
        , React.createElement('div', {
          style: {
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
          }}
          /* Key metrics */
          , React.createElement(Grid, { preset: "4-col", gap: "0.75rem"}
            , React.createElement(StatCard, { label: "REACTOR OUTPUT" , value: "89%",  delta: "+2%",  deltaPositive: true, sublabel: "NOMINAL",   variant: "ACTIVE"}   )
            , React.createElement(StatCard, { label: "HULL INTEGRITY" , value: "76%",  delta: "-4%",  deltaPositive: false, sublabel: "STANDARD"}  )
            , React.createElement(StatCard, { label: "CREW ON DUTY"  ,   value: "5",                 sublabel: "ALL ACTIVE" , variant: "ACTIVE"}   )
            , React.createElement(StatCard, { label: "VESSELS TRACKED" , value: "4",               sublabel: "1 CRITICAL" ,  variant: "WARNING"}  )
          )
          , React.createElement(Panel, { notch: "md", style: { flex: 1 }}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "OPERATIONS // NEXUS-7"  )
              , React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}
                , React.createElement(Badge, { variant: "ACTIVE"}, "SYS NOMINAL" )
              )
            )
            , React.createElement(PanelContent, { style: { padding: 0 }}
              , React.createElement(Tabs, { defaultValue: "docking"}
                , React.createElement(TabsList, { style: { padding: '0 1rem', background: 'var(--surface-raised)' }}
                  , React.createElement(TabsTrigger, { value: "docking"}, "DOCKING")
                  , React.createElement(TabsTrigger, { value: "comms"}, "COMMS")
                  , React.createElement(TabsTrigger, { value: "radar"}, "RADAR")
                  , React.createElement(TabsTrigger, { value: "log"}, "LOG")
                )
                /* DOCKING TAB */
                , React.createElement(TabsContent, { value: "docking", style: { margin: 0, padding: '1rem' }}
                  , !dockingAuthorized && (
                    React.createElement(Alert, { variant: "CRITICAL", style: { marginBottom: '1rem' }}
                      , React.createElement(AlertTitle, {}, "EMERGENCY DOCKING — DSV PROMETHEUS"    )
                      , React.createElement(AlertDescription, {}, "Reactor coolant breach. 2 crew critical. Requesting immediate clearance for Bay 3. Authorize to open docking approach."
                      )
                    )
                  )
                  , dockingAuthorized && (
                    React.createElement(Alert, { variant: "STATUS", style: { marginBottom: '1rem' }}
                      , React.createElement(AlertTitle, {}, "BAY 3 OPEN — DSV PROMETHEUS INBOUND"      )
                      , React.createElement(AlertDescription, {}, "Docking corridor pressurised. Medical team on standby. ETA 02:14."
                      )
                    )
                  )
                  , React.createElement('div', { style: { overflowX: 'auto' }}
                  , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.375rem', minWidth: '480px' }}
                    /* Header row */
                    , React.createElement('div', {
                      style: {
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 60px 70px 100px',
                        gap: '0.5rem',
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.58rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.12em',
                        borderBottom: '1px solid var(--border)',
                      }}
                      , React.createElement('span', {}, "VESSEL")
                      , React.createElement('span', {}, "CLASS")
                      , React.createElement('span', {}, "ETA")
                      , React.createElement('span', {}, "BAY")
                      , React.createElement('span', { style: { textAlign: 'right' }}, "STATUS")
                    )
                    , vessels.map((v) => (
                      React.createElement('div', {
                        key: v.id,
                        style: {
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 60px 70px 100px',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.55rem 0.75rem',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          fontSize: '0.7rem',
                        }}
                        , React.createElement('div', {}
                          , React.createElement('div', {
                            style: {
                              color: 'var(--text-secondary)',
                              letterSpacing: '0.04em',
                              marginBottom: '0.1rem',
                            }}
                            , v.name
                          )
                          , React.createElement('div', {
                            style: {
                              fontSize: '0.57rem',
                              color: 'var(--text-muted)',
                              letterSpacing: '0.06em',
                            }}
                            , v.note
                          )
                        )
                        , React.createElement('span', { style: { color: 'var(--text-muted)', fontSize: '0.65rem' }}
                          , v.class
                        )
                        , React.createElement('span', {
                          style: {
                            color:
                              v.status === 'CRITICAL' ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.04em',
                            fontWeight: v.status === 'CRITICAL' ? 700 : 400,
                          }}
                          , v.eta
                        )
                        , React.createElement('span', { style: { color: 'var(--text-muted)', fontSize: '0.65rem' }}
                          , v.bay
                        )
                        , React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end' }}
                          , React.createElement(Badge, {
                            variant: 
                              v.id === 'DSV-PROMETHEUS' && dockingAuthorized ? 'ACTIVE' : v.status
                            }
                            , v.id === 'DSV-PROMETHEUS' && dockingAuthorized
                              ? 'INBOUND'
                              : v.status
                          )
                        )
                      )
                    ))
                  )
                  )
                )
                /* COMMS TAB */
                , React.createElement(TabsContent, { value: "comms", style: { margin: 0, padding: '1rem' }}
                  , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
                    , comms.map((msg, i) => (
                      React.createElement(Alert, { key: i, variant: msg.tag}
                        , React.createElement(AlertTitle, {}
                          , React.createElement('span', {
                            style: {
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                            , React.createElement('span', {}, msg.from)
                            , React.createElement('span', {
                              style: {
                                color: 'var(--text-muted)',
                                fontWeight: 400,
                                fontSize: '0.6rem',
                              }}
                              , msg.time
                            )
                          )
                        )
                        , React.createElement(AlertDescription, {}, msg.msg)
                      )
                    ))
                  )
                )
                /* RADAR TAB */
                , React.createElement(TabsContent, { value: "radar", style: { margin: 0, padding: '1rem' }}
                  , React.createElement('div', {
                    style: {
                      padding: '1rem',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      marginBottom: '1rem',
                      overflowX: 'auto',
                    }}
                    , React.createElement('pre', {
                      style: {
                        margin: 0,
                        fontSize: '0.62rem',
                        color: 'var(--color-green)',
                        textShadow: 'var(--text-glow-green)',
                        lineHeight: 1.5,
                        letterSpacing: '0.02em',
                        fontFamily: 'var(--font-mono)',
                      }}
                      , ORBITAL_MAP
                    )
                  )
                  , React.createElement('div', {
                    style: {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '0.625rem',
                    }}
                    , [
                      { label: 'TRACKED', value: '4', color: 'var(--color-green)' },
                      { label: 'INBOUND', value: '2', color: 'var(--color-green)' },
                      { label: 'OUTBOUND', value: '1', color: 'var(--text-secondary)' },
                      { label: 'HOLDING', value: '1', color: 'var(--color-amber)' },
                    ].map((s) => (
                      React.createElement('div', {
                        key: s.label,
                        style: {
                          padding: '0.75rem 0.5rem',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          textAlign: 'center',
                        }}
                        , React.createElement('div', {
                          style: {
                            fontSize: '0.57rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.12em',
                            marginBottom: '0.3rem',
                          }}
                          , s.label
                        )
                        , React.createElement('div', {
                          style: {
                            fontSize: '1.1rem',
                            color: s.color,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                          }}
                          , s.value
                        )
                      )
                    ))
                  )
                )
                /* LOG TAB */
                , React.createElement(TabsContent, { value: "log", style: { margin: 0, padding: '1rem' }}
                  , React.createElement(Terminal, {
                    lines: missionLog,
                    title: "MISSION LOG" ,
                    height: "22rem",
                    style: { width: '100%' }}
                  )
                )
              )
            )
          )
        )
        /* ── RIGHT: POWER & ENVIRONMENT ── */
        , React.createElement('div', {
          style: {
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
          }}
          /* Power allocation */
          , React.createElement(Panel, { notch: "sm"}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "POWER ALLOCATION" )
            )
            , React.createElement(PanelContent, {}
              /* Key gauges */
              , React.createElement('div', {
                style: {
                  display: 'flex',
                  justifyContent: 'space-around',
                  paddingBottom: '1rem',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--border)',
                }}
                , React.createElement(ProgressRing, { value: 89, label: "REACTOR",  variant: "ACTIVE",   size: 76} )
                , React.createElement(ProgressRing, { value: 94, label: "DOCKING",  variant: "ACTIVE",   size: 76} )
                , React.createElement(ProgressRing, { value: 43, label: "DEFLECTOR", variant: "WARNING", size: 76} )
              )
              , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
                , React.createElement(Progress, { value: 89, label: "FUSION REACTOR" } )
                , React.createElement(Progress, { value: 76, label: "HABITAT LIFE SUPPORT"  } )
                , React.createElement(Progress, { value: 94, label: "DOCKING SYSTEMS" } )
                , React.createElement(Progress, { value: 61, label: "PROPULSION ARRAY" } )
                , React.createElement(Progress, { value: 100, label: "COMM RELAY" } )
                , React.createElement(Progress, { value: 43, label: "DEFLECTOR GRID" } )
              )
            )
          )
          /* Environment */
          , React.createElement(Panel, { notch: "sm"}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "ENVIRONMENT")
            )
            , React.createElement(PanelContent, {}
              , React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
                , React.createElement(Progress, { value: 98, label: "O₂ LEVELS" } )
                , React.createElement(Progress, { value: 82, label: "ATMOSPHERIC PRESSURE" } )
                , React.createElement(Progress, { value: 71, label: "HUMIDITY"} )
                , React.createElement(Progress, { value: 55, label: "RADIATION SHIELDING" } )
              )
            )
          )
          /* Proximity */
          , React.createElement(Panel, { notch: "sm"}
            , React.createElement(PanelHeader, {}
              , React.createElement(PanelTitle, {}, "PROXIMITY ALERTS" )
            )
            , React.createElement(PanelContent, { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              , [
                {
                  name: 'DSV PROMETHEUS',
                  dist: '0.4 AU',
                  status: 'CRITICAL' ,
                },
                {
                  name: 'CSS HERALD',
                  dist: '2.1 AU',
                  status: 'SCANNING' ,
                },
                {
                  name: 'TGV BLACKSTAR',
                  dist: '0.9 AU',
                  status: 'WARNING' ,
                },
                {
                  name: 'DEBRIS FIELD 7G',
                  dist: '3.8 AU',
                  status: 'OFFLINE' ,
                },
              ].map((obj, i) => (
                React.createElement('div', {
                  key: i,
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.4rem 0.5rem',
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border)',
                  }}
                  , React.createElement('div', {}
                    , React.createElement('div', {
                      style: {
                        fontSize: '0.65rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.04em',
                      }}
                      , obj.name
                    )
                    , React.createElement('div', {
                      style: {
                        fontSize: '0.57rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                        marginTop: '1px',
                      }}
                      , obj.dist
                    )
                  )
                  , React.createElement(Badge, { variant: obj.status}, obj.status)
                )
              ))
            )
          )
        )
      )
      /* ── COMMAND FOOTER ── */
      , React.createElement('footer', {
        style: {
          minHeight: '52px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '0.5rem 1.25rem',
          gap: '0.5rem',
          position: 'sticky',
          bottom: 0,
          zIndex: 50,
          flexShrink: 0,
        }}
        , React.createElement(Button, {
          variant: "EXEC",
          size: "SM",
          onClick: () => setDockingAuthorized(true),
          disabled: dockingAuthorized}
          , dockingAuthorized ? '✓ DOCKING AUTHORIZED' : 'AUTHORIZE DOCKING'
        )
        , React.createElement(Button, { variant: "OUTLINE", size: "SM"}, "BROADCAST ALERT"
        )
        , React.createElement(Button, { variant: "GHOST", size: "SM"}, "REQUEST SUPPORT"
        )
        , React.createElement(Button, { variant: "ABORT", size: "SM"}, "LOCK DOWN STATION"
        )
        , React.createElement('div', { style: { flex: 1 }} )
        , React.createElement('span', {
          style: {
            color: 'var(--text-muted)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
          }}
, "NEXUS-7 // SECTOR ALPHA // COLONIAL AUTHORITY"
        )
        , React.createElement('span', { style: { color: 'var(--border)' }}, "│")
        , React.createElement(Badge, { variant: "ACTIVE"}, "SYS ONLINE" )
      )
    )
    )
  )
}
