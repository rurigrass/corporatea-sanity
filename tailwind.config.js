/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Configure your color palette here
      white: "#FFFFFF",
      red: "#EE0000",
      green: {
        green: "#00AB55",
        shady: "#008746",
      },
      pink: {
        tintier: "#F4A7D2",
        tintish: "#E94EA5",
      },
      blue: {
        normal: "#003366",
        tintish: "#335C85",
        tintiest: "#CCD6E0",
        light: "#E5EAEF",
        shady: "#001A4D",
      },
      gray: {
        gray: "#8293A3",
        grayer: "#D9D9D9",
        light: "#F2F2F2",
      },
    },
    // fontSize: {
    //   xxs: ["0.6rem", "0.8rem"],
    //   xs: ["0.75rem", "1rem"],
    // },
    extend: {
      gridTemplateColumns: {
        teabox: "min-content auto",
      },
      gridTemplateRows: {
        teabox: "auto min-content",
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      },
    },
  },
  plugins: [],
};
