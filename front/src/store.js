import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    /* Here we make the AJAX request for the authentication of the login */
    retrieveToken(context, credentials){
      axios.post('/', {
        email:credentials.email,
        password:credentials.password
      })
      .then(response => {
        console.log(response);
      })
    }

  }
})
