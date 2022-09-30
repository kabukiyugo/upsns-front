<template>
    <v-footer class="v_footer">
      <v-row justify="center" no-gutters>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            rounded
            class="my-2"
          >
            <general-link 
              :href="link.href" 
              :text="link.text"
            />
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script>
import GeneralLink from "../atoms/links/GeneralLink.vue";

export default {
  name: "footer-main",
  components: { 
    "general-link": GeneralLink
  },
  data() {
    return {
      value: " ",
      links: [
        {
          href: "/time-line",
          text: "Home",
        },
        {
          href: "https://www.upload-gp.co.jp/",
          text: "アップロードホームページ",
        }
      ]
    };
  }
};
</script>

<style>
.v_footer {
    background-color: rgba(0, 41, 78, 1) !important;
    color: #000000 !important;
}
</style>