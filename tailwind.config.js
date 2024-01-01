/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-01 15:03:50
 * @Description: 
 * @FilePath: \bee-channel-front\tailwind.config.js
 */
import { nextui } from '@nextui-org/theme'


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'spread': '0 1px 2px 1px rgba(0, 0, 0, 0.1)',
        'white-lg': '0 20px 50px 5px rgba(255, 255, 255, 0.3)',
        'white-sm': '0 0 10px 1px rgba(255, 255, 255, 0.9)',
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            'primary': '#f2f2f2',
            'sd-background': '#ffffff',
            'sd-content': '#ffffff'
          }
        },
        dark: {
          colors: {
            'primary': '#3F3F46',
            'background': '#18181B',
            'sd-background': '#282828',
            'sd-content': '#1f1f1f'
          }
        },
      },
    })
  ],
}
