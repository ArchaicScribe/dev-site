export function SectionLoader() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                color: '#4fc3dc',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
            }}
        >
            <div style={{ width: '24px', height: '24px', border: '2px solid rgba(79, 195, 220, 0.3)', borderTopColor: '#4fc3dc', borderRadius: '0', animation: 'spin 1s linear infinite', marginRight: '1rem' }} />
            LOADING MODULE...
        </div>
    )
}

export default SectionLoader
