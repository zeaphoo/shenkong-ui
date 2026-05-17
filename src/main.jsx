import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/styles/globals.css'
import App from './App.jsx'

// Pages with DocsShell layout
import Home from './pages/home-content.jsx'
import Introduction from './pages/docs/introduction-content.jsx'
import Installation from './pages/docs/installation-content.jsx'
import Theming from './pages/docs/theming-content.jsx'
import ShowcaseIndex from './pages/showcase/index.jsx'

// Fullscreen showcase pages (no shell)
import SciFiFullscreen from './pages/fullscreen/sci-fi.jsx'
import ChartsFullscreen from './pages/fullscreen/charts.jsx'
import MissionControlFullscreen from './pages/fullscreen/mission-control.jsx'

// Component pages
import AlertPage from './pages/components/alert.jsx'
import BadgePage from './pages/components/badge.jsx'
import BarChartPage from './pages/components/bar-chart.jsx'
import BreadcrumbPage from './pages/components/breadcrumb.jsx'
import ButtonPage from './pages/components/button.jsx'
import CardPage from './pages/components/card.jsx'
import CheckboxPage from './pages/components/checkbox.jsx'
import DialogPage from './pages/components/dialog.jsx'
import GridPage from './pages/components/grid.jsx'
import HeatmapPage from './pages/components/heatmap.jsx'
import InputPage from './pages/components/input.jsx'
import KbdPage from './pages/components/kbd.jsx'
import LabelPage from './pages/components/label.jsx'
import LineChartPage from './pages/components/line-chart.jsx'
import NodeGraphPage from './pages/components/node-graph.jsx'
import PanelPage from './pages/components/panel.jsx'
import ProgressPage from './pages/components/progress.jsx'
import ProgressRingPage from './pages/components/progress-ring.jsx'
import RadarChartPage from './pages/components/radar-chart.jsx'
import SelectPage from './pages/components/select.jsx'
import SeparatorPage from './pages/components/separator.jsx'
import SkeletonPage from './pages/components/skeleton.jsx'
import SpinnerPage from './pages/components/spinner.jsx'
import StatCardPage from './pages/components/stat-card.jsx'
import StatusGridPage from './pages/components/status-grid.jsx'
import SwitchPage from './pages/components/switch.jsx'
import TabsPage from './pages/components/tabs.jsx'
import TerminalPage from './pages/components/terminal.jsx'
import TextareaPage from './pages/components/textarea.jsx'
import ToastPage from './pages/components/toast.jsx'
import TooltipPage from './pages/components/tooltip.jsx'
import TypographyPage from './pages/components/typography.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Fullscreen routes (no sidebar/topbar) */}
        <Route path="showcase/sci-fi" element={<SciFiFullscreen />} />
        <Route path="showcase/charts" element={<ChartsFullscreen />} />
        <Route path="showcase/mission-control" element={<MissionControlFullscreen />} />

        {/* All other routes use DocsShell layout */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="docs/introduction" element={<Introduction />} />
          <Route path="docs/installation" element={<Installation />} />
          <Route path="docs/theming" element={<Theming />} />
          <Route path="showcase" element={<ShowcaseIndex />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/bar-chart" element={<BarChartPage />} />
          <Route path="components/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/dialog" element={<DialogPage />} />
          <Route path="components/grid" element={<GridPage />} />
          <Route path="components/heatmap" element={<HeatmapPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/kbd" element={<KbdPage />} />
          <Route path="components/label" element={<LabelPage />} />
          <Route path="components/line-chart" element={<LineChartPage />} />
          <Route path="components/node-graph" element={<NodeGraphPage />} />
          <Route path="components/panel" element={<PanelPage />} />
          <Route path="components/progress" element={<ProgressPage />} />
          <Route path="components/progress-ring" element={<ProgressRingPage />} />
          <Route path="components/radar-chart" element={<RadarChartPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/separator" element={<SeparatorPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
          <Route path="components/stat-card" element={<StatCardPage />} />
          <Route path="components/status-grid" element={<StatusGridPage />} />
          <Route path="components/switch" element={<SwitchPage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/terminal" element={<TerminalPage />} />
          <Route path="components/textarea" element={<TextareaPage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/typography" element={<TypographyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
