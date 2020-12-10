import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#881F1A', // короткое описание
        secondary: '#E82F37', // короткое описание
        buttons: '#881F1A', // короткое описание
        buttonActive: '#882F1A', // короткое описание
        homefone: '#FEFEFE', // короткое описание
        inputs: '#EFEFEF', // короткое описание
        activefield: '#D9D9D9', // короткое описание
        warning: '#FAFF00' // короткое описание
      },
      dark: {
        primary: '#FF0E00',
        secondary: '#E82F37',
        buttons: '#F54436',
        homefone: '#FEFEFE',
        fields: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00'
      }
    }
  }
})
