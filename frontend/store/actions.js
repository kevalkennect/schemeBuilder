export default {
  setSchemeset(state, payload) {
    state.commit("SET_SCHEMESET", payload);
  },
  nuxtServerInit(vuexContext, context) {
    return context.$axios
      .$get("http://backend:3001")
      .then((res) => {
        console.log(res);
        vuexContext.state.schemeSet.schemes = res.result;
      })
      .catch((e) => {
        context.error(e);
        console.log(e);
      });
  },
  addscheme(state, payload) {
    state.commit("SET_SCHEME", payload);
  },
  deletescheme(state, payload) {
    state.commit("DELETE_SCHEME", payload);
  },
  deletePillar(state, payload) {
    state.commit("DELETE_PILLAR", payload);
  },
  updateSlab(state, payload) {
    state.commit("UPDATE_SLAB", payload);
  },
  addPillar(state, payload) {
    state.commit("ADD_PILLAR", payload);
  },
  addBenefit(state, payload) {
    state.commit("ADD_BENEFIT", payload);
  },
  deleteBenefit(state, payload) {
    state.commit("DELETE_BENEFIT", payload);
  },
  deleteSchemeSet(state, payload) {
    state.commit("DELETE_SCHEMESET", payload);
  },
};
