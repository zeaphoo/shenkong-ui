import React from 'react'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  StatCard,
  Terminal,
  StatusGrid,
  ProgressRing,
  BarChart,
  LineChart,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/ui'
// ── APIs ──────────────────────────────────────────────────────────────────
// ISS telemetry (live, polled every 5s) — wheretheiss.at: lat/lng/altitude/velocity/visibility
// SpaceX crew, past launches, upcoming launches — api.spacexdata.com
// ── Types ─────────────────────────────────────────────────────────────────
// ── Helpers ───────────────────────────────────────────────────────────────
async function fetchWithTimeout(url, ms = 8000) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}
function daysUntilLaunch(dateUtc) {
  const diff = new Date(dateUtc).getTime() - Date.now()
  if (diff <= 0) return 'TBD'
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return `${days}D ${hours}H`
  if (hours > 0) return `${hours}H ${mins}M`
  return `${mins}M`
}
function orbitalProgress(timestamp) {
  const PERIOD_SECS = 5520 // ISS orbital period ≈ 92 min
  return Math.round(((timestamp % PERIOD_SECS) / PERIOD_SECS) * 100)
}
function successRate(launches) {
  const decided = launches.filter((l) => l.success !== null)
  if (!decided.length) return 0
  return Math.round((decided.filter((l) => l.success === true).length / decided.length) * 100)
}
function launchesByYear(launches) {
  const currentYear = new Date().getFullYear()
  const buckets = {}
  for (let y = currentYear - 7; y <= currentYear; y++) buckets[y] = 0
  launches.forEach((l) => {
    const y = new Date(l.date_utc).getFullYear()
    if (y in buckets) buckets[y]++
  })
  return Object.entries(buckets).map(([y, v]) => ({
    label: `'${y.slice(-2)}`,
    value: v ,
  }))
}
function fmtUtc(dateUtc) {
  return new Date(dateUtc).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })
}
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
function now() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false })
}
// ── Component ─────────────────────────────────────────────────────────────
export function MissionControlContent() {
  const narrow = useNarrow()
  const [tick, setTick] = useState(0)
  const [iss, setIss] = useState(null)
  const [issError, setIssError] = useState(false)
  const [issHistory, setIssHistory] = useState([])
  const [activeCrew, setActiveCrew] = useState([])
  const [pastLaunches, setPastLaunches] = useState([])
  const [upcomingLaunches, setUpcomingLaunches] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataError, setDataError] = useState(false)
  const [termLines, setTermLines] = useState([
    {
      type: 'system',
      text: 'EARTH ORBIT COMMAND // INITIALIZING DATA LINKS...',
      timestamp: now(),
    },
  ])
  const addLine = (line) =>
    setTermLines((prev) => [...prev.slice(-49), line])
  // Restore default theme on mount
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme')
    return () => {
      if (prev) document.documentElement.setAttribute('data-theme', prev)
      else document.documentElement.removeAttribute('data-theme')
    }
  }, [])
  // Clock tick
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])
  // One-time static data: SpaceX crew + past + upcoming launches
  useEffect(() => {
    Promise.all([
      fetchWithTimeout('https://api.spacexdata.com/v4/crew').then((r) => r.json()),
      fetchWithTimeout('https://api.spacexdata.com/v4/launches/past').then((r) => r.json()),
      fetchWithTimeout('https://api.spacexdata.com/v4/launches/upcoming').then((r) => r.json()),
    ])
      .then(([crew, past, upcoming]) => {
        const active = (crew ).filter(
          (c) => c.status === 'active'
        )
        setActiveCrew(active)
        setPastLaunches(past ?? [])
        const sorted = [...(upcoming ?? [])].sort(
          (a, b) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        )
        setUpcomingLaunches(sorted)
        setDataLoaded(true)
        addLine({
          type: 'output',
          text: `SPACEX CREW MANIFEST LOADED — ${active.length} ACTIVE PERSONNEL`,
          timestamp: now(),
        })
        addLine({
          type: 'output',
          text: `FLIGHT DATABASE — ${(past ).length} HISTORICAL MISSIONS`,
          timestamp: now(),
        })
        addLine({
          type: 'output',
          text: `UPCOMING MANIFEST — ${sorted.length} MISSIONS SCHEDULED`,
          timestamp: now(),
        })
        addLine({
          type: 'system',
          text: 'ALL DATA LINKS NOMINAL. ORBITAL TRACKING ACTIVE.',
          timestamp: now(),
        })
      })
      .catch(() => {
        setDataError(true)
        addLine({
          type: 'error',
          text: 'SPACEX DATA LINK FAILURE — CHECK NETWORK CONNECTION',
          timestamp: now(),
        })
      })
  }, [])
  // ISS telemetry poll — every 5s via wheretheiss.at
  useEffect(() => {
    let mounted = true
    async function poll() {
      try {
        const res = await fetchWithTimeout(
          'https://api.wheretheiss.at/v1/satellites/25544',
          6000
        )
        const data = await res.json()
        if (!mounted) return
        setIss(data)
        setIssError(false)
        setIssHistory(prev => {
          const entry = { label: now(), value: Math.round(data.altitude) }
          return [...prev.slice(-29), entry]
        })
        const lat = data.latitude.toFixed(2)
        const lng = data.longitude.toFixed(2)
        const alt = data.altitude.toFixed(1)
        const vel = (data.velocity / 3600).toFixed(2)
        const vis = data.visibility.toUpperCase()
        addLine({
          type: 'output',
          text: `ISS // LAT ${lat}° LNG ${lng}° // ALT ${alt} KM // ${vel} KM/S // ${vis}`,
          timestamp: now(),
        })
      } catch (e2) {
        if (!mounted) return
        setIssError(true)
        addLine({
          type: 'warn',
          text: 'ISS SIGNAL LOST — RETRYING IN 5S...',
          timestamp: now(),
        })
      }
    }
    poll()
    const id = setInterval(poll, 5000)
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [])
  // Derived values
  const nextLaunch = upcomingLaunches[0] ?? null
  const successPct = successRate(pastLaunches)
  const chartData = launchesByYear(pastLaunches)
  const orbitalPct = iss ? orbitalProgress(iss.timestamp) : 0
  const crewPct = Math.min(Math.round((activeCrew.length / 50) * 100), 100)
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false })
  const crewSystems = activeCrew.map((c) => ({
    name: c.name.toUpperCase(),
    status: 'ACTIVE' ,
    detail: c.agency,
  }))
  const overallError = issError && dataError
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
        /* ── HEADER ── */
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
, "EARTH ORBIT CMD"
          )
          , !narrow && (
            React.createElement('span', {
              style: {
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}
, "// ISS TRACKER // SPACEX TELEMETRY"
            )
          )
          , React.createElement('div', { style: { flex: 1 }} )
          , !narrow && (
            React.createElement(Badge, { variant: issError ? 'WARNING' : iss ? 'ACTIVE' : 'SCANNING'}
              , issError ? 'ISS OFFLINE' : iss ? 'ISS LIVE' : 'ACQUIRING'
            )
          )
          , React.createElement(Badge, { variant: overallError ? 'CRITICAL' : dataLoaded ? 'ACTIVE' : 'SCANNING'}
            , overallError ? 'LINK FAIL' : dataLoaded ? 'FEED LIVE' : 'LOADING'
          )
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
        /* ── BODY ── */
        , React.createElement('div', {
          style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: 'var(--border)',
          }}
          /* STAT CARDS — all live from wheretheiss.at */
          , React.createElement('div', {
            style: {
              background: 'var(--background)',
              padding: '0.75rem 1rem',
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: '0.75rem',
            }}
            , React.createElement(StatCard, {
              label: "ISS ALTITUDE" ,
              value: iss ? `${iss.altitude.toFixed(0)} KM` : '---',
              sublabel: iss ? `${iss.visibility.toUpperCase()}` : 'ACQUIRING LOCK',
              variant: iss ? 'ACTIVE' : 'DEFAULT'}
            )
            , React.createElement(StatCard, {
              label: "ISS VELOCITY" ,
              value: iss ? `${(iss.velocity / 3600).toFixed(2)} KM/S` : '---',
              sublabel: iss ? 'LIVE · 5S REFRESH' : 'ACQUIRING LOCK',
              variant: iss ? 'ACTIVE' : 'DEFAULT'}
            )
            , React.createElement(StatCard, {
              label: "ISS LATITUDE" ,
              value: iss ? `${iss.latitude.toFixed(2)}°` : '---',
              sublabel: iss ? `LNG ${iss.longitude.toFixed(2)}°` : 'ACQUIRING LOCK',
              variant: iss ? 'ACTIVE' : 'DEFAULT'}
            )
            , React.createElement(StatCard, {
              label: "NEXT LAUNCH" ,
              value: nextLaunch ? daysUntilLaunch(nextLaunch.date_utc) : '---',
              sublabel: 
                nextLaunch
                  ? nextLaunch.name.length > 20
                    ? nextLaunch.name.slice(0, 20).toUpperCase() + '…'
                    : nextLaunch.name.toUpperCase()
                  : 'LOADING...'
              ,
              variant: nextLaunch ? 'WARNING' : 'DEFAULT'}
            )
          )
          /* 3-COLUMN GRID */
          , React.createElement('div', {
            style: {
              flex: 1,
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr' : '260px 1fr 240px',
              gap: '1px',
              background: 'var(--border)',
            }}
            /* ── LEFT: CREW + ORBITAL METRICS ── */
            , React.createElement('div', {
              style: {
                background: 'var(--background)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
                overflowY: 'auto',
              }}
              , React.createElement(Panel, { notch: "sm"}
                , React.createElement(PanelHeader, {}
                  , React.createElement(PanelTitle, {}, "SPACEX CREW" )
                  , React.createElement('div', { style: { marginLeft: 'auto' }}
                    , React.createElement(Badge, { variant: dataLoaded ? 'ACTIVE' : 'SCANNING'}
                      , dataLoaded ? `${activeCrew.length} ACTIVE` : 'LOADING'
                    )
                  )
                )
                , crewSystems.length > 0 ? (
                  React.createElement(StatusGrid, { systems: crewSystems} )
                ) : (
                  React.createElement(PanelContent, {}
                    , React.createElement('div', {
                      style: {
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                      }}
                      , dataError ? 'DATA LINK FAILURE' : 'ACQUIRING CREW DATA...'
                    )
                  )
                )
              )
              , React.createElement(Panel, { notch: "sm"}
                , React.createElement(PanelHeader, {}
                  , React.createElement(PanelTitle, {}, "ORBITAL METRICS" )
                )
                , React.createElement(PanelContent, {}
                  , React.createElement('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-around',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.25rem',
                    }}
                    , React.createElement(ProgressRing, {
                      value: successPct,
                      label: "SUCCESS",
                      variant: "ACTIVE",
                      size: 74}
                    )
                    , React.createElement(ProgressRing, {
                      value: orbitalPct,
                      label: "ORBIT",
                      variant: iss ? 'ACTIVE' : 'DEFAULT',
                      size: 74}
                    )
                    , React.createElement(ProgressRing, {
                      value: crewPct,
                      label: "CREW / 50"  ,
                      variant: crewPct > 75 ? 'WARNING' : 'ACTIVE',
                      size: 74}
                    )
                  )
                  , React.createElement('div', {
                    style: {
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '0.25rem',
                      textAlign: 'center',
                    }}
                    , [
                      { label: 'LAUNCH SUCCESS', note: 'SpaceX history' },
                      { label: 'ORBIT CYCLE', note: '~92min period' },
                      { label: 'CREW ACTIVE', note: 'of all SpaceX' },
                    ].map((item) => (
                      React.createElement('div', { key: item.label}
                        , React.createElement('div', {
                          style: {
                            fontSize: '0.52rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                          , item.label
                        )
                        , React.createElement('div', {
                          style: {
                            fontSize: '0.48rem',
                            color: 'var(--border)',
                            letterSpacing: '0.06em',
                            marginTop: '1px',
                          }}
                          , item.note
                        )
                      )
                    ))
                  )
                )
              )
            )
            /* ── CENTER: OPERATIONS TABS ── */
            , React.createElement('div', {
              style: {
                background: 'var(--background)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
                overflowY: 'auto',
              }}
              , React.createElement(Panel, { notch: "md", style: { flex: 1 }}
                , React.createElement(PanelHeader, {}
                  , React.createElement(PanelTitle, {}, "OPERATIONS // EARTH ORBIT COMMAND"    )
                  , React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}
                    , React.createElement(Badge, { variant: "ACTIVE"}, "SYS NOMINAL" )
                  )
                )
                , React.createElement(PanelContent, { style: { padding: 0 }}
                  , React.createElement(Tabs, { defaultValue: "launches"}
                    , React.createElement(TabsList, {
                      style: { padding: '0 1rem', background: 'var(--surface-raised)' }}
                      , React.createElement(TabsTrigger, { value: "launches"}, "LAUNCHES")
                      , React.createElement(TabsTrigger, { value: "next"}, "NEXT MISSION" )
                      , React.createElement(TabsTrigger, { value: "telemetry"}, "ISS TELEMETRY" )
                      , React.createElement(TabsTrigger, { value: "altitude"}, "ALTITUDE")
                    )
                    /* LAUNCHES TAB */
                    , React.createElement(TabsContent, { value: "launches", style: { margin: 0, padding: '1rem' }}
                      , chartData.some((d) => d.value > 0) ? (
                        React.createElement(React.Fragment, null
                          , React.createElement(BarChart, {
                            data: chartData,
                            orientation: "vertical",
                            variant: "ACTIVE",
                            title: "SPACEX LAUNCHES BY YEAR (LAST 8 YEARS)"      ,
                            style: { width: '100%' }}
                          )
                          , React.createElement('div', {
                            style: {
                              marginTop: '1rem',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '0.625rem',
                            }}
                            , [
                              {
                                label: 'TOTAL LAUNCHES',
                                value: pastLaunches.length,
                              },
                              {
                                label: 'SUCCESSFUL',
                                value: pastLaunches.filter((l) => l.success === true).length,
                              },
                              {
                                label: 'SUCCESS RATE',
                                value: `${successPct}%`,
                              },
                            ].map((s) => (
                              React.createElement('div', {
                                key: s.label,
                                style: {
                                  padding: '0.75rem',
                                  background: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  textAlign: 'center',
                                }}
                                , React.createElement('div', {
                                  style: {
                                    fontSize: '0.55rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    marginBottom: '0.4rem',
                                  }}
                                  , s.label
                                )
                                , React.createElement('div', {
                                  style: {
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: 'var(--color-green)',
                                    textShadow: 'var(--text-glow-green)',
                                    letterSpacing: '0.02em',
                                  }}
                                  , s.value
                                )
                              )
                            ))
                          )
                        )
                      ) : (
                        React.createElement('div', {
                          style: {
                            padding: '3rem',
                            textAlign: 'center',
                            color: dataError ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                          }}
                          , dataError ? 'DATA LINK FAILURE' : 'LOADING LAUNCH DATABASE...'
                        )
                      )
                    )
                    /* NEXT MISSION TAB */
                    , React.createElement(TabsContent, { value: "next", style: { margin: 0, padding: '1rem' }}
                      , nextLaunch ? (
                        React.createElement('div', {
                          style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                          , React.createElement(Alert, { variant: "STATUS"}
                            , React.createElement(AlertTitle, {}, "FLIGHT #"
                               , nextLaunch.flight_number, " —" , ' '
                              , nextLaunch.name.toUpperCase()
                            )
                            , React.createElement(AlertDescription, {}
                              , (nextLaunch.details ??                                'Mission details have not been released yet. Stand by for further information.')
                            )
                          )
                          , React.createElement('div', {
                            style: {
                              display: 'grid',
                              gridTemplateColumns: narrow ? '1fr' : '1fr 1fr',
                              gap: '0.625rem',
                            }}
                            , [
                              {
                                label: 'LAUNCH DATE (UTC)',
                                value: fmtUtc(nextLaunch.date_utc),
                              },
                              {
                                label: 'FLIGHT NUMBER',
                                value: `#${nextLaunch.flight_number}`,
                              },
                              {
                                label: 'T-MINUS',
                                value: daysUntilLaunch(nextLaunch.date_utc),
                              },
                              { label: 'LAUNCH STATUS', value: 'SCHEDULED' },
                            ].map((item) => (
                              React.createElement('div', {
                                key: item.label,
                                style: {
                                  padding: '0.75rem',
                                  background: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                }}
                                , React.createElement('div', {
                                  style: {
                                    fontSize: '0.55rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    marginBottom: '0.35rem',
                                  }}
                                  , item.label
                                )
                                , React.createElement('div', {
                                  style: {
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.04em',
                                  }}
                                  , item.value
                                )
                              )
                            ))
                          )
                        )
                      ) : (
                        React.createElement('div', {
                          style: {
                            padding: '3rem',
                            textAlign: 'center',
                            color: dataError ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                          }}
                          , dataError ? 'DATA LINK FAILURE' : 'ACQUIRING MISSION DATA...'
                        )
                      )
                    )
                    /* ISS TELEMETRY TAB */
                    , React.createElement(TabsContent, { value: "telemetry", style: { margin: 0, padding: '1rem' }}
                      , React.createElement(Terminal, {
                        lines: termLines,
                        title: "ISS TELEMETRY FEED // WHERETHEISS.AT // 5S REFRESH"       ,
                        height: "22rem",
                        style: { width: '100%' }}
                      )
                    )
                    /* ALTITUDE TAB */
                    , React.createElement(TabsContent, { value: "altitude", style: { margin: 0, padding: '1rem' }}
                      , issHistory.length >= 2 ? (
                        React.createElement(LineChart, {
                          series: [{ id: 'alt', label: 'ALTITUDE KM', data: issHistory.map(h => h.value) }],
                          labels: issHistory.map(h => h.label),
                          title: "ISS ALTITUDE TRACK // 5S SAMPLES"     ,
                          showArea: true,
                          animated: false,
                          style: { width: '100%' }}
                        )
                      ) : (
                        React.createElement('div', {
                          style: {
                            padding:       '3rem',
                            textAlign:     'center',
                            color:         issError ? 'var(--color-red)' : 'var(--text-muted)',
                            fontSize:      '0.7rem',
                            letterSpacing: '0.1em',
                          }}
                          , issError ? 'ISS SIGNAL LOST' : issHistory.length === 1 ? 'ACQUIRING DATA — NEXT SAMPLE IN 5S...' : 'ACQUIRING ISS LOCK...'
                        )
                      )
                    )
                  )
                )
              )
            )
            /* ── RIGHT: UPCOMING + FLEET STATS ── */
            , React.createElement('div', {
              style: {
                background: 'var(--background)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
                overflowY: 'auto',
              }}
              , React.createElement(Panel, { notch: "sm"}
                , React.createElement(PanelHeader, {}
                  , React.createElement(PanelTitle, {}, "UPCOMING MISSIONS" )
                  , React.createElement('div', { style: { marginLeft: 'auto' }}
                    , React.createElement(Badge, { variant: upcomingLaunches.length > 0 ? 'SCANNING' : 'OFFLINE'}
                      , upcomingLaunches.length > 0
                        ? `${upcomingLaunches.length} QUEUED`
                        : 'LOADING'
                    )
                  )
                )
                , React.createElement(PanelContent, { style: { padding: 0 }}
                  , upcomingLaunches.length > 0 ? (
                    React.createElement('div', { style: { display: 'flex', flexDirection: 'column' }}
                      , upcomingLaunches.slice(0, 8).map((launch, i) => {
                        const isNext = i === 0
                        const isLast = i === Math.min(upcomingLaunches.length, 8) - 1
                        return (
                          React.createElement('div', {
                            key: launch.id,
                            style: {
                              padding: '0.6rem 0.75rem',
                              borderBottom: isLast ? 'none' : '1px solid var(--border)',
                              background: isNext ? 'var(--surface-raised)' : 'transparent',
                            }}
                            , React.createElement('div', {
                              style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                              }}
                              , React.createElement('div', { style: { overflow: 'hidden', flex: 1 }}
                                , React.createElement('div', {
                                  style: {
                                    fontSize: '0.68rem',
                                    color: isNext
                                      ? 'var(--text-secondary)'
                                      : 'var(--text-muted)',
                                    letterSpacing: '0.04em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    textTransform: 'uppercase',
                                  }}
                                  , launch.name
                                )
                                , React.createElement('div', {
                                  style: {
                                    fontSize: '0.57rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.06em',
                                    marginTop: '2px',
                                  }}
                                  , daysUntilLaunch(launch.date_utc), " // #"  , launch.flight_number
                                )
                              )
                              , React.createElement(Badge, { variant: isNext ? 'WARNING' : 'SCANNING'}
                                , isNext ? 'NEXT' : 'SCHED'
                              )
                            )
                          )
                        )
                      })
                    )
                  ) : (
                    React.createElement(PanelContent, {}
                      , React.createElement('div', {
                        style: {
                          fontSize: '0.7rem',
                          color: dataError ? 'var(--color-red)' : 'var(--text-muted)',
                          letterSpacing: '0.08em',
                        }}
                        , dataError ? 'DATA LINK FAILURE' : 'LOADING MANIFEST...'
                      )
                    )
                  )
                )
              )
              , React.createElement(Panel, { notch: "sm"}
                , React.createElement(PanelHeader, {}
                  , React.createElement(PanelTitle, {}, "FLEET STATISTICS" )
                )
                , React.createElement(PanelContent, {}
                  , React.createElement('div', { style: { display: 'flex', flexDirection: 'column' }}
                    , [
                      {
                        label: 'TOTAL LAUNCHES',
                        value: dataLoaded ? pastLaunches.length : '---',
                      },
                      {
                        label: 'SUCCESS RATE',
                        value: dataLoaded ? `${successPct}%` : '---',
                      },
                      {
                        label: 'MISSIONS UPCOMING',
                        value: dataLoaded ? upcomingLaunches.length : '---',
                      },
                      {
                        label: 'ACTIVE CREW',
                        value: dataLoaded ? activeCrew.length : '---',
                      },
                      {
                        label: 'ISS ALTITUDE',
                        value: iss ? `${iss.altitude.toFixed(0)} KM` : '---',
                      },
                      {
                        label: 'ISS VELOCITY',
                        value: iss ? `${(iss.velocity / 3600).toFixed(2)} KM/S` : '---',
                      },
                      {
                        label: 'ORBIT PERIOD',
                        value: '~92 MIN',
                      },
                    ].map((item, i, arr) => (
                      React.createElement('div', {
                        key: item.label,
                        style: {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.4rem 0',
                          borderBottom:
                            i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                        , React.createElement('span', {
                          style: {
                            fontSize: '0.6rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                          }}
                          , item.label
                        )
                        , React.createElement('span', {
                          style: {
                            fontSize: '0.78rem',
                            color: 'var(--color-green)',
                            textShadow: 'var(--text-glow-green)',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                          }}
                          , item.value
                        )
                      )
                    ))
                  )
                )
              )
            )
          )
        )
        /* ── FOOTER ── */
        , React.createElement('footer', {
          style: {
            minHeight: '44px',
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
          , React.createElement('span', {
            style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
, "ISS: WHERETHEISS.AT"
          )
          , React.createElement('span', { style: { color: 'var(--border)' }}, "│")
          , React.createElement('span', {
            style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
, "LAUNCHES: SPACEXDATA.COM"
          )
          , React.createElement('span', { style: { color: 'var(--border)' }}, "│")
          , React.createElement('span', {
            style: { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
, "ISS POSITION REFRESHES EVERY 5S"
          )
          , React.createElement('div', { style: { flex: 1 }} )
          , React.createElement(Badge, {
            variant: 
              overallError ? 'CRITICAL' : dataLoaded && iss ? 'ACTIVE' : 'SCANNING'
            }
            , overallError
              ? 'LINK FAILURE'
              : dataLoaded && iss
                ? 'SYS ONLINE'
                : 'INITIALIZING'
          )
        )
      )
    )
  )
}
