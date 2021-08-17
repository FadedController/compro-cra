const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/**/*.tsx",
    "./src/*.tsx",
    "./src/**/*.tsx",
    "./src/**/**/*.tsx",
  ],
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
        darkBlue: "#083041",
        lightBlue: "#67A2CD",
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
