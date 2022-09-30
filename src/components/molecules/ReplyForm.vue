<template>
    <v-form v-model="valid">
    <v-container>
        <general-input
            :message="message"
            @input= "replyComment = $event"
            :value = "replyComment"
        />
        <general-button
            @button-click="sendReply"
            :buttonText="buttonText"
            :height="height"
            :width="width"
        />
    </v-container>
    </v-form>
</template>

<script>
import axios from "axios";
import GeneralInpt from "../atoms/inputs/GeneralInput.vue";
import GeneralButton from "../atoms/buttons/GeneralButton.vue";

export default {
    name: "ReplyForm",
    components: {
        "general-input": GeneralInpt,
        "general-button": GeneralButton
    },
    data: () => ({
    valid: false,
    buttonText: "送信",
    height: 28,
    width: 100,
    message: "reply",
    replyComment: ""
    }),
    props: {
        articleId: {
            type: Number,
            required: true,
        }
    },
    methods: {
        async sendReply() {
        const res = await axios.post(
            "http://localhost:8080/reply", {
                articleId : this.articleId,
                comment : this.replyComment,
                userId: 1,
            }
        )
            this.reply = res.data,
            this.delete()
        },
        delete(){
            this.replyComment = "";
        }
    }
}
</script>

<style>

</style>