module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            backgroundImage: {
                'carte1': "url('../img/carteValeur1.png')",
                'carte2': "url('../img/carteValeur2.png')",
                'carte3': "url('../img/carteValeur3.png')",
                'carte4': "url('../img/Image carrée équipe.png')",
                'notFound': "url('../img/notFound.png')",
                
              },
           
            colors: {
                primary: {
                    light: '#FE880C',
                    DEFAULT: '#FE880C',
                    dark: '#FE880C',
                },
                secondary: {
                    light: '#f39e58',
                    DEFAULT: '#ed7410',
                    dark: '#bf5d0d',
                },
                dark: {
                    light: '#393939',
                    DEFAULT: '#292929',
                    dark: '#222222',
                },
                beige: {
                    light: '#F9F6EF',
                    DEFAULT: '#F9F6EF',
                    dark: '#F9F6EF',
                },
            },
            
        },
        fontFamily: {
            rubik: ['Rubik', 'sans-serif'],
            manuale: ['Manuale', 'sans-serif']
        },
        screens: {
            xs: "480px",
            ss: "620px",
            sm: "768px",
            md: "1060px",
            lg: "1200px",
            xl: "1700px",
          }
    },
    plugins: [require('@tailwindcss/forms')],
};
