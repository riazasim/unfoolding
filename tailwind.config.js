const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ],
  prefix: 'tw-',
  theme: {
    screens: {
      'min-sm': '576px',
      'min-md': '768px',
      'min-lg': '992px',
      'min-xl': '1200px',
      'min-2xl': '1400px',
      'min-3xl': '1600px',
      'max-3xl': { max: '1600px' },
      'max-2xl': { max: '1400px' },
      'max-xl': { max: '1200px' },
      'max-lg': { max: '992px' },
      'max-md': { max: '768px' },
      'max-sm': { max: '576px' }
    },
    colors: {
      white: 'white',
      black: 'black',
      gray: '#83839C',
      body: '#F4F6F8',
      green: '#009C10',
      lightgray: '#DDDDDD',
      darkgray: '#423C3C',
      orange: '#F39C12',
      columnCell: '#595959',
      panelColor: '#696969',
      bordo: '#CC0000',
      transparent: 'transparent',
      primary: {
        light: 'var(--primary-light-color)',
        DEFAULT: 'var(--primary-color)',
        dark: 'var(--primary-dark-color)'
      },
      secondary: {
        light: 'var(--secondary-light-color)',
        DEFAULT: 'var(--secondary-color)',
        dark: 'var(--secondary-dark-color)'
      },
      danger: {
        light: 'var(--danger-light-color)',
        DEFAULT: 'var(--danger-color)',
        dark: 'var(--danger-dark-color)'
      },
      success: {
        light: 'var(--success-light-color)',
        DEFAULT: 'var(--success-color)',
        dark: 'var(--success-dark-color)'
      },
      info: {
        light: 'var(--info-light-color)',
        DEFAULT: 'var(--info-color)',
        dark: 'var(--info-dark-color)'
      },
      warning: {
        light: 'var(--warning-light-color)',
        DEFAULT: 'var(--warning-color)',
        dark: 'var(--warning-dark-color)'
      },
      muted: {
        light: 'var(--muted-light-color)',
        DEFAULT: 'var(--muted-color)',
        dark: 'var(--muted-dark-color)'
      },

      valid: 'var(--valid-color)',
      invalid: 'var(--invalid-color)'
    },
    extend: {
      height: {
        'max-content': 'max-content',
        'min-content': 'min-content',
      },
      backgroundColor: {
        'glass-sm': 'rgba(255, 255, 255, .5)',
        'glass': 'rgba(255, 255, 255, .6)',
        'glass-md': 'rgba(255, 255, 255, .7)',
        'glass-lg': 'rgba(255, 255, 255, .8)',
        'glass-xl': 'rgba(255, 255, 255, .9)',
        'mask-black-sm': 'rgba(0, 0, 0, .5)',
        'mask-black': 'rgba(0, 0, 0, .6)',
        'mask-black-md': 'rgba(0, 0, 0, .7)',
        'mask-black-lg': 'rgba(0, 0, 0, .8)',
        'mask-black-xl': 'rgba(0, 0, 0, .9)'
      },
      boxShadow: {
        material: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)'
      },
      borderRadius: {
        app: 'var(--app-border-radius)'
      },
      borderColor: (theme) => ({
        ...theme('colors'),
      }),
      minWidth: {
        '1/2': '50%',
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1600px'
      },
      maxWidth: {
        '1/2': '50%',
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1600px'
      },
      minHeight: {
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1600px'
      },
      maxHeight: {
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1600px'
      },
      outline: {
        'primary': ['1px solid var(--primary-color)', '1px'],
        'primary-2': ['2px solid var(--primary-color)', '1px'],
        'primary-3': ['3px solid var(--primary-color)', '1px']
      },
      gridTemplateColumns: {
        '1-minmax': 'repeat(1,minmax(0,minmax(min-content,max-content))',
        '2-minmax': 'repeat(2,minmax(0,minmax(min-content,max-content))',
        '3-minmax': 'repeat(3,minmax(0,minmax(min-content,max-content))',
        '4-minmax': 'repeat(4,minmax(0,minmax(min-content,max-content))',
        '5-minmax': 'repeat(5,minmax(0,minmax(min-content,max-content))',
        '6-minmax': 'repeat(6,minmax(0,minmax(min-content,max-content))',
      },
      gridTemplateRows: {
        '1-minmax': 'repeat(1,minmax(0,minmax(min-content,max-content))',
        '2-minmax': 'repeat(2,minmax(0,minmax(min-content,max-content))',
        '3-minmax': 'repeat(3,minmax(0,minmax(min-content,max-content))',
        '4-minmax': 'repeat(4,minmax(0,minmax(min-content,max-content))',
        '5-minmax': 'repeat(5,minmax(0,minmax(min-content,max-content))',
        '6-minmax': 'repeat(6,minmax(0,minmax(min-content,max-content))',
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ]
}
