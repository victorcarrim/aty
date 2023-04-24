/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            buttonLogin: "#1976D2",
            buttonLoginLigth: "#2291FF",
            blackColor: "#000000",
            navbarColor: "#1565C0",
            backgroundSystem: "#E3F2FD",
            backgroudComponent: "#B5DFFF",
         },
         fontFamily: {
            // 'roboto': ['Roboto', 'sans-serif']
         },
         backgroundImage: {
            "foto-galaxia": "url('/src/assets/wp4153838.jpeg')",
            "video-galaxia": "url('./src/assets/video-login.mp4')",
         },
         spacing: {
            128: "30rem",
            150: "50rem",
            tipo: "2.562rem",
         },
         gridTemplateColumns: {
            wrapper: "240px 1fr",
         },
      },
   },
   plugins: [require("@tailwindcss/forms")],
};
