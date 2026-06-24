/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: 'light',
    light: {
      dark: false,
      variables: {}, // ✅ this property is required to avoid Vuetify crash

      colors: {
        //green: '#00ff00' // cannot use primary color names here, so use a custom color name (such as 'greenish')
        greenish: '#03DAC5',

        // Workaround: Custom colors seem to erase default colors, so we need to include the default colors (of `light` or `dark` theme)
        background: '#fbfbfb',
        surface: '#212121',
        primary: '#4A96F2',
        'primary-darken-1': '#3700B3',
        'nav-text-color': '#efae58',
        secondary: '#03DAC5',
        'secondary-darken-1': '#03DAC5',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        accent:'#1293a6'
      },
    },
  },
})
