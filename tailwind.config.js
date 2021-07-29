const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx", "./src/*.tsx", "./src/pages/*.tsx"],
  darkMode: false, // or 'media' or 'class',
  mode: "jit",
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      colors: {
        orange: colors.orange,
        lime: colors.lime,
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
