<template>
      <v-banner
        lines="three"
        color="red"
        class="my-4">
        <template v-slot:prepend>
        <v-avatar
         color="deep-purple-accent-4">
        <banner-link
         :href="others.href"
         :text="others.text"
         class="btn-banner">
        </banner-link>
        </v-avatar>

        </template>
        <v-banner-title class="text-xs-h6 text-md-h5 text-lg-h5">
        タイトル
        </v-banner-title>
        <!-- <v-banner-text>
          投稿日yyyy/mm/dd
        </v-banner-text>
        <v-banner-text>
          更新日yyyy/mm/dd
        </v-banner-text> -->
        <!-- <template v-slot:actions>
        <general-button 
          :buttonText="buttonText"
          :height="height"
          :width="width"
          :color="color">
        </general-button> 
        </template> -->
        <v-banner-actions>
          <v-link>
          #タグ
          </v-link>
        <dialog-component
          :dialog="dialog">
        </dialog-component>
        </v-banner-actions>
      </v-banner>
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      >
      </v-pagination>
</template>

<script>
// import ReleaseButton from '../components/atoms/buttons/ReleaseButton.vue'
import DialogComponent from '../components/atoms/components/DialogComponent.vue'

export default {
  name: "SaveArticle",
  components: {
    //  'release-button':ReleaseButton,
     'dialog-component': DialogComponent
  },
  data(){
    return{
      value: ' ',
      buttonText: '解除',
      height: 28,
      width: 100,
      color: 'blue',
      hover: false,
      dialog: false,

      others: [
        {
          href: '/others-page',
          text: '他'
        }
      ]
    }
  },
}
</script>

<style>
.btn-banner{
  text-transform: uppercase;
  text-align: center;
  position: relative;
  text-decoration: none;
  display:inline-block;
  border-bottom: 2px solid #3367ff;
}
</style>