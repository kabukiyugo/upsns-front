<template>
  <md-editor v-model="text" @onUploadImg="onUploadImg" :toolbars="toolbars" :language="language.language" >
    <template #defToolbars >
      
      <emoji  @onChange="onChange($event)">
      </emoji>
    </template>
  </md-editor>
  <general-input
      :value="title"
      message="タイトル"
      @input="title = $event"
      />
      <general-button @button-click="onPost()" :buttonText="buttonText">
        </general-button>
</template>

<script>
import axios from "axios";
import { emojis } from '../const/emoji';
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import GeneralInput from "../components/atoms/inputs/GeneralInput";
import GeneralButton from "@/components/atoms/buttons/GeneralButton.vue";
import Emoji from '../components/atoms/components/Emoji.vue'

export default {
  name: "NewPost",
  components: {
    'md-editor':MdEditor,
    'emoji':Emoji ,
    "general-input": GeneralInput,
    "general-button": GeneralButton,
  },
  data(){
    return {
      emojis:emojis,
      visible:false,
      text:'',
      toolbars:['underline','quote','bold','italic','-','strikeThrough','title','sub','sup',
                'orderedList','unorderedList','-','codeRow','code','link','image','table',
                'mermaid','katex','-','revoke','next','save',0,'=','prettier','pageFullscreen',
                'fullscreen','preview','htmlPreview','catalog','github'],
      language: {
        language: 'en-US'
      },
      title:"",
      buttonText: "投稿",
    }
  },
  // props : {
  // editorId: {
  //   type: String,
  // }

methods : {
  onUploadImg(files) {
      console.log('上传图片', files)
    },
onChange(emoji) {
  console.log(emoji)
 if(typeof emoji=='boolean'){
  return ;
 }
  this.text=emoji
},

async onPost(){
  console.log("saved")
await axios.post("http://localhost:8080/article",{body:this.text,title:this.title,userId:1})
// 改行している所を検知してエスケープシーケンスに　表示のタイミングで￥ｎを
},
},
};
</script>

<style>
.md-editor {
  height: 200%;
}
</style>


