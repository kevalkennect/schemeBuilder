<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="400px"
      class="ma-100"
      transition="dialog-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Add Scheme </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Enter Scheme Name </v-card-title>
        <v-card-text
          ><v-text-field
            name="name"
            label="Scheme Name"
            v-model="schemeName"
            id="id"
          ></v-text-field
        ></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createScheme()">
            Create Scheme
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div>
      <v-card
        class="d-flex align-center pa-6"
        v-for="scheme in getSchemes"
        :key="scheme.name"
      >
        <v-card-title>
          <h3>{{ scheme.displayName }}</h3>
        </v-card-title>
        <v-card-title v-for="benefit in scheme.benefits" :key="benefit.name">
          <h3>{{ benefit.displayName }}</h3>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="$router.push(`/${scheme.name}`)"
          >Open</v-btn
        >
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getSchemes() {
      return this.$store.getters.getSchemes;
    },
  },
  data() {
    return {
      dialog: false,
      schemeName: "",
    };
  },
  methods: {
    createScheme() {
      if (this.schemeName == "") return;
      this.dialog = false;
      this.$store.dispatch("addscheme", {
        name: Math.floor(Math.random() * (500 - 1 + 1)) + 1,
        displayName: this.schemeName,
        pillars: [],
        benefits: [],
      });
    },
  },
};
</script>

<style>
</style> 