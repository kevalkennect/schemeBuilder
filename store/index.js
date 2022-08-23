export const state = () => ({
  schemeSet: {
    name: 121,
    displayName: "default",
    schemes: [
      {
        name: 121,
        displayName: "Keval Schemes",
        pillars: [
          {
            name: 121,
            displayName: "Sales",
            kpi_dataSet: "",
            slabs: [
              {
                id: 1,
                value: 100,
                config: "greater",
              },
              {
                id: 2,
                value: 100,
                config: "between",
                b_value: 100,
              },
              {
                id: 3,
                value: 100,
                config: "between",
                b_value: 100,
              },
            ],
          },
        ],
        benefits: [
          {
            name: 121,
            displayName: "N1",
            type: "fixed",
            unit: ["USD", "INR", "Points"],
            value: 99,
          },
        ],
      },
    ],
  },
});

export const mutations = {
  SET_SCHEME(state, obj) {
    state.schemeSet.schemes.push(obj);
  },
  UPDATE_SLAB(state, obj) {
    const { name, id, e } = obj;
    console.log(name, e, id);
    const pillar = state.schemeSet.schemes.filter(
      (scheme) => scheme.name == name
    );
    console.log(pillar);
  },
};

export const actions = {
  addscheme(state, payload) {
    state.commit("SET_SCHEME", payload);
  },
  updateSlab(state, payload) {
    state.commit("UPDATE_SLAB", payload);
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
