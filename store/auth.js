export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    ['SET_USER'](state, user) {
      state.user = user;
    }
  },
  actions: {
    login(context) {
      context.commit('config/SET_MODAL', {type: "auth"}, {root: true})
    },
    logout(context) {
      context.commit('SET_USER', null);
    },
  },
  getters: {
    getUserName: state => {
      return state.user ? `${state.user.username}` : 'login';
    },
    loggedIn: state => {
      return !!Boolean(state.user)
    }
  }
}
