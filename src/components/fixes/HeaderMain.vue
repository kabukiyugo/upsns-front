<template>
  <v-app-bar :elevation="0" color= "#00294e">
    <!-- <v-layout wrap>
     <v-flex xs12 sm6 md4> -->

<v-spacer  />

      <v-menu>
       <template v-slot:activator="{ props }">
        <tohome-button
          :height="50"
          :width="50"
          @button-click="toHome"
          :color="color"
          :content="content"
          :vuetifyProps="props"
        />
      </template>
    </v-menu>

    <v-spacer  />
    <v-spacer  />
    <v-spacer  />

    <v-menu>
      <template v-slot:activator="{ props }">
        <favorite-button
          @button-click="toSaveArticle"
          :color="color"
          :content="content"
          :vuetifyProps="props"
        />
      </template>
    </v-menu>
<v-spacer />
    <v-menu>
      <template v-slot:activator="{ props }">
        <post-button
          @button-click="post"
          :color="color"
          :content="content"
          :vuetifyProps="props"
        />
      </template>
    </v-menu>
<v-spacer  />
    <v-menu>
      <template v-slot:activator="{ props }">
        <login-button
          @button-click="toLoginPage"
          :color="color"
          :content="content"
          :vuetifyProps="props"
        />
       </template>
      </v-menu>
     <!-- </v-flex>
    </v-layout> -->

    <v-spacer />
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <icon-button
          @button-click="toNotification"
          :color="color"
          :content="content"
          :vuetifyProps="props"
        />
      </template>

      <v-card min-width="600">
        <v-banner
          lines="one"
          icon="mdi-account-multiple-outline"
          color="red"
        >
          <v-banner-text> 〇〇が〇〇の記事にコメントしました </v-banner-text>
          <v-banner-text> yyyy/mm/dd </v-banner-text>

          <template v-slot:actions>
            <general-link
              :href="notification.href"
              :text="notification.text"
            />
          </template>
        </v-banner>

        <v-banner
          lines="one"
          icon="mdi-account-multiple-outline"
          color="red"
        >
          <v-banner-text> 〇〇が〇〇の記事にコメントしました </v-banner-text>
          <v-banner-text> yyyy/mm/dd </v-banner-text>

          <template v-slot:actions>
            <general-link
              :href="notification.href"
              :text="notification.text"
            />
          </template>
        </v-banner>
      </v-card>
    </v-menu>

    <v-avatar color="teal" size="48">
      <general-link
        :href="myPage.href"
        :text="myPage.text" 
      />
    </v-avatar>
  </v-app-bar>
</template>

<script>
import ToHomeButton from "../atoms/buttons/ToHomeButton.vue";
import FavoriteButton from "../atoms/buttons/FavoriteButton.vue";
import LoginButton from "../atoms/buttons/LoginButton.vue";
import PostButton from "../atoms/buttons/PostButton.vue";
import IconButton from "../atoms/buttons/IconButton.vue";
import GeneralLink from "../atoms/links/GeneralLink.vue";

export default {
  name: "header-main",
  components: {
    "tohome-button": ToHomeButton,
    "favorite-button": FavoriteButton,
    "login-button": LoginButton,
    "post-button": PostButton,
    "icon-button": IconButton,
    "general-link": GeneralLink,
  },
  data() {
    return {
      buttonText: "投稿する",
      height: 28,
      width: 100,
      color: "blue",
      hover: false,

      myPage: {
        href: "/myPage",
        text: "MY",
      },
      notification: {
        href: "/Notification",
        text: "通知一覧へ",
      }
    };
  },
  methods: {
    post() {
      this.$router.push("/new-post");
    },
    toNotification() {
      this.$router.push("/notification");
    },
    toSaveArticle(){
      this.$router.push("/save-article");
    },
    toHome(){
      this.$router.push("/time-line");
    },
    toLoginPage(){
      this.$router.push("/");
    }
  },
};
</script>

<style>

#bar{
  color: #00294e;
}

</style>
