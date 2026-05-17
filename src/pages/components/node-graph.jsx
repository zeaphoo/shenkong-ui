import React from 'react'


import { NodeGraphContent } from '@/pages/components/node-graph-content'

const metadata = {
  title: 'NODE GRAPH',
  description: 'SVG node-edge graph for visualizing networks, pipelines, and system topologies. Supports directed arrowheads, animated marching-ants edges, per-node status colors, and hover highlights.',
  alternates: { canonical: '/components/node-graph' },
}

export default function Page() {
  return React.createElement(NodeGraphContent, {} )
}
