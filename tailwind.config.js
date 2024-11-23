/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './contact.html',
      './about.html',
      './resume.html',
      './projects.html',
      './mywork.html',
  ],
  theme: {
    extend: {
        colors:{
            'pink': '#e5c5d4',
            'green': '#738a5c',
            'red': '#900820',
            'purple': '#ddd6fe'
        }
    },
  },
  plugins: [],
}

