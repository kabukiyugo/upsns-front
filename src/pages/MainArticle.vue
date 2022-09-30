<template>
  <div v-if="!isLoading">
    <p>{{ article.user.name }}</p>
    <h1>{{ article.title }}</h1>
    <ul>
      <li>投稿日時 {{ article.insertTime }}</li>
      <li>最終更新日時 {{ article.updateTime }}</li>
      <li style="display: inline" v-for="tag in article.tags" :key="tag.id">
        <simple-link
          :params="{ searchType: 0, word: tag.name }"
          :href="'/search'"
          :text="'#' + tag.name"
        >
        </simple-link>
      </li>
    </ul>
    <br />
  <div id="vue-showdown-container">
    <VueShowdown
   :markdown= "htmlData"
  /></div>
  
    <!-- <div class="article" v-html="htmlData"></div> -->
  </div>
  
</template>

<script>
import axios from "axios";
import SimpleLink from "../components/atoms/links/GeneralLink.vue";

export default {
  name: "MainArticle",
  components: {
    "simple-link": SimpleLink,
    
    
  },
  // async setup() {
  //   const res = await axios.get(
  //     "http://localhost:8080/article/" + this.$route.query.id
  //   );
  //   const message = res.data;
  //   return { message };
  // },
  data() {
    return {
      article: Object,
      isLoading: Boolean,
      htmlData: String,
    };
  },
  props: {},
  async mounted() {
    this.isLoading = true;
    const res = await axios.get(
      "http://localhost:8080/article/" + this.$route.query.id
    );
    this.article = res.data;
     this.htmlData = this.article.body; 
    this.isLoading = false;
  },
};
</script>

<style>
li {
  list-style-type: none;
}
.article {

}
#vue-showdown-container table{
 
}

#vue-showdown-container table {
    border-collapse:  collapse; /* セルの線を重ねる */
}
 
#vue-showdown-container tr:nth-child(even) {
    background-color:  #ddd;    /* 背景色指定 */
}
 
#vue-showdown-container th,td {
    padding: 5px 10px;          /* 余白指定 */
}
del {
    text-decoration: line-through;
}
#vue-showdown-container del {
    text-decoration: line-through;
}

</style>