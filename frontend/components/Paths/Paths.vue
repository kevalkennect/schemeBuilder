<template>
  <div class="mt-10 pa-4 rounded-lg" style="border: 1px solid white">
    <div class="d-flex align-center" style="height: 60px">
      <h2>Paths</h2>
      <!-- <v-spacer></v-spacer> -->
      <v-btn class="ml-10" color="info" @click="calculate(scheme.pillars)"
        >Calculate</v-btn
      >
    </div>
    <div class="d-flex">
      <div style="width: 100%" v-for="path in paths" :key="path.displayName">
        <v-card
          width="100%"
          class="d-flex flex-column"
          style="border: 1px solid white; height: 100%"
        >
          <v-card-title primary-title>
            {{ path.displayName }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card
            v-for="value in path.p_value"
            style="height: 100%; border: 1px dashed white"
            :key="value"
            class="ma-2 d-flex flex-column justify-space-around justify-center rounded-lg"
          >
            <v-card-subtitle v-for="slab in path.slabs" :key="slab.id">
              {{ slab.value }}
              {{ slab.config }}
              {{ slab.b_value }}
            </v-card-subtitle>
          </v-card>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["scheme"],
  data() {
    return {
      paths: [],
    };
  },
  methods: {
    calculate(arr) {
      let slab = 1;
      const newArr = arr.map((el, i, arr) => {
        let el_v = arr[i].slabs.length;
        slab = el_v * slab;
        let obj = {
          p_value: slab / arr[i].slabs.length,
          displayName: el.displayName,
          slabs: el.slabs,
        };
        return obj;
      });
      this.paths = newArr;
      console.log(newArr);
    },
  },
};
</script>

<style></style>
