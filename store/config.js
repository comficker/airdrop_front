export default {
  namespaced: true,
  state: () => ({
    meta: {
      title: "Coming Airdrop"
    },
    modal: null,
  }),
  mutations: {
    ['SET_META'](state, data) {
      state.meta = data;
    },
    ["SET_MODAL"](state, payload) {
      state.modal = payload;
    },
  },
  getters: {
    getMeta: state => {
      return state.meta;
    },
  }
}
