;
import { Link } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/lib/use-theme';
import {
  Panel, PanelHeader, PanelTitle, PanelContent,
  Badge, Button,
  StatCard,
  Tabs, TabsList, TabsTrigger, TabsContent,
  ProgressRing, Progress,
  BarChart, LineChart, RadarChart, NodeGraph, Heatmap,
  StatusGrid,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from
'@/ui';
// ── Types ──────────────────────────────────────────────────────────────────
// ── Shared base timeseries data ────────────────────────────────────────────
const TIMES = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i * 5 / 60).toString().padStart(2, '0');
  const m = (i * 5 % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
});
const HEATMAP_DATA = Array.from({ length: 7 }, (_, row) =>
Array.from({ length: 24 }, (_, col) => {
  const base = [55, 60, 48, 72, 81, 65, 58][row];
  const wave = Math.sin(col / 24 * Math.PI * 2) * 15;
  const noise = (row * 7 + col * 13) % 17 - 8;
  return Math.max(0, Math.min(100, Math.round(base + wave + noise)));
})
);
// ── Theme configs ──────────────────────────────────────────────────────────
const THEMES = {
  'sci-fi': {
    htmlTheme: null,
    title: 'SECTOR ANALYTICS CONSOLE',
    subtitle: '// DEEP SPACE MONITORING ARRAY // CHARTS DEMO',
    backLabel: '◄ SHOWCASE',
    badge1Label: 'DATA LIVE',
    badge2Label: (n) => `${n} ANOMALIES`,
    badge2Variant: (n) => n > 3 ? 'WARNING' : 'SCANNING',
    stat1Label: 'ACTIVE PROBES',
    stat1Value: () => '8 / 8',
    stat1Sub: () => 'ALL NOMINAL',
    stat1Variant: () => 'ACTIVE',
    stat2Label: 'RADIATION LEVEL',
    stat2Value: (v) => `${v} mSv`,
    stat2Sub: 'NOMINAL',
    stat2Variant: (v) => v > 27 ? 'WARNING' : 'ACTIVE',
    stat3Label: 'MAGNETIC FLUX',
    stat3Value: (v) => `${v} nT`,
    stat3Sub: 'SECTOR-ALPHA',
    stat4Label: 'SCAN COVERAGE',
    stat4Value: (v) => `${v}%`,
    stat4Sub: 'ACTIVE SWEEP',
    profileTitle: 'SECTOR PROFILE',
    centerTitle: 'MONITORING ARRAY // SECTOR-ALPHA',
    centerBadge: 'SWEEP ACTIVE',
    rightChartTitle: 'ANOMALY COUNT BY YEAR',
    anomalyPanelTitle: 'ACTIVE ANOMALIES',
    profileAxes: [
    { axis: 'RADIATION', value: 68 },
    { axis: 'MAGNETIC', value: 82 },
    { axis: 'THERMAL', value: 47 },
    { axis: 'GRAVITATIONAL', value: 91 },
    { axis: 'PARTICLE', value: 55 },
    { axis: 'EM FLUX', value: 73 }],

    coverageTitle: 'COVERAGE MAP',
    coverageAxes: [
    { axis: 'N', value: 94 }, { axis: 'NE', value: 87 }, { axis: 'E', value: 91 },
    { axis: 'SE', value: 78 }, { axis: 'S', value: 96 }, { axis: 'SW', value: 62 },
    { axis: 'W', value: 88 }, { axis: 'NW', value: 83 }],

    timeseriesTitle: 'SENSOR READINGS // 2H WINDOW // 5-MIN SAMPLES',
    seriesA: { id: 'rad', label: 'RADIATION (mSv)', data: [12, 14, 13, 15, 17, 19, 22, 24, 23, 21, 19, 18, 20, 22, 25, 28, 31, 29, 27, 26, 24, 22, 21, 20] },
    seriesB: { id: 'mag', label: 'MAGNETIC FLUX (nT)', data: [45, 44, 46, 48, 47, 49, 51, 50, 52, 54, 53, 51, 50, 48, 47, 49, 51, 53, 55, 57, 56, 54, 52, 51] },
    seriesC: { id: 'par', label: 'PARTICLE DENSITY', data: [8, 9, 8, 10, 12, 11, 13, 15, 14, 13, 11, 10, 9, 11, 13, 15, 17, 16, 14, 13, 12, 11, 10, 9] },
    timeStatLabels: ['AVG RADIATION', 'PEAK MAGNETIC', 'PARTICLE EVENTS'],
    timeStatValues: ['21 mSv', '57 nT', '7'],
    networkTitle: 'PROBE NETWORK TOPOLOGY // SECTOR-ALPHA // RELAY-01 HUB',
    networkNodes: [
    { id: 'relay', label: 'RELAY-01', x: 50, y: 50, status: 'ACTIVE', sublabel: 'hub' },
    { id: 'pa1', label: 'A1', x: 18, y: 18, status: 'ACTIVE' },
    { id: 'pa2', label: 'A2', x: 50, y: 12, status: 'ACTIVE' },
    { id: 'pb1', label: 'B1', x: 82, y: 18, status: 'WARNING', sublabel: 'degraded' },
    { id: 'pb2', label: 'B2', x: 88, y: 50, status: 'ACTIVE' },
    { id: 'pc1', label: 'C1', x: 82, y: 82, status: 'ACTIVE' },
    { id: 'pc2', label: 'C2', x: 50, y: 88, status: 'CRITICAL', sublabel: 'low signal' },
    { id: 'pd1', label: 'D1', x: 18, y: 82, status: 'ACTIVE' }],

    networkEdges: [
    { from: 'relay', to: 'pa1', animated: true },
    { from: 'relay', to: 'pa2', animated: true },
    { from: 'relay', to: 'pb1' },
    { from: 'relay', to: 'pb2', animated: true },
    { from: 'relay', to: 'pc1', animated: true },
    { from: 'relay', to: 'pc2' },
    { from: 'relay', to: 'pd1', animated: true },
    { from: 'pa1', to: 'pd1' },
    { from: 'pa2', to: 'pb1' },
    { from: 'pb2', to: 'pc1' }],

    heatmapTitle: 'RADIATION INTENSITY // DAY × HOUR MATRIX',
    heatRowLabels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    heatColLabels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
    signalTitle: 'PROBE SIGNAL STRENGTH // % OF NOMINAL',
    signalData: [
    { label: 'PROBE-A1', value: 94 }, { label: 'PROBE-A2', value: 87 },
    { label: 'PROBE-B1', value: 72 }, { label: 'PROBE-B2', value: 61 },
    { label: 'PROBE-C1', value: 89 }, { label: 'PROBE-C2', value: 44 },
    { label: 'PROBE-D1', value: 96 }, { label: 'RELAY-01', value: 100 }],

    signalVariant: 'WARNING',
    annualTitle: 'ANOMALY COUNT BY YEAR',
    annualData: [
    { label: "'19", value: 4 }, { label: "'20", value: 7 }, { label: "'21", value: 12 },
    { label: "'22", value: 18 }, { label: "'23", value: 24 }, { label: "'24", value: 31 },
    { label: "'25", value: 29 }, { label: "'26", value: 38 }],

    anomalies: (extra) => [
    { id: 'ANX-0041', type: 'RADIATION SPIKE', sector: 'GRID-A4', sev: 'WARNING', age: '00:12', detail: 'Elevated particle flux detected above nominal threshold. Probe B1 signal degraded.' },
    { id: 'ANX-0040', type: 'MAGNETIC BURST', sector: 'GRID-B2', sev: 'WARNING', age: '00:47', detail: 'Intermittent magnetic field distortion. Auto-calibration in progress.' },
    { id: 'ANX-0039', type: 'SIGNAL DROPOUT', sector: 'PROBE-C2', sev: 'CRITICAL', age: '01:03', detail: 'Complete signal loss. Last known position: 88° / 4.2 AU. Recovery protocol initiated.' },
    ...(extra ? [{ id: 'ANX-0042', type: 'PARTICLE EVENT', sector: 'GRID-D1', sev: 'WARNING', age: '00:02', detail: 'New particle burst event. Monitoring in progress.' }] : [])],

    footerText: 'SECTOR-ALPHA MONITORING ARRAY // 8 PROBES ACTIVE // RELAY-01 // 3S REFRESH',
    ring1Label: 'COVERAGE',
    ring2Label: 'QUALITY',
    ring3Label: 'SIG LOCK',
    statsRows: [
    { label: 'SCAN RANGE', value: '4.2 AU' },
    { label: 'SAMPLE RATE', value: '5 MIN' },
    { label: 'DATA RATE', value: '4.7 TB/S' },
    { label: 'UPTIME', value: '99.3%' },
    { label: 'LAST ANOMALY', value: new Date().toLocaleTimeString('en-GB', { hour12: false }) }],

    systemModules: [
    { name: 'RELAY-01', status: 'ACTIVE', detail: 'hub' },
    { name: 'PROBE ARRAY', status: 'WARNING', detail: 'degraded' },
    { name: 'SCAN ENGINE', status: 'ACTIVE', detail: 'running' },
    { name: 'DATA CORE', status: 'ACTIVE', detail: 'synced' },
    { name: 'COMMS', status: 'SCANNING', detail: 'sweep' },
    { name: 'POWER GRID', status: 'ACTIVE', detail: 'nominal' }],

    systemModulesTitle: 'SYSTEM MODULES',
    resourceLabels: ['CPU LOAD', 'DATA BUFFER', 'BANDWIDTH', 'POWER DRAW'],
    diagnosticChecks: [
    { label: 'SENSOR ARRAY', result: 'PASS' },
    { label: 'RELAY COMMS', result: 'PASS' },
    { label: 'DATA INTEGRITY', result: 'WARN' },
    { label: 'POWER REGULATION', result: 'PASS' },
    { label: 'MAGNETIC SHIELDING', result: 'FAIL' }],

    diagnosticTitle: 'FULL SYSTEM DIAGNOSTIC'
  }
};
function ageToProgress(age) {
  const [h, m] = age.split(':').map(Number);
  return Math.min(100, Math.round((h * 60 + m) / 90 * 100));
}
function getResources(tick) {
  return [
  Math.min(97, 45 + tick % 7 * 3),
  Math.min(97, 76 + tick % 5),
  Math.min(97, 60 + tick % 9 * 2),
  Math.min(97, 90 + tick % 3)];

}
const RESULT_VARIANT = {
  PASS: 'ACTIVE',
  WARN: 'WARNING',
  FAIL: 'CRITICAL'
};
function useNarrow(threshold = 900) {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < threshold
  );
  useEffect(() => {
    const handle = () => setNarrow(window.innerWidth < threshold);
    window.addEventListener('resize', handle, { passive: true });
    return () => window.removeEventListener('resize', handle);
  }, [threshold]);
  return narrow;
}
// ── Component ─────────────────────────────────────────────────────────────
export function ChartsContent() {
  const { theme, toggleTheme } = useTheme();
  const narrow = useNarrow();
  const [tick, setTick] = useState(0);
  const [offsets, setOffsets] = useState([0, 0, 0]);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [diagOpen, setDiagOpen] = useState(false);
  const [diagSteps, setDiagSteps] = useState([]);
  const [diagRunKey, setDiagRunKey] = useState(0);
  const cfg = THEMES['sci-fi'];
  // Capture original theme on mount, restore it on unmount
  const prevThemeRef = useRef(null);
  useEffect(() => {
    prevThemeRef.current = document.documentElement.getAttribute('data-theme');
    return () => {
      if (prevThemeRef.current) {
        document.documentElement.setAttribute('data-theme', prevThemeRef.current);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    };
  }, []);
  // Apply theme whenever selection changes
  useEffect(() => {
    if (cfg.htmlTheme) {
      document.documentElement.setAttribute('data-theme', cfg.htmlTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [cfg.htmlTheme]);
  // Live tick + data jitter
  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setOffsets([
      Math.round((Math.random() - 0.5) * 4),
      Math.round((Math.random() - 0.5) * 3),
      Math.round((Math.random() - 0.5) * 3)]
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);
  // Diagnostic animation — runs sequentially through each check
  useEffect(() => {
    if (!diagOpen) {setDiagSteps([]);return;}
    const checks = cfg.diagnosticChecks;
    setDiagSteps(Array(checks.length).fill(0));
    let step = 0,progress = 0;
    const id = setInterval(() => {
      progress += 8;
      if (progress >= 100) {
        setDiagSteps((prev) => {const n = [...prev];n[step] = 100;return n;});
        step++;progress = 0;
        if (step >= checks.length) clearInterval(id);
      } else {
        setDiagSteps((prev) => {const n = [...prev];n[step] = progress;return n;});
      }
    }, 40);
    return () => clearInterval(id);
  }, [diagOpen, diagRunKey]);
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
  // Live-jittered last data point
  const seriesA = { ...cfg.seriesA, data: cfg.seriesA.data.map((v, i) => i === cfg.seriesA.data.length - 1 ? v + offsets[0] : v) };
  const seriesB = { ...cfg.seriesB, data: cfg.seriesB.data.map((v, i) => i === cfg.seriesB.data.length - 1 ? v + offsets[1] : v) };
  const seriesC = { ...cfg.seriesC, data: cfg.seriesC.data.map((v, i) => i === cfg.seriesC.data.length - 1 ? v + offsets[2] : v) };
  const liveA = seriesA.data[seriesA.data.length - 1];
  const liveB = seriesB.data[seriesB.data.length - 1];
  const scanCoverage = 94 + (tick % 3 === 0 ? 0 : tick % 3 === 1 ? 1 : -1);
  const anomalyCount = liveA > 27 ? 4 : 3;
  const extraAnomaly = anomalyCount > 3;
  const ring1Val = scanCoverage;
  const ring2Val = 87;
  const ring3Val = 91;
  const resources = getResources(tick);
  return <><div style={


    {
      minHeight: '100vh',
      background: 'var(--background)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-mono)'
    }}><header style={


      {
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
        flexShrink: 0
      }}><Link to={

        "/showcase"} style={
        { textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.08em', flexShrink: 0 }} onMouseEnter={
        (e) => e.currentTarget.style.color = 'var(--color-green)'} onMouseLeave={
        (e) => e.currentTarget.style.color = 'var(--text-muted)'}>{
          cfg.backLabel}</Link><span style={

        { color: 'var(--border)', flexShrink: 0 }}>│</span><span style={
        { color: 'var(--color-green)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textShadow: 'var(--text-glow-green)', flexShrink: 0 }}>{
          cfg.title}</span>{

        !narrow && <span style={
        { color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.08em', flexShrink: 0 }}>{
          cfg.subtitle}</span>}<div style={


        { flex: 1 }} /><Badge variant={
        "ACTIVE"}>{cfg.badge1Label}</Badge>{
        !narrow && <Badge variant={
        cfg.badge2Variant(anomalyCount)}>{
          cfg.badge2Label(anomalyCount)}</Badge>}<span style={


        { color: 'var(--color-green)', fontSize: '0.65rem', letterSpacing: '0.1em', textShadow: 'var(--text-glow-green)', flexShrink: 0, opacity: tick % 2 === 0 ? 1 : 0.5, transition: 'opacity 0.3s' }}>{
          timeStr}</span></header>


      <div style={
      { flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}><div style={


        {
          background: 'var(--background)',
          padding: '0.75rem 1rem',
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: '0.75rem'
        }}><StatCard label={
          cfg.stat1Label} value={cfg.stat1Value(tick)} sublabel={cfg.stat1Sub(tick)} variant={cfg.stat1Variant(tick)} /><StatCard label={
          cfg.stat2Label} value={cfg.stat2Value(liveA)} sublabel={cfg.stat2Sub} variant={cfg.stat2Variant(liveA)} /><StatCard label={
          cfg.stat3Label} value={cfg.stat3Value(liveB)} sublabel={cfg.stat3Sub} variant={"ACTIVE"} /><StatCard label={
          cfg.stat4Label} value={cfg.stat4Value(scanCoverage)} sublabel={cfg.stat4Sub} variant={"ACTIVE"} /></div>

        <div style={

        {
          flex: 1,
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : '260px 1fr 220px',
          gap: '1px',
          background: 'var(--border)'
        }}><div style={

          { background: 'var(--background)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}><Panel notch={
            "sm"}><PanelHeader><PanelTitle>{

                  cfg.profileTitle}</PanelTitle><div style={
                { marginLeft: 'auto' }}><Badge variant={"SCANNING"}>LIVE</Badge></div></PanelHeader><PanelContent style={

              { display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}><RadarChart data={
                cfg.profileAxes} variant={"ACTIVE"} size={220} showValues={true} /></PanelContent></Panel><Panel notch={


            "sm"}><PanelHeader><PanelTitle>ARRAY HEALTH</PanelTitle></PanelHeader><PanelContent><div style={


                { display: 'flex', justifyContent: 'space-around', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}><ProgressRing value={
                  ring1Val} label={cfg.ring1Label} variant={"ACTIVE"} size={72} /><ProgressRing value={
                  ring2Val} label={cfg.ring2Label} variant={ring2Val < 75 ? 'WARNING' : 'ACTIVE'} size={72} /><ProgressRing value={
                  ring3Val} label={cfg.ring3Label} variant={"ACTIVE"} size={72} /></div><div style={

                { display: 'flex', flexDirection: 'column' }}>{
                  cfg.statsRows.map((item, i, arr) => <div key={
                  item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}><span style={
                    { fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{item.label}</span><span style={
                    { fontSize: '0.72rem', color: 'var(--color-green)', textShadow: 'var(--text-glow-green)', fontWeight: 600, letterSpacing: '0.04em' }}>{item.value}</span></div>

                  )}</div></PanelContent></Panel>



            <Panel notch={
            "sm"}><PanelHeader><PanelTitle>SYS RESOURCES</PanelTitle><div style={


                { marginLeft: 'auto' }}><Badge variant={"ACTIVE"}>LIVE</Badge></div></PanelHeader><PanelContent><div style={


                { display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>{
                  cfg.resourceLabels.map((label, i) => <Progress key={

                  label} label={
                  label} value={
                  resources[i]} showValue={
                  true} />

                  )}</div></PanelContent></Panel></div>




          <div style={
          { background: 'var(--background)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}><Panel notch={
            "md"} style={{ flex: 1 }}><PanelHeader><PanelTitle>{

                  cfg.centerTitle}</PanelTitle><div style={
                { marginLeft: 'auto' }}><Badge variant={"ACTIVE"}>{cfg.centerBadge}</Badge></div></PanelHeader><PanelContent style={

              { padding: 0 }}><Tabs defaultValue={
                "timeseries"}><TabsList style={
                  { padding: '0 1rem', background: 'var(--surface-raised)' }}><TabsTrigger value={
                    "timeseries"}>TIMESERIES</TabsTrigger><TabsTrigger value={
                    "heatmap"}>HEATMAP</TabsTrigger><TabsTrigger value={
                    "signals"}>SIGNALS</TabsTrigger><TabsTrigger value={
                    "coverage"}>COVERAGE</TabsTrigger></TabsList><TabsContent value={

                  "timeseries"} style={{ margin: 0, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}><div><LineChart series={


                      [seriesA, seriesB, seriesC]} labels={
                      TIMES} title={
                      cfg.timeseriesTitle} height={
                      220} showArea={
                      false} showLegend={
                      true} animated={
                      false} style={
                      { width: '100%' }} /><div style={

                      { display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(3, 1fr)', gap: '0.625rem', marginTop: '1rem' }}>{
                        cfg.timeStatLabels.map((label, i) => <div key={
                        label} style={{ padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}><div style={
                          { fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>{label}</div><div style={
                          { fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-green)', textShadow: 'var(--text-glow-green)', letterSpacing: '0.02em' }}>{cfg.timeStatValues[i]}</div></div>

                        )}</div></div><div style={


                    { borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}><NodeGraph nodes={

                      cfg.networkNodes} edges={
                      cfg.networkEdges} directed={
                      true} title={
                      cfg.networkTitle} height={
                      320} style={
                      { width: '100%' }} /></div></TabsContent><TabsContent value={



                  "heatmap"} style={{ margin: 0, padding: '1rem' }}><Heatmap data={

                    HEATMAP_DATA.flat()} columns={
                    24} rowLabels={
                    cfg.heatRowLabels} colLabels={
                    cfg.heatColLabels} title={
                    cfg.heatmapTitle} variant={
                    "GREEN"} style={
                    { width: '100%' }} /></TabsContent><TabsContent value={


                  "signals"} style={{ margin: 0, padding: '1rem' }}><BarChart data={

                    cfg.signalData} orientation={
                    "horizontal"} variant={
                    cfg.signalVariant} title={
                    cfg.signalTitle} style={
                    { width: '100%' }} /></TabsContent>


                  <TabsContent value={
                  "coverage"} style={{ margin: 0, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}><div style={
                    { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', alignSelf: 'flex-start' }}>{
                      cfg.coverageTitle} // DIRECTIONAL SWEEP COVERAGE</div><RadarChart data={

                    cfg.coverageAxes} variant={"ACTIVE"} size={280} showValues={true} /><div style={
                    { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', width: '100%' }}>{
                      cfg.coverageAxes.map((a) => <div key={
                      a.axis} style={{ textAlign: 'center', padding: '0.4rem', background: 'var(--surface)', border: '1px solid var(--border)' }}><div style={
                        { fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{a.axis}</div><div style={
                        { fontSize: '0.85rem', fontWeight: 700, color: a.value < 70 ? 'var(--color-amber)' : 'var(--color-green)', textShadow: a.value < 70 ? 'var(--text-glow-amber)' : 'var(--text-glow-green)' }}>{a.value}%</div></div>

                      )}</div></TabsContent></Tabs></PanelContent></Panel></div>






          <div style={
          { background: 'var(--background)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto' }}><Panel notch={
            "sm"}><PanelHeader><PanelTitle>{
                  cfg.rightChartTitle}</PanelTitle></PanelHeader><PanelContent style={
              { padding: 0 }}><BarChart data={
                cfg.annualData} orientation={"vertical"} variant={"ACTIVE"} style={{ width: '100%' }} /></PanelContent></Panel>


            <Panel notch={
            "sm"}><PanelHeader><PanelTitle>{

                  cfg.systemModulesTitle}</PanelTitle><div style={
                { marginLeft: 'auto' }}><Badge variant={"SCANNING"}>LIVE</Badge></div></PanelHeader><PanelContent style={

              { padding: 0 }}><StatusGrid systems={
                cfg.systemModules} columns={1} /></PanelContent></Panel>


            <Panel notch={
            "sm"}><PanelHeader><PanelTitle>{

                  cfg.anomalyPanelTitle}</PanelTitle><div style={
                { marginLeft: 'auto' }}><Badge variant={
                  extraAnomaly ? 'WARNING' : 'SCANNING'}>{anomalyCount} OPEN</Badge></div></PanelHeader><PanelContent><div style={



                { display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{
                  cfg.anomalies(extraAnomaly).map((a) => <button key={

                  a.id} onClick={
                  () => setSelectedAnomaly(a)} style={
                  {
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0.625rem',
                    background: 'var(--surface-raised)',
                    border: `1px solid ${a.sev === 'CRITICAL' ? 'var(--color-red)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    transition: 'border-color 0.15s, background 0.15s'
                  }} onMouseEnter={
                  (e) => {e.currentTarget.style.background = 'var(--surface)';e.currentTarget.style.borderColor = 'var(--color-green)';}} onMouseLeave={
                  (e) => {e.currentTarget.style.background = 'var(--surface-raised)';e.currentTarget.style.borderColor = a.sev === 'CRITICAL' ? 'var(--color-red)' : 'var(--border)';}}><div style={
                    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}><span style={
                      { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{a.id}</span><Badge variant={
                      a.sev}>{a.sev}</Badge></div><div style={

                    { fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>{a.type}</div><div style={
                    { fontSize: '0.57rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: '2px' }}>{a.sector} // +{a.age}</div></button>

                  )}</div></PanelContent></Panel></div></div></div>






      <footer style={

      {
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
        flexShrink: 0
      }}><span style={
        { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{
          cfg.footerText}</span><div style={

        { flex: 1 }} /><button onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', padding: '0.15rem 0.5rem', letterSpacing: '0.06em', transition: 'all 0.15s' }}>{theme === 'dark' ? 'LIGHT' : 'DARK'}</button><Button variant={
        "OUTLINE"} size={"SM"} onClick={() => setDiagOpen(true)}>RUN DIAGNOSTICS</Button><Badge variant={

        "ACTIVE"}>SYS ONLINE</Badge></footer></div>


    <Dialog open={
    selectedAnomaly !== null} onOpenChange={(open) => {if (!open) setSelectedAnomaly(null);}}><DialogContent>{

        selectedAnomaly && <><DialogHeader><DialogTitle><span style={



              { color: 'var(--text-muted)', fontWeight: 400 }}>{selectedAnomaly.id} //</span> {
              selectedAnomaly.type}</DialogTitle></DialogHeader><DialogBody><div style={




            { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>{
              [
              { label: 'SECTOR', value: selectedAnomaly.sector },
              { label: 'SEVERITY', value: <Badge variant={selectedAnomaly.sev}>{selectedAnomaly.sev}</Badge> },
              { label: 'DETECTED', value: `+${selectedAnomaly.age} AGO` },
              { label: 'STATUS', value: <Badge variant={"SCANNING"}>OPEN</Badge> }].
              map((row) => <div key={
              row.label} style={{ padding: '0.5rem 0.625rem', background: 'var(--surface)', border: '1px solid var(--border)' }}><div style={
                { fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.25rem' }}>{row.label}</div><div style={
                { fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.value}</div></div>

              )}</div>

            <div style={
            { padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '1.25rem' }}><div style={
              { fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>EVENT LOG</div><p style={
              { margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selectedAnomaly.detail}</p></div>

            <div style={
            { marginBottom: '1.25rem' }}><Progress label={

              "ELAPSED TIME SINCE DETECTION"} value={
              ageToProgress(selectedAnomaly.age)} showValue={
              true} /></div>


            <div style={
            { fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>AFFECTED SYSTEMS</div><StatusGrid systems={

            cfg.systemModules.filter((_, i) => i < 3)} columns={
            1} /></DialogBody><DialogFooter><DialogClose asChild={



            true}><Button variant={
              "OUTLINE"} size={"SM"}>ACKNOWLEDGE</Button></DialogClose><Button variant={


            "EXEC"} size={
            "SM"} onClick={
            () => setSelectedAnomaly((prev) => prev ? { ...prev, sev: 'CRITICAL' } : prev)}>ESCALATE</Button></DialogFooter></>}</DialogContent></Dialog>







    <Dialog open={
    diagOpen} onOpenChange={setDiagOpen}><DialogContent><DialogHeader><DialogTitle>{


            cfg.diagnosticTitle}</DialogTitle></DialogHeader><DialogBody><div style={


          { display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{
            cfg.diagnosticChecks.map((check, i) => {
              const step = diagSteps[i] ?? 0;
              const done = step >= 100;
              return <div key={
              check.label}><div style={
                { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}><span style={
                  { fontSize: '0.65rem', color: done ? 'var(--text-secondary)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>{
                    check.label}</span>{

                  done && <Badge variant={RESULT_VARIANT[check.result]}>{check.result}</Badge>}</div><Progress value={

                step} showValue={false} /></div>;


            })}</div>

          {
          diagSteps.length === cfg.diagnosticChecks.length && diagSteps.every((s) => s >= 100) && <div style={
          { marginTop: '1.5rem', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}><div style={
            { fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>DIAGNOSTIC COMPLETE</div><div style={
            { display: 'flex', justifyContent: 'center', gap: '1rem' }}>{
              ['PASS', 'WARN', 'FAIL'].map((r) => {
                const count = cfg.diagnosticChecks.filter((c) => c.result === r).length;
                return <div key={
                r} style={{ textAlign: 'center' }}><Badge variant={
                  RESULT_VARIANT[r]}>{r}</Badge><div style={
                  { fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-green)', marginTop: '0.25rem' }}>{count}</div></div>;


              })}</div></div>}</DialogBody><DialogFooter><Button variant={





          "GHOST"} size={"SM"} onClick={() => setDiagOpen(false)}>CLOSE</Button><Button variant={


          "EXEC"} size={
          "SM"} onClick={
          () => setDiagRunKey((k) => k + 1)}>RE-RUN</Button></DialogFooter></DialogContent></Dialog></>;







}