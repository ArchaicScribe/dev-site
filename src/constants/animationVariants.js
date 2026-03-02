export const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
}

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const viewportConfig = {
    once: true,
    amount: 0.2
}

export const transition = {
    duration: 0.5,
    ease: 'easeOut'
}
