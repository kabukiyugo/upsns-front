<template>
  <div>
    <h1>通知一覧</h1>
    
    <v-banner
      lines="one"
      icon="mdi-account-multiple-outline"
      color="deep-purple-accent-4"
      class="my-4"
    >
      <v-banner-text>
        〇〇が〇〇の記事にコメントしました
      </v-banner-text>
      <v-banner-text>
        yyyy/mm/dd
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>
    <v-banner
      lines="two"
      icon="mdi-account-multiple-outline"
      color="red"
    >
      
      <v-banner-text>
        〇〇が〇〇の記事にコメントしました
      </v-banner-text>
      <v-banner-text>
        yyyy/mm/dd
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>
  </div>
</template>

<script>
export default {
  name: "NortificationList"
}
</script>

<style>

</style>