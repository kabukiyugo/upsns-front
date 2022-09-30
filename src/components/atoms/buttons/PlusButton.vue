<template>
    <v-btn 
      :height="height"
      :width="width"
      :color="buttonColor"
      icon
      @click="onClick">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: 'plus-button',
    methods: {
      onClick() {
        this.$emit('button-click')
      }
    },
    inheritAttrs: false,
    props: {
      buttonText: {
        type: String, 
        required: true
      },
      height: {
        type: Number
      },
      width: {
        type: Number
      },
      color: {
        type: String
      }
    },
    computed: {
      buttonColor(){
        return this.color?this.color:'black';
      }
    }
  }
  </script>
  
  <style>
  .general_button {
    border: solid 1px #333;
    padding: 0px;
    font-weight: bold;
    text-align: center;
  }
  </style>