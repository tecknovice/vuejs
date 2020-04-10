import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/countries'
Vue.use(Vuex)

const state = {
  countries:[],
  global:{}
}

const mutations = {
  createCountries(state, countries){
    state.countries = countries
  },
  createGlobal(state,global){
    state.global = global
  }
}

const actions = {
  async init(context){
    let summary  = await API.getSummary()
    context.commit('createCountries',summary.Countries)
    context.commit('createGlobal',summary.Global)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  })