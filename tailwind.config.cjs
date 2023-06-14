/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '320px',  // 추가된 커스텀 반응형 사이즈 (예: 모바일 세로 모드)
        'sm': '640px',  // 기본 Tailwind 반응형 사이즈
        'md': '768px',  // 기본 Tailwind 반응형 사이즈
        'lg': '1024px', // 기본 Tailwind 반응형 사이즈
        'xl': '1280px', // 기본 Tailwind 반응형 사이즈
      },
      colors: {
        brand: '#f95c58'
      },
      backgroundImage: {
        banner: `url('/images/banner.png')`
      }
    },
   
  },
  plugins: [],
}

