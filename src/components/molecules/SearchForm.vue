<template>
  <v-app>
    <!-- <v-form v-model="valid"> -->
    <!-- <v-container fluid> -->
    <!-- <v-row>
          <v-col cols="12" md="6"> </v-col>
        </v-row> -->

    <v-sheet color="white" height="300" width="360">
      <h3>検索</h3>
      <v-list>
        <v-list-item>
          <v-radio-group v-model="selectedType" row mandatory>
            <v-radio
              v-for="searchType in searchTypes"
              :label="searchType.label"
              :value="searchType.id"
              :key="searchType.id"
            />
          </v-radio-group>
        </v-list-item>

        <v-list-item>
          <general-input
            :value="value"
            :message="searchTypes[selectedType].label"
            @input="value = $event"
          />
        </v-list-item>

        <v-list-item id="searchButtonStyle">
          <general-button
            @button-click="search(value)"
            :buttonText="buttonText"
            :height="height"
            :width="width"
            :disabled="value == ''"
          />
        </v-list-item>
      </v-list>
    </v-sheet>
    <!-- </v-container> -->
    <!-- </v-form> -->
  </v-app>
</template>

<script>
import GeneralInput from "../atoms/inputs/GeneralInput.vue";
import GeneralButton from "../atoms/buttons/GeneralButton.vue";
export default {
  name: "SearchForm",
  components: {
    "general-button": GeneralButton,
    "general-input": GeneralInput,
  },
  data: () => ({
    selectedType: 0,
    valid: false,
    value: "",
    buttonText: "検索",
    height: 28,
    width: 100,
    searchTypes: [
      {
        id: 0,
        label: "#検索",
      },
      {
        id: 1,
        label: "キーワード検索",
      },
    ],
  }),
  methods: {
    search(value) {
      this.$router.push({
        path: "/search",
        query: {
          searchType: this.selectedType,
          word: this.value,
        },
      }),
        alert(value);
    },
  },
};
</script>

<style>
</style>