module.exports = {
  purge: {
    content: [
      "./src/**/*.svelte",
    ],
  },
  options: {
    safelist: [
      /data-theme$/,
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'halloween', // first one will be the default them
    ],
  },
}
