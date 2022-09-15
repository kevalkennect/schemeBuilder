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
    const { schemeId } = obj
    state.schemeSet.schemes.forEach((schemes, i) => {
      if (schemes._id == schemeId) {
        state.schemeSet.schemes[i].benefits.push(obj);
      }
    });
  },
  SET_SCHEMESET(state, obj) {
    console.log(obj);
    state.schemeSet = obj;
  },
  // data.splice(data.findIndex(el => el.id === ID_TO_REMOVE), 1);
  DELETE_SCHEME(state, obj) {
    const { pillarName, id } = obj;
    console.log(pillarName, id);

    state.schemeSet.schemes.forEach((el, i, arr) => {
      if (el._id === id) {
        el.pillars.forEach((ul, ui) => {
          if (ul.name === pillarName) {
            console.log(ul.name, ui);
            state.schemeSet.schemes[i].pillars.splice(ui, 1);
          }
        });
      }
    });
  },
  DELETE_PILLAR(state, obj) {
    const { pillar, id } = obj;
    const { name, displayName, _id: sid } = pillar

    state.schemeSet.schemes.forEach((el, i, arr) => {
      if (el._id === id) {
        el.pillars.forEach((ul, ui) => {
          if (ul.name === name) {
            console.log(ul.name, ui);
            state.schemeSet.schemes[i].pillars.splice(ui, 1);
          }
        });
      }
    });
  },
  DELETE_BENEFIT(state, obj) {
    const { schemeId, id } = obj

    state.schemeSet.schemes.forEach((el, i, arr) => {
      if (el._id === schemeId) {
        el.benefits.forEach((el, ui, arr) => {
          if (el._id === id) {
            state.schemeSet.schemes[i].benefits.splice(ui, 1)
          }
        })
      }
    })

  },
  DELETE_SCHEMESET(state, obj) {
    const { id } = obj
    state.schemeSet.schemes.forEach((el, i, arr) => {

      if (el._id === id) {
        console.log(state.schemeSet.schemes[i])
        state.schemeSet.schemes.splice(el, 1)
      }
    })
  }
};

export const actions = {
  setSchemeset(state, payload) {
    state.commit("SET_SCHEMESET", payload);
  },
  nuxtServerInit(vuexContext, context) {
    return context.$axios
      .$get("http://localhost:3001")
      .then((res) => {
        console.log(res)
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
    state.commit("DELETE_BENEFIT", payload)
  },
  deleteSchemeSet(state, payload) {
    state.commit("DELETE_SCHEMESET", payload)
  }
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
