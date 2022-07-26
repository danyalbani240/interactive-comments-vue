<template>
	<div v-if="commentsStore.comments.length === 0">
		<Vue3Lottie :animationData="loader" :height="200" :width="200" />
	</div>

	<div v-else class="mx-auto flex flex-col justify-center items-center">
		<Comment
			v-for="comment in commentsStore.comments"
			:commentData="comment"
			:key="comment.id"
		/>
	</div>

	<AddNewCommentForm />
</template>

<script>
import Comment from "./components/Comment.vue";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import loader from "./assets/11473-loading-spinner.json";
import AddNewCommentForm from "./components/AddNewCommentForm.vue";
import { mapStores } from "pinia";
import { useCommentsStore } from "./stores/comments";
export default {
	components: { Comment, AddNewCommentForm, Vue3Lottie },
	data() {
		return {
			loader,
		};
	},
	mounted() {
		setTimeout(() => {
			this.commentsStore.getComments();
		}, 500);
	},
	computed: {
		...mapStores(useCommentsStore),
	},
};
</script>
