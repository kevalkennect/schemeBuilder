<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="400px"
      class="ma-100"
      transition="dialog-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          data-testid="add-scheme"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          >Add Scheme
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Enter Scheme Name </v-card-title>
        <v-card-text>
          <v-text-field
            data-testid="scheme-name"
            name="name"
            label="Scheme Name"
            v-model="schemeName"
            id="id"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            data-testid="create-scheme"
            color="primary"
            text
            @click="createScheme()"
          >
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
        <v-btn
          color="info"
          class="mr-10"
          @click="$router.push(`/${scheme.name}`)"
          >Open</v-btn
        >

        <v-btn color="info" @click="deleteScheme(scheme._id)">Delete</v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSchemes"]),
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

      let obj = {
        name: Math.floor(Math.random() * (500 - 1 + 1)) + 1,
        displayName: this.schemeName,
      };
      this.$axios
        .$post("http://localhost:3001/api/schemes", obj)
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            this.$store.dispatch("addscheme", {
              ...obj,
              _id: res.schemeId,
              pillars: [],
              benefits: [],
            });
          }
        });
    },
    deleteScheme(id) {
      this.$axios
        .$delete("http://localhost:3001/", {
          data: {
            id,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            console.log(res);
            this.$store.dispatch("deleteSchemeSet", { id });
          }
        });
    },
  },
};
</script>

<style></style>
