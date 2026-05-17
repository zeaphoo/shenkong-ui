import React from 'react'


import { StatCardContent } from '@/pages/components/stat-card-content'

const metadata = {
  title: 'STAT CARD',
  description: 'Metric tile for dashboards. Displays a primary value, contextual label, optional delta trend indicator, and a sublabel status line.',
  alternates: { canonical: '/components/stat-card' },
}

export default function Page() {
  return React.createElement(StatCardContent, {} )
}
