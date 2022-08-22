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

    <!-- <v-card width="500px">
      <v-card-media height="200px"> </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">headline</h3>
          <div>description</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="primary">text</v-btn>
        <v-btn flat color="primary">text</v-btn>
      </v-card-actions>
    </v-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      schemeSet: {
        name: 121,
        displayName: "",
        schemes: [
          {
            name: "",
            displayName: "",
            pillars: [
              {
                name: 121,
                displayName: "",
                kpi_dataSet: "",
                slabs: [
                  {
                    id: 1,
                    value: 100,
                  },
                  {
                    id: 2,
                    value: 100,
                  },
                  {
                    id: 3,
                    value: 100,
                  },
                ],
              },
            ],
            benefits: [
              {
                name: 121,
                displayName: "benefitName",
                type: "fixed",
                unit: ["USD", "INR", "Points"],
                value: 99,
              },
            ],
          },
        ],
      },
      dialog: false,
      schemeName: "",
    };
  },
  methods: {
    createScheme() {
      if (this.schemeName == "") return;
      this.dialog = false;
      this.schemeSet.schemes.push({
        name: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
        displayName: this.schemeName,
        pillars: [
          {
            name: 121,
            displayName: "",
            kpi_dataSet: "",
            slabs: [],
          },
        ],
      });
      console.log(JSON.stringify(this.schemeSet, null, 2));
    },
  },
};
</script>

<style>
</style>