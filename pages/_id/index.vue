<template>
  <div>
    <v-app>
      <v-container>
        <div class="d-flex align-center justify-center">
          <h1>
            {{ scheme.displayName }}
          </h1>
          <v-spacer></v-spacer>
          <v-btn color="primary">Add Benefit</v-btn>
        </div>

        <v-dialog v-model="pillarDialog" width="400px">
          <v-card class="align-center rounded-lg pa-4">
            <v-card-title class="headline">Add Pillar</v-card-title>
            <v-divider></v-divider>
            <div class="d-flex flex-column gap-5">
              <div class="d-flex pr-2 pl-2 align-center">
                <v-text-field label="Pillar Name"></v-text-field>
              </div>
              <div class="d-flex pr-2 pl-2 align-center">
                <v-text-field
                  v-model="slab_1"
                  class="pr-4"
                  label="value"
                ></v-text-field>
                <v-spacer></v-spacer>
                <h4>Above</h4>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="slab_1_1"
                  class="pl-4"
                  label="value"
                ></v-text-field>
              </div>
              <div class="d-flex pr-2 pl-2 align-center">
                <v-text-field
                  v-model="slab_2"
                  class="pr-4"
                  label="value"
                ></v-text-field>
                <v-spacer></v-spacer>
                <h4>Between</h4>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="slab_2_2"
                  class="pl-4"
                  label="value"
                ></v-text-field>
              </div>
              <div class="d-flex pr-2 pl-2 align-center">
                <v-text-field
                  v-model="slab_3"
                  class="pr-4"
                  label="value"
                ></v-text-field>
                <v-spacer></v-spacer>
                <h4>Between</h4>
                <v-spacer></v-spacer>
                <v-text-field
                  class="pl-4"
                  v-model="slab_3_3"
                  label="value"
                ></v-text-field>
              </div>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="pillarDialog = false">close</v-btn>
              <v-btn color="success">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="mt-10 pa-4 rounded-lg" style="border: 1px solid white">
          <div class="d-flex align-center" style="height: 60px">
            <h2>Pillars</h2>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="pillarDialog = true"
              >Add Pillar</v-btn
            >
          </div>
          <div class="d-flex align-center gap-5">
            <v-card
              v-for="pillar in scheme.pillars"
              :key="pillar.name"
              width="300px"
              class="align-center rounded-lg"
              height="400px"
            >
              <v-card-title> {{ pillar.displayName }} </v-card-title>
              <v-divider></v-divider>
              <div class="d-flex flex-column gap-5">
                <div
                  class="d-flex pr-2 pl-2 align-center"
                  v-for="slab in pillar.slabs"
                  :key="slab.id"
                >
                  <v-text-field
                    label="value"
                    :value="slab.value"
                    @change="
                      (e) => slabUpdated(+e, slab.id, scheme.name, pillar.name)
                    "
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <h4>
                    {{ slab.config == "greater" ? "and above" : "" }}
                    {{
                      slab.config == "between" ? `between ${slab.b_value}` : ""
                    }}
                  </h4>
                  <v-spacer></v-spacer>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </v-container>
    </v-app>
    <div class="custom">
      <v-card
        width="250px"
        class="d-flex flex-column justify-center align-center pa-2 rounded-lg"
      >
        <v-card-subtitle> {{ scheme.displayName }}'s Benefits </v-card-subtitle>
        <v-spacer></v-spacer>
        <div class="pa-5">
          <v-btn small color="primary">Add Benefit</v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    scheme() {
      return this.$store.getters.getSchemeById(this.$nuxt._route.params.id);
    },
  },
  data() {
    return {
      pillarDialog: false,
    };
  },
  methods: {
    slabUpdated(input_value, slab_id, SchemeName, pillar) {
      this.$store.dispatch("updateSlab", {
        SchemeName,
        input_value,
        slab_id,
        pillar,
      });
    },
  },
};
</script>

<style scoped>
.custom {
  position: fixed;
  box-shadow: -5px 0px 28px 0px rgba(0, 0, 0, 0.39);
  right: 10px;
  top: 30%;
}
</style>>