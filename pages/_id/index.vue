<template>
  <div>
    <v-app>
      <v-container>
        <div class="d-flex align-center justify-center">
          <h1>
            {{ scheme.displayName }}
          </h1>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="benefitDialog = true"
            >Add Benefit</v-btn
          >
        </div>

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
              <v-btn color="success" @click="addBenefit(scheme.name)"
                >Add</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="pillarDialog" width="400px">
          <v-card class="align-center rounded-lg pa-4">
            <v-card-title class="headline">Add Pillar</v-card-title>
            <v-divider></v-divider>
            <div class="d-flex flex-column gap-5">
              <div class="d-flex pr-2 pl-2 align-center">
                <v-text-field
                  v-model="pillarName"
                  label="Pillar Name"
                ></v-text-field>
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
              <v-btn color="success" @click="addPillar(scheme.name)">Add</v-btn>
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
          <div class="d-flex align-center justify-space-around">
            <v-card
              v-for="pillar in scheme.pillars"
              :key="pillar.name"
              width="300px"
              class="align-center rounded-lg"
              height="400px"
            >
              <v-card-title> {{ pillar.displayName }} </v-card-title>
              <v-divider></v-divider>
              <div class="d-flex flex-column">
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
        <div class="mt-10 pa-4 rounded-lg" style="border: 1px solid white">
          <div class="d-flex align-center" style="height: 60px">
            <h2>Paths</h2>
            <!-- <v-spacer></v-spacer> -->
            <v-btn class="ml-10" color="info" @click="calculate(scheme.pillars)"
              >Calculate</v-btn
            >
          </div>
          <div class="d-flex">
            <div
              style="width: 100%"
              v-for="path in paths"
              :key="path.displayName"
            >
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
                  class="
                    ma-2
                    d-flex
                    flex-column
                    justify-space-around justify-center
                    rounded-lg
                  "
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
      </v-container>
    </v-app>

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
        </div>
        <v-spacer></v-spacer>
        <div class="pa-5">
          <v-btn small color="primary" @click="benefitDialog = true"
            >Add Benefit</v-btn
          >
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
      paths: [],
      benefitDialog: false,
      benefitName: "",
      units: ["USD", "INR", "Points"],
      unitValue: "",
      benefitValue: null,
      pillarDialog: false,
      pillarName: "",
      slab_1: null,
      slab_1_1: null,
      slab_2: null,
      slab_2_2: null,
      slab_3: null,
      slab_3_3: null,
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
    addPillar(schemeName) {
      const pillarObj = {
        name: Math.floor(Math.random() * (500 - 400 + 1)) + 400,
        displayName: this.pillarName,
        kpi_dataSet: "",
        slabs: [
          {
            id: 1,
            value: this.slab_1,
            b_value: this.slab_1_1,
            config: "greater",
          },
          {
            id: 2,
            value: this.slab_2,
            config: "between",
            b_value: this.slab_2_2,
          },
          {
            id: 3,
            value: this.slab_3,
            config: "between",
            b_value: this.slab_3_3,
          },
        ],
      };
      console.log(pillarObj);
      this.$store.dispatch("addPillar", {
        schemeName,
        pillarObj,
      });
      this.pillarDialog = false;
    },
    addBenefit(schemeName) {
      const benefitObj = {
        name: Math.floor(Math.random() * (600 - 800 + 1)) + 800,
        displayName: this.benefitName,
        type: "fixed",
        unit: this.unitValue,
        value: this.benefitValue,
      };
      console.log(benefitObj);
      this.$store.dispatch("addBenefit", {
        schemeName,
        benefitObj,
      });
    },
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

<style scoped>
.custom {
  position: fixed;
  box-shadow: -5px 0px 28px 0px rgba(0, 0, 0, 0.39);
  right: 10px;
  top: 30%;
}
</style>>