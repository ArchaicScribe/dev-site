import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#0d2137',
    primaryTextColor: '#8ff0ff',
    primaryBorderColor: '#4fc3dc',
    lineColor: '#4fc3dc',
    secondaryColor: '#0a1a2e',
    tertiaryColor: '#0d2137',
    background: '#070d14',
    mainBkg: '#0d2137',
    nodeBorder: '#4fc3dc',
    clusterBkg: '#0a1a2e',
    titleColor: '#8ff0ff',
    edgeLabelBackground: '#0d2137',
    fontFamily: "'Share Tech Mono', monospace",
  },
  flowchart: { htmlLabels: true, curve: 'basis' },
  sequence: { actorMargin: 80, mirrorActors: false },
})

let diagramCounter = 0

export function Diagram({ children }) {
  const ref = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const id = useRef(`diagram-${++diagramCounter}`)

  useEffect(() => {
    const definition = typeof children === 'string' ? children : children?.props?.children ?? ''
    if (!definition.trim()) return

    mermaid.render(id.current, definition.trim())
      .then(({ svg }) => setSvg(svg))
      .catch(err => setError(err.message))
  }, [children])

  if (error) {
    return (
      <pre style={{ color: '#d4743a', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', padding: '1rem', border: '1px solid rgba(212, 116, 58, 0.3)', background: 'rgba(212, 116, 58, 0.05)' }}>
        Diagram error: {error}
      </pre>
    )
  }

  return (
    <div
      ref={ref}
      style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(13, 33, 55, 0.6)', border: '1px solid rgba(79, 195, 220, 0.2)', overflowX: 'auto' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Diagram
