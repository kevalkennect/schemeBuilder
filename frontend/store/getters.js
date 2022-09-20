

export default {
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
  