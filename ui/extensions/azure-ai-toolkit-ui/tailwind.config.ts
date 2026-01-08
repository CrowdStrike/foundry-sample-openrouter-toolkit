import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [
    // Using Falcon Shoelace for theming instead of Toucan Base
  ],
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './src/index.html',
    // Include Shoelace components for proper class detection
    './node_modules/@shoelace-style/shoelace/dist/**/*.js',
    './node_modules/@crowdstrike/falcon-shoelace/dist/**/*.js'
  ],
  theme: {
    extend: {
      // Custom extensions can go here
      spacing: {
        'xs': '3px',
        'sm': '5px', 
        'md': '10px',
        'lg': '14px',
        'xl': '19px'
      },
      transitionDuration: {
        '200': '200ms'
      }
    }
  },
  plugins: [
    // Add any additional Tailwind plugins here if needed
  ]
};

export default config;
