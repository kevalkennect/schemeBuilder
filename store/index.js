export const state = () => ({
  schemeSet: {
    name: 100,
    displayName: "default",
    schemes: [
      {
        name: 300,
        displayName: "Keval Schemes 1",
        pillars: [
          {
            name: 400,
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
      {
        name: 301,
        displayName: "Keval Schemes 2",
        pillars: [
          {
            name: 401,
            displayName: "Sales 2 ",
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
            displayName: "N2",
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
