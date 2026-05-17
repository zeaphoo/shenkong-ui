import React from 'react'


import { BarChartContent } from '@/pages/components/bar-chart-content'

const metadata = {
  title: 'BAR CHART',
  description: 'CSS-only bar chart. No charting library dependency. Supports horizontal and vertical orientations with four color variants.',
  alternates: { canonical: '/components/bar-chart' },
}

export default function Page() {
  return React.createElement(BarChartContent, {} )
}
