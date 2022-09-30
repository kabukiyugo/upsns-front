<template>
  <v-container fluid fill-height>
    <v-row no-gutters class="py-8">
      <v-col cols="3" class="py-8">
        <search-form />
      </v-col>

      <v-col cols="9" class="py-8 px-11">
        <ul>
          <li
            class="timeLine_main"
            v-for="article in displayList"
            :key="article.id"
          >
            <v-sheet color="white">
              <v-row no-gutters>
                <v-col cols="1">
                  <v-avatar
                    icon="mdi-account-multiple-outline"
                    color="#ffa500"
                    size="60"
                  >
                  </v-avatar>
                </v-col>
                <v-col cols="11">
                  <v-row no-gutters class="pl-3 py-2">
                    <simple-link
                      id="user_name_size"
                      :params="{ id: article.user.id }"
                      :href="'/others-page'"
                      :text="article.user.name"
                    >
                    </simple-link>
                  </v-row>
                  <v-row no-gutters class="pl-3 my-4">
                    <h1 class="text-xs-h6 text-md-h5 text-lg-h4">
                      <simple-link
                        :params="{ id: article.id }"
                        :href="'/main-article'"
                        :text="article.title"
                      >
                      </simple-link>
                    </h1>
                  </v-row>

                  <!-- 記事の最初の1行だけ表示 -->
                  <!-- マークダウンから変更するコードの追加が必要 -->
                  <v-row no-gutters class="pl-3">
                    <p class="first-text">{{ article.body }}</p>
                  </v-row>

                  <!--リプライ機能-->
                  <!-- <div class="text-center">
                    <v-menu>
                      <template v-slot:activator="{ props }"> -->
                  <!--このボタンを押してリプライ内容を表示-->
                  <!-- <general-button
                          :menuProps="props"
                          :buttonText="menuText"
                          :height="height"
                          :width="width"
                          @button-click="onButtonClick(article.id)"
                        >
                        </general-button>
                      </template> -->
                  <!--リプライ表示欄-->
                  <!-- <v-list>
                        <v-list-item v-for="reply in replys" :key="reply.id"> -->
                  <!-- <v-avatar
              icon="mdi-account-multiple-outline"
              color="#ffa500"
              size="33"
          >
          </v-avatar> -->
                  <!-- <simple-link
              id="user_name_size"
              :params="{ id: article.user.id }"
              :href="'/others-page'"
              :text="article.user.name"
          /> -->
                  <!-- <v-list-item-title>
                            {{ reply.comment }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <br /> -->

                  <v-row no-gutters class="pr-10" justify="end">
                    <!--タグの表示-->
                    <v-card-actions>
                      <v-chip
                        draggable
                        v-for="tag in article.tags"
                        :key="tag.id"
                        label
                      >
                        <simple-link
                          :params="{ searchType: 0, word: tag.name }"
                          :href="'/search'"
                          :text="'#' + tag.name"
                        >
                        </simple-link>
                      </v-chip>
                    </v-card-actions>
                  </v-row>

                  <!--保存ボタン-->
                  <v-row no-gutters class="pl-3">
                    <v-card-actions class="justify-end">
                      <plus-button
                        :color="color"
                        :height="40"
                        :width="40"
                        @button-click="save(article.id)"
                      >
                      </plus-button>
                    </v-card-actions>
                  </v-row>
                  <v-row no-gutters class="pl-3" justify="end">
                    <p>{{ article.insertTime }}</p>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </li>
        </ul>
      </v-col>
    </v-row>
    <!--ページ送り-->
    <v-row no-gutters>
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.ceil(this.articles.length / this.pageSize)"
            :total-visible="7"
            @update:modelValue="pageChange($event)"
          >
          </v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import SearchForm from "../components/molecules/SearchForm.vue";
import SimpleLink from "../components/atoms/links/GeneralLink.vue";
import PlusButton from "../components/atoms/buttons/PlusButton.vue";
// import GeneralButton from "@/components/atoms/buttons/GeneralButton.vue";
export default {
  components: {
    "simple-link": SimpleLink,
    "search-form": SearchForm,
    "plus-button": PlusButton,
    // "general-button": GeneralButton,
  },
  name: "TimeLine",
  data() {
    return {
      page: 1,
      buttonText: "保存する",
      height: 40,
      width: 100,
      articles: [],
      displayList: [],
      pageSize: 5,
      replys: [],
      menuText: "リプライ表示",
      loading: false,
      clicked: 0,
    };
  },
  methods: {
    async save(articleId) {
      const res = await axios.post("http://localhost:8080/favorite", {
        articleId: articleId,
        pushUserId: 6,
        //IDを指定している(ログイン実装後、ログインしているユーザーのIDを差し込む)
      });
      console.log(articleId);
      this.keepArticle = res.data;
      alert("保存しました");
    },
    pageChange(pageNumber) {
      console.log(pageNumber);
      this.displayList = this.articles.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    // async reply(parentId,articleId){
    //   await axios.post('http://localhost:8080/reply', {
    //     //  replyId: replyId,
    //      parentId: parentId,
    //      articleId: articleId,
    //      comment:
    //      userId: ログイン時のユーザー
    //   })
    // },
    async getReply(articleId) {
      this.loading = true;
      const res = await axios.get(
        "http://localhost:8080/reply/search/" + articleId
      );
      this.replys = res.data;
      console.log(res.data);
      this.loading = false;
    },

    async onButtonClick(articleId) {
      if (this.clicked !== articleId) {
        await this.getReply(articleId);
      } else {
        this.replys = [];
      }
    },
  },
  async mounted() {
    const res = await axios.get("http://localhost:8080/article/timeline");
    this.articles = res.data;
    //this.length = Math.ceil(this.articles.length/this.pageSize);
    this.displayList = this.articles.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },
  // computed:{
  //   isOpen(){
  //     return this.replys.length !== 0
  //   }
  // }
};
</script>

<style>
/* #search_lock {
  float: left;
  width: 30%;
  height: 50%;
  margin-top: 10%;
  margin-left: -150px;
} */
h3 {
  margin-bottom: 0.2px;
}
/* .main_lock {
  float: right;
  width: 100%;
  margin-top: 30px;
} */
/* #TimeLine_H1 {
  position: relative;
  padding: 0.2em 0.5em;
  background: rgb(136, 44, 193);
  color: white;
  font-weight: lighter;
} */
.timeLine_main {
  list-style-type: none;
  outline: rgb(235, 235, 235) solid 1px;
  padding: 1em;
}
#user_name_size {
  font-size: 20px;
}
#simple-link {
  text-align: left;
}
#border {
  border-top: 3px solid #666666;
}
.text-center {
  text-align: center;
  margin-top: 20px;
}
.first-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>