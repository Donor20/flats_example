import Vue from 'vue'
import Vuex from 'vuex'
import Filters from './modules/filters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    filters: Filters
  },
  strict: process.env.DEV
})

export default store
