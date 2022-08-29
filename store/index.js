export const state = () => ({
  schemeSet: {},
});
export const mutations = {
  SET_SCHEME(state, obj) {
    state.schemeSet.schemes.push(obj);
  },
  UPDATE_SLAB(state, obj) {
    const { SchemeName, input_value, slab_id, pillar } = obj;
    state.schemeSet.schemes.forEach((schemes, i) => {
      if (schemes.name == SchemeName) {
        schemes.pillars.forEach((p, p_i) => {
          if (p.name == pillar) {
            p.slabs.forEach((s, s_i) => {
              if (s.id == slab_id) {
                state.schemeSet.schemes[i].pillars[p_i].slabs[s_i].value =
                  input_value;
              }
            });
          }
        });
      }
    });
  },
  ADD_PILLAR(state, obj) {
    const { schemeName, pillarObj } = obj;
    state.schemeSet.schemes.forEach((schemes, i) => {
      if (schemes.name == schemeName) {
        state.schemeSet.schemes[i].pillars.push(pillarObj);
      }
    });
  },
  ADD_BENEFIT(state, obj) {
    const { schemeName, benefitObj } = obj;
    state.schemeSet.schemes.forEach((schemes, i) => {
      if (schemes.name == schemeName) {
        state.schemeSet.schemes[i].benefits.push(benefitObj);
      }
    });
  },
  SET_SCHEMESET(state, obj) {
    console.log(obj);
    state.schemeSet = obj;
  },
};

export const actions = {
  setSchemeset(state, payload) {
    state.commit("SET_SCHEMESET", payload);
  },
  nuxtServerInit(vuexContext, context) {
    return context.$axios
      .$get("http://localhost:3001")
      .then((res) => {
        console.log(vuexContext);
        vuexContext.state.schemeSet = res;
      })
      .catch((e) => context.error(e));
  },
  addscheme(state, payload) {
    state.commit("SET_SCHEME", payload);
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
};

export const getters = {
  getSchemes(state) {
    return state.schemeSet.schemes;
  },
  getSchemeById: (state) => (name) => {
    console.log(name);
    return state.schemeSet.schemes.find((scheme) => {
      console.log(scheme.name);
      return scheme.name == name;
    });
  },
};
