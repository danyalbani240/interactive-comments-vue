<template>
	<Loading v-if="commentsStore.comments.length === 0" />

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

import AddNewCommentForm from "./components/AddNewCommentForm.vue";
import { mapStores } from "pinia";
import { useCommentsStore } from "./stores/comments";
import { defineAsyncComponent } from "vue";
export default {
	components: {
		Comment,
		AddNewCommentForm,
		Loading: defineAsyncComponent(() => {
			import("./components/Loading.vue");
		}),
	},
	data() {
		return {};
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
