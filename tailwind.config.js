const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    //Because we made a dynamic class with the label we need to add those clases
    // to the safe list so the purge does not remove that
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-50`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-100`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-300`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-400`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-600`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-700`),
      ...labelsClasses.map((lbl) => `border-${lbl}-300`),
      ...labelsClasses.map((lbl) => `border-${lbl}-700`),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
