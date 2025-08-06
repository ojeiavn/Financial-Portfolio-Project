module.exports = {
    content: ['./src/**/*.{js, jsx, ts, tsx}'],
    theme: {
        extend: {
            colors: {
                'bg-light': '#48376C',
                'bg-mid': 'var(--bg-mid)',
                'bg-dark': 'var(--bg-dark)',
                'accent-green': 'var(--accent-green)',
            },
            spacing: {
                xs: 'var(--space-xs)',
                sm: 'var(--space-sm)',
                md: 'var(--space-md)',
                lg: 'var(--space-lg)',
            },
            borderRadius: {
                md: 'var(--radius-md)',
            },
            fontFamily: {
                main: "var(--font-main)", // note: this might not work perfectly; better to list fonts normally
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar')
    ],
}