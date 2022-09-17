<template>
  <div>
    <v-app>
      <v-container>
        <div class="d-flex align-center justify-center">
          <h1>
            {{ scheme.displayName }}
          </h1>
        </div>

        <!-- add pillar dialog -->
        <Pillars :scheme="scheme" />

        <!-- paths -->
        <Paths :scheme="scheme" />

        <!-- Benefits -->
        <Benefits :scheme="scheme" />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Benefits from "~/components/Benefits/Benefits.vue";
import Paths from "~/components/Paths/Paths.vue";
import Pillars from "~/components/Pillar/Pillars.vue";
export default {
  components: {
    Pillars,
    Paths,
    Benefits,
  },
  computed: {
    scheme() {
      return this.$store.getters.getSchemeById(this.$nuxt._route.params.id);
    },
  },
};
</script>

<style scoped></style>
>
