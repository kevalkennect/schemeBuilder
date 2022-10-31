<template>
  <div class="custom">
    <v-card
      width="250px"
      class="d-flex flex-column justify-center align-center pa-2 rounded-lg"
    >
      <v-card-subtitle> {{ scheme.displayName }}'s Benefits </v-card-subtitle>
      <div
        style="width: 100%; border: 1px solid gray"
        class="d-flex align-center justify-space-around"
        v-for="(benefit, index) of scheme.benefits"
        :key="benefit.name"
      >
        <h3>{{ index + 1 }} : {{ benefit.displayName }}</h3>
        <h3>{{ benefit.value }}</h3>
        <v-btn @click="deleteBenefit(scheme._id, benefit._id)">🗑</v-btn>
      </div>
      <v-spacer></v-spacer>
      <div class="pa-5">
        <v-btn small color="primary" @click="benefitDialog = true"
          >Add Benefit</v-btn
        >
      </div>
    </v-card>

    <!-- add-benefit dialog -->
    <v-dialog v-model="benefitDialog" width="400px">
      <v-card class="align-center rounded-lg pa-4">
        <v-card-title class="headline">Add Benefits</v-card-title>
        <v-divider></v-divider>
        <div class="d-flex flex-column gap-5">
          <div class="d-flex pr-2 pl-2 align-center">
            <v-text-field
              v-model="benefitName"
              label="Benefit Name"
            ></v-text-field>
          </div>

          <!-- <h4>type : {{}}</h4> -->
          <div class="d-flex pr-2 pl-2 align-center">
            <v-select
              v-model="unitValue"
              :items="units"
              label="Unit"
              dense
            ></v-select>
          </div>
          <div class="d-flex pr-2 pl-2 align-center">
            <v-text-field
              v-model="benefitValue"
              class="pr-4"
              label="value"
            ></v-text-field>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="benefitDialog = false">close</v-btn>
          <v-btn color="success" @click="addBenefit(scheme.name, scheme._id)"
            >Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["scheme"],
  data() {
    return {
      benefits: [],
      benefitDialog: false,
      benefitName: "",
      units: ["USD", "INR", "Points"],
      unitValue: "",
      benefitValue: null,
    };
  },
  created() {
    this.$axios.defaults.baseURL = this.$config.BACKEND_API;
  },
  methods: {
    addBenefit(schemeName, id) {
      console.log(id);
      const benefitObj = {
        name: Math.floor(Math.random() * (600 - 800 + 1)) + 800,
        displayName: this.benefitName,
        type: "fixed",
        unit: this.unitValue,
        value: this.benefitValue,
        schemeId: id,
        schemeName,
      };

      // console.log(benefitObj);
      console.log(process.env.BACKEND_API);
      this.$axios
        .$post("/api/benefits", {
          ...benefitObj,
        })
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            this.$store.dispatch("addBenefit", {
              ...benefitObj,
            });
          }
        });
    },

    deleteBenefit(schemeId, id) {
      this.$axios
        .$delete("/api/benefits/", {
          data: {
            id,
          },
        })
        .then((res) => {
          if (res.status == "ok") {
            console.log(res);
            this.$store.dispatch("deleteBenefit", {
              schemeId,
              id,
            });
          }
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
</style>
