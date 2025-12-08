import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#5b5fc7',
                    600: '#4d51b3',
                    700: '#3f428f',
                    hover: '#4a4db5',
                },
            },
        },
    },
    plugins: [],
};
export default config;
