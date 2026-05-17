import React from 'react'


import { RadarChartContent } from '@/pages/components/radar-chart-content'

const metadata = {
  title: 'RADAR CHART',
  description: 'SVG radar (spider) chart with configurable axes, concentric grid polygons, fade-in animation, and four color variants. Values normalized to 0–100.',
  alternates: { canonical: '/components/radar-chart' },
}

export default function Page() {
  return React.createElement(RadarChartContent, {} )
}
