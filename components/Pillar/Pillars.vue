<template>
  <div>
    <!-- add pillar dialog -->
    <v-dialog v-model="pillarDialog" width="400px">
      <v-card class="align-center rounded-lg pa-4">
        <v-card-title class="headline">Add Pillar</v-card-title>
        <v-divider></v-divider>
        <div class="d-flex flex-column gap-5">
          <div class="d-flex pr-2 pl-2 align-center">
            <v-text-field v-model="pillarName" label="Pillar Name"></v-text-field>
          </div>
          <div class="d-flex pr-2 pl-2 align-center">
            <v-text-field v-model="slab_1" class="pr-4" label="value"></v-text-field>
            <v-spacer></v-spacer>
            <h4>Above</h4>
            <v-spacer></v-spacer>
            <v-text-field v-model="slab_1_1" class="pl-4" label="value"></v-text-field>
          </div>
          <div class="d-flex pr-2 pl-2 align-center">
            <v-text-field v-model="slab_2" class="pr-4" label="value"></v-text-field>
            <v-spacer></v-spacer>
            <h4>Between</h4>
            <v-spacer></v-spacer>
            <v-text-field v-model="slab_2_2" class="pl-4" label="value"></v-text-field>
          </div>
          <div class="d-flex pr-2 pl-2 align-center">
            <v-text-field v-model="slab_3" class="pr-4" label="value"></v-text-field>
            <v-spacer></v-spacer>
            <h4>Between</h4>
            <v-spacer></v-spacer>
            <v-text-field class="pl-4" v-model="slab_3_3" label="value"></v-text-field>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="pillarDialog = false">close</v-btn>
          <v-btn color="success" @click="addPillar(scheme.name, scheme._id)">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="mt-10 pa-4 rounded-lg" style="border: 1px solid white">
      <div class="d-flex align-center" style="height: 60px">
        <h2>Pillars</h2>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="pillarDialog = true">Add Pillar</v-btn>
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
                  (e) =>
                    slabUpdated(
                      +e,
                      slab.id,
                      scheme.name,
                      pillar.name,
                      scheme._id,
                      pillar._id
                    )
                "
              ></v-text-field>
              <v-spacer></v-spacer>
              <h4>
                {{ slab.config == "greater" ? "and above" : "" }}
                {{ slab.config == "between" ? `between ${slab.b_value}` : "" }}
              </h4>
              <v-spacer></v-spacer>
            </div>
            <v-btn @click="deletePillar(pillar, scheme._id)">🗑</v-btn>
          </div>
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
    slabUpdated(input_value, slab_id, SchemeName, pillar, sid, pid) {
      this.$axios
        .$post("http://localhost:3001/api/schemes/slab", {
          SchemeName,
          input_value,
          slab_id,
          pillar,
          sid,
          pid,
        })
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            // this.$store.dispatch("addscheme", obj);
            this.$store.dispatch("updateSlab", {
              SchemeName,
              input_value,
              slab_id,
              pillar,
              sid,
              pid,
            });
          }
        });
    },
    deletePillar(pillar, id) {
      console.log(pillar._id);
      this.$axios
        .$delete("http://localhost:3001/api/schemes/pillar", {
          data: {
            _id: pillar._id,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            this.$store.dispatch("deletePillar", {
              pillar,
              id,
            });
          }
        });
    },
    addPillar(schemeName, id) {
      const pillarObj = {
        name: Math.floor(Math.random() * (500 - 400 + 1)) + 400,
        displayName: this.pillarName,
        kpi_dataSet: "",
        schemeId: id,
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

      this.$axios
        .$post("http://localhost:3001/api/schemes/pillar", {
          schemeName,
          pillarObj,
        })
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            this.$store.dispatch("addPillar", {
              schemeName,
              pillarObj,
            });
          }
        });

      this.pillarDialog = false;
    },
  },
};
</script>
<style lang=""></style>
