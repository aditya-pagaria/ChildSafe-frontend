module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        60: '60',
        100: '100'
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        roboto: ['Roboto']
      },
      colors: {
        newblue: '#0859f7',
        newdarkblue: '#2d26b9',
        jams_purple: '#4244B4',
        jams_light_purple: '#5A6EAD',
        jams_dark_purple: '#383B98',
        jams_red: '#FF5E55',
        jams_blue: '#3B7DED',
        jams_notify_purple: '#5C60CD',
        jams_dark_blue: '#1e1e38',
        discord_violet: '#4362cc',
        discord_white: '#f4f8fc',
        jams_green: '#39AA68',
        jams_yellow: '#F9C531',
        jams_input_gray: '#2B2D4F',
        jams_icon_gray: '#313152'
      },
      inset: {
        '2/5': '40%',
        '3/8': '37.5%',
        '1/8': '12.5%',
        11: '11%',
        33: '33%'
      },
      width: {
        26: '6.5rem',
        '5/7': '71.4285714%'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['hover'],
      borderColor: ['hover', 'disabled']
    }
  },
  plugins: []
}
