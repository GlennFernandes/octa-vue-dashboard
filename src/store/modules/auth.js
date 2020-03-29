export default {
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    getUserDetails(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        user.getIdToken().then((data) => {
          commit('SET_USER', {
            displayName: user.displayName,
            email: user.email,
            token: data,
          });

          localStorage.setItem('token', data);

        });
      } else {
        commit('SET_USER', null);
        localStorage.setItem('token', null);
      }
    },
  },
};
