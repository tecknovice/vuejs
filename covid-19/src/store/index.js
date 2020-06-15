import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/countries'
Vue.use(Vuex)

const state = {
  countries:[],
  global:{},
  geoData:{}
}

const mutations = {
  createCountries(state, countries){
    state.countries = countries
  },
  createGlobal(state,global){
    state.global = global
  },
  createGeoData(state,geoData){
    state.geoData = geoData
  }
}

const actions = {
  async init(context){
    let summary  = await API.getSummary()
    summary.Countries.sort(function(item1, item2) {
      let i = item1["TotalConfirmed"];
      let j = item2["TotalConfirmed"];
      return j-i;      
    });
    context.commit('createCountries',summary.Countries)
    context.commit('createGlobal',summary.Global)
    let geoData = await API.getWorldGeoJson()
    context.commit('createGeoData',geoData)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  })