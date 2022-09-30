<template>
  <div v-if="!isLoading">
    <h1 id="page_name">プロフィール</h1>
    <!-- <img "画像IDの挿入"> -->
    <div id="main_profile">
      <v-sheet color="white">
        <!--ここに画像を入れる-->
        <v-avatar size="100" color="indigo">
          <v-icon size="100" dark> mdi-account-circle </v-icon>
        </v-avatar>

        <!-- 画像の表示ができない
      <v-avatar>
      <img
        src="../assets/dog.jpg"
        size="62"
      >
    </v-avatar> -->
        <!-- </v-col>
        </v-row> -->

        <!--↑に画像を入れる-->

          <v-list>
            <v-list-item>
              <p>ユーザーID:{{ user.id }}</p>
            </v-list-item>
            <v-list-item>
              <p>{{ user.name }}</p>
            </v-list-item>
            <v-list-item>
              <p>{{ user.comment }}</p>
            </v-list-item>
          </v-list>

          <general-button 
            @button-click="edit()"
            :buttonText="buttonText"
          />
        <v-spacer></v-spacer>
        <v-divider></v-divider>
      </v-sheet>

      <ul>
        <li id="my_article" 
          v-for="article in articleList"
          :key="article.id"
        >
          <v-sheet color="white">
            <h2>
              <simple-link
                :text="article.title"
                :href="'/main-article'"
                :params="{ id: article.id }"
              />
              <!-- <general-button
                  @button-click="deleteArticle(article.id)"
                  :buttonText="deleteText"
                >
                </general-button> -->

                <v-row justify="end">
                  <v-dialog
                    v-model="dialog"
                    persistent
                  >
                    <template v-slot:activator="{ props }">
                      <general-button
                        color="primary"
                        :menuProps="props"
                        :buttonText="deleteText"
                      />
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        この記事を削除してもよろしいですか?
                      </v-card-title>
                        <v-card-text>一度削除すると復元できません、本当に削除してよろしいですか？</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <general-button
                          color="green darken-1"
                          :buttonText="noText"
                          @button-click="dialog = false"
                        />
                        <general-button
                          color="green darken-1"
                          :buttonText="yesText"
                          @button-click="deleteArticle(article.id)"
                        />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>

            </h2>
            <p>投稿日:{{ article.insertTime }}</p>
            <p v-if="article.updateTime != null">
              最終更新日:{{ article.updateTime }}
            </p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip
                draggable
                v-for="tag in article.tags"
                color="primary"
                :key="tag.id"
              >
                <simple-link
                  :params="{ searchType: 0, word: tag.name }"
                  :href="'/search'"
                  :text="'#' + tag.name"
                />
              </v-chip>
              <v-btn>
                <v-icon>mdi-message-text</v-icon>
              </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
          </v-sheet>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SimpleLink from "../components/atoms/links/GeneralLink.vue";
import GeneralButton from "@/components/atoms/buttons/GeneralButton.vue";

export default {
  name: "OthersPage",
  components: {
    "simple-link": SimpleLink,
    "general-button": GeneralButton
  },
  data() {
    return {
      buttonText: "編集",
      deleteText: '削除',
      noText: 'いいえ',
      yesText: '削除します',
      height: 28,
      width: 100,
      isLoading: Boolean,
      user: Object,
      articleList: Array,
      dialog: false,
    };
  },
  async mounted() {
    await this.init()
  },
  methods: {
     showArticles() {
      this.$router.push({
        path: "/my-article",
        query: {
          userId: this.user.id,
        },
      });
    },
    change() {
      this.dialog = false;
    },
    //編集ボタン
    edit() {
      this.$router.push({
        path: "/profile-edit",
        query: {
          userId: this.user.id,
          name: this.user.name,
          furigana: this.user.furigana,
          mail: this.user.mail,
          tel_no: this.user.telNo,
          password: this.user.password,
          role: this.user.role,
          comment: this.user.comment,
        },
      });
    },
    async init(){
      this.isLoading = true;
      const user = axios.get(
        'http://localhost:8080/user/1'
      );
      const articles = axios.get(
        'http://localhost:8080/article/user/1'
      );
      let userRes;
      let articlesRes;
      [userRes, articlesRes] = await Promise.all([user, articles]);
      this.user = userRes.data;
      this.articleList = articlesRes.data;
      this.isLoading = false;
    },
    async deleteArticle(articleId){
      await axios.delete(
        'http://localhost:8080/article/' + articleId
      )
      console.log(articleId)
        await this.init();
        this.dialog = false;
    }
   
  },
};
</script>

<style>
#my_article {
  background-size: cover;
  padding-top: 4%;
}
</style>