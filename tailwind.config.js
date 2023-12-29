module.exports = {
  content: [
    "./index.html",
    "./src/js/*.js",
    "./node_modules/flowbite/**/*.js",
    "./src/css/style.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
