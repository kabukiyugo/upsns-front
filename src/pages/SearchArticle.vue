<template>
  <body>
    <div id="main-lock">
      <h1>検索結果</h1>
      <h3 id="space_top">{{ displayList.length }}件見つかりました</h3>
      <ul>
        <li
          class="result-article"
          v-for="result in displayList"
          :key="result.id"
        >
          <v-sheet color="white">
            <p class="text-left">
              <v-avatar
                icon="mdi-account-multiple-outline"
                color="#ffa500"
                size="35"
              />
              <general-link
                id="user_name_size"
                :params="{ id: result.user.id }"
                :href="'/others-page'"
                :text="result.user.name"
              />
            </p>
            <h2 class="article-title">
              <general-link
                :text="result.title"
                :href="'/main-article'"
                :params="{ id: result.id }"
              />
            </h2>
            <v-card-actions class="justify-end">
              <plus-button
                :color="color"
                :height="40"
                :width="40"
                @button-click="save(article.id)"
              />
            </v-card-actions>
          </v-sheet>
        </li>
      </ul>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="Math.ceil(this.resultList.length / this.pageSize)"
          :total-visible="7"
          @update:modelValue="pageChange($event)"
        />
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import GeneralLink from "../components/atoms/links/GeneralLink.vue";
import PlusButton from "../components/atoms/buttons/PlusButton.vue";

export default {
  name: "SearchArticle",
  components: {
    "general-link": GeneralLink,
    "plus-button": PlusButton,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      displayList: [],
      resultList: [],
    };
  },
  methods: {
    pageChange(pageNumber) {
      console.log(pageNumber);
      this.displayList = this.resultList.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
  async mounted() {
    const res = await axios.get(
      "http://localhost:8080/article/search/" +
        this.$route.query.word +
        "?SearchType=" +
        this.$route.query.searchType
    );
    this.resultList = res.data;
    this.displayList = this.resultList.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },
};
</script>

<style>
h1 {
  margin-bottom: 0.2px;
}
#space_top {
  margin-top: 20px;
  margin-bottom: 20px;
}
#main_lock {
  float: right;
  width: 75%;
}
.result-article {
  list-style-type: none;
  outline: rgb(235, 235, 235) solid 1px;
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
  margin-top: 20px;
}
</style>