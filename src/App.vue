<template>
	<div class="mx-auto flex flex-col justify-center items-center">
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
export default {
	components: { Comment, AddNewCommentForm },

	mounted() {
		this.commentsStore.getComments();
	},
	computed: {
		...mapStores(useCommentsStore),
	},
};
</script>
