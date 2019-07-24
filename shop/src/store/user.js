import { ADD_USER, ERROR_MSG, LOGIN_USER, LOGOUT_USER } from './mutation-types'
import { API_URL } from '../config'
import axios from 'axios'


export const userGetters = {
  allUsers: state => {
    return state.users
  },
  userById: (state, getters) => id => {
    if (getters.allUsers.length > 0) {
      return getters.allUsers.filter(p => p.id === id)[0]
    } else {
      return state.user
    }
  },
  maxUserId: (state, getters) => {
    if (getters.allUsers.length > 0) {
      let m = Math.max(...state.users.map(p => p.id))
      return m
    } else {
      return 0
    }
  }
}
export const userMutations = {
  ALL_USERS:(state, payload) => {
    state.users = payload
  },
  [ADD_USER]: (state, payload) => {
    console.log(payload)
    state.users.push(payload)
  },
  [LOGIN_USER]: (state, payload) => {
    // console.log(payload.user )
    // console.log(payload)
    state.user = payload
  },
  [LOGOUT_USER]: state => {
    state.user = null
  }
}

export const userActions = {
  allUsers(context){
    axios.get(API_URL+'/shop/get-users')
      .then(function (response) {
        context.commit('ALL_USERS', response.data)
      })
  },
  addUser (context, payload) {
    context.commit(ADD_USER, payload)
    axios
      .post(API_URL + '/shop/create-user', payload)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  loginUser (context, payload) {
    context.commit(LOGIN_USER, payload)
    return new Promise((resolve, reject) => {
      axios.post(API_URL + '/shop/login-user', payload).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },

  // loginUser1 (context, payload) {
  //   context.commit(LOGIN_USER, payload)
  //   axios
  //     .post(API_URL + '/shop/login-user', payload)
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // },
  logoutUser (context, payload) {
    context.commit(LOGOUT_USER, payload)
  }
}
