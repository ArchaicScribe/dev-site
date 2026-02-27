# Cyberpunk Portfolio

A dark, sleek, and cyberpunk-themed personal portfolio website for Backend/Systems developers. Built with React + Vite, featuring terminal interfaces, glowing neon accents, scan lines, and monospace typography.

## Features

- **Cyberpunk Aesthetic**: Dark theme with neon green, cyan, and purple accents
- **Terminal UI**: System info displayed in terminal-style cards
- **Smooth Animations**: Framer Motion powered animations with reduced motion support
- **Lazy Loading**: Code splitting for optimal performance
- **Accessibility**: WCAG AA compliance, keyboard navigation, skip links
- **Responsive**: Mobile-first design that scales beautifully
- **Mouse Tracking**: Gradient that follows cursor movement

## Tech Stack

- React 18
- Vite 5
- Framer Motion 11
- CSS Variables for theming

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Nav.jsx       # Fixed navigation
│   ├── Hero.jsx      # Hero section with typewriter
│   ├── About.jsx     # About section with terminal
│   ├── Skills.jsx    # Tech stack display
│   ├── Projects.jsx  # Project cards grid
│   ├── Contact.jsx   # Contact form & social links
│   └── Footer.jsx    # Footer
├── hooks/
│   ├── useTypewriter.js    # Typewriter effect
│   ├── useMousePosition.js # Mouse tracking
│   └── useReducedMotion.js # Motion preference
├── styles/
│   ├── variables.css # CSS custom properties
│   └── global.css    # Global styles
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

Or connect your GitHub repository for automatic deployments.

## Customization

1. Update personal info in `Hero.jsx` and `About.jsx`
2. Add your projects to `Projects.jsx`
3. Update social links in `Contact.jsx`
4. Modify colors in `variables.css`

## License

MIT
