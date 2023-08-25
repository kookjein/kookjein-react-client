/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        120: "30rem",
        128: "32rem",
      },
      fontFamily: {
        poppins: ["Poppins"],
        nanum: ["Nanum Gothic"],
      },
    },
  },
  plugins: [],
};
