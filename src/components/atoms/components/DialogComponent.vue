<template>
    <v-dialog
        v-model="dialog"
        persistent
      >
      <template v-slot:activator="{ props }">
        <general-button
          color="primary"
          :menuProps="props"
          :buttonText="buttonText"
        />
      </template>
      <v-card>
        <v-card-title class="text-h5">
          解除しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <general-button
            color="green darken-1"
            :buttonText="yes"
            @button-click="dialog = false"
          />
          <general-button
            color="green darken-1"
            :buttonText="No"
            @button-click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

<script>
import GeneralButton from "../buttons/GeneralButton.vue";

export default {
    name: 'DialogComponent',
    components: {
      "general-button": GeneralButton 
    },
    data () {
      return {
        dialog: false,
        value: ' ',
        buttonText: '解除',
        height: 28,
        width: 100,
        color: 'blue',
        hover: false,
        Yes: "はい",
        No: "いいえ"
      }
    },
}
  </script>
  <style>
  </style>