import React from 'react'


import { LineChartContent } from '@/pages/components/line-chart-content'

const metadata = {
  title: 'LINE CHART',
  description: 'SVG line chart with multi-series support, animated draw-on effect, optional area fill, grid lines, and an automatic legend.',
  alternates: { canonical: '/components/line-chart' },
}

export default function Page() {
  return React.createElement(LineChartContent, {} )
}
