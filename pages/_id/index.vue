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

        <!-- Pillars -->
        <div class="mt-10 pa-4 rounded-lg" style="border: 1px solid white">
          <div class="d-flex align-center" style="height: 60px">
            <h2>Pillars</h2>
            <v-spacer></v-spacer>
            <v-btn color="success">Add Pillar</v-btn>
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
                  class="d-flex pr-5 pl-5 align-center"
                  v-for="slab in pillar.slabs"
                  :key="slab.id"
                >
                  <v-text-field
                    label="value"
                    :value="slab.value"
                    @change="(e) => slabUpdated(e, slab.id, scheme.name)"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <h4>
                    {{ slab.config == "greater" ? "and above" : "" }}
                    {{ slab.config == "between" ? slab.b_value : "" }}
                  </h4>
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
  methods: {
    slabUpdated(e, id, name) {
      console.log(e, id);
      this.$store.dispatch("updateSlab", {
        name,
        e,
        id,
      });
    },
  },
};
</script>

<style scoped>
.custom {
  position: absolute;
  right: 10px;
  /* top: 30%; */
}
</style>>