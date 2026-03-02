export const C = {
    bg: '#070d14',
    bgCard: '#0b1520',
    bgNode: '#0f1e2e',
    border: 'rgba(143, 240, 255, 0.2)',
    borderBright: 'rgba(143, 240, 255, 0.5)',
    accent: '#8ff0ff',
    accentDim: 'rgba(143, 240, 255, 0.4)',
    accentFaint: 'rgba(143, 240, 255, 0.12)',
    gold: '#c8a96e',
    goldDim: 'rgba(200, 169, 110, 0.4)',
    goldFaint: 'rgba(200, 169, 110, 0.1)',
    danger: '#e07070',
    dangerFaint: 'rgba(224, 112, 112, 0.1)',
    dangerDim: 'rgba(224, 112, 112, 0.35)',
    success: '#70e0a0',
    successFaint: 'rgba(112, 224, 160, 0.1)',
    successDim: 'rgba(112, 224, 160, 0.35)',
    textPrimary: '#eef4f8',
    textMuted: '#6a8a9a',
    textLabel: '#8ff0ff',
    white: '#ffffff',
}

export function DiagramArrowDefs() {
    return (
        <defs>
            <marker id="arrowCyan" markerWidth="8"
                markerHeight="8" refX="6" refY="3"
                orient="auto">
                <path d="M 0 0 L 6 3 L 0 6"
                    stroke={C.accent} strokeWidth="1"
                    fill="none" />
            </marker>
            <marker id="arrowGold" markerWidth="8"
                markerHeight="8" refX="6" refY="3"
                orient="auto">
                <path d="M 0 0 L 6 3 L 0 6"
                    stroke={C.gold} strokeWidth="1"
                    fill="none" />
            </marker>
            <marker id="arrowSuccess" markerWidth="8"
                markerHeight="8" refX="6" refY="3"
                orient="auto">
                <path d="M 0 0 L 6 3 L 0 6"
                    stroke={C.success} strokeWidth="1"
                    fill="none" />
            </marker>
            <marker id="arrowDanger" markerWidth="8"
                markerHeight="8" refX="6" refY="3"
                orient="auto">
                <path d="M 0 0 L 6 3 L 0 6"
                    stroke={C.danger} strokeWidth="1"
                    fill="none" />
            </marker>
        </defs>
    )
}
