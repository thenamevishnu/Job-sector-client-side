/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
      extend: {
          height:{
              "120":"77vh"
          },
          backgroundImage:{
              "chat-background":"url('assets/chat-background.jpg')"
          },
          boxShadow:{
                "tag" : "inset 1px 1px 1px gray",
                "button" : "rgba(0, 0, 0, 0.24) 0px 3px 8px"
          }
      },
  },
  plugins: [],
}

