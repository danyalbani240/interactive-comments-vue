<template>
	<div class="mx-auto flex flex-col justify-center items-center">
		<Comment
			v-for="comment in commentsStore.comments"
			:commentData="comment"
			:key="comment.id"
			@changeScore="changeScore"
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
	methods: {

		changeScore(type, id) {
			type === "-"
				? (Number(this.comments[id].score) -= 1)
				: (Number(this.comments[id].score) += 1);
		},
	},
	computed: {
		...mapStores(useCommentsStore),
	},
};
</script>
