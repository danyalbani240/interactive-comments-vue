<template>
	<div class="mx-auto flex flex-col justify-center items-center">
		<Comment
			v-for="comment in commentsStore.comments"
			:commentData="comment"
			:key="comment.id"
			@addNewReply="addNewReply"
			@delete-reply="deleteReply"
			@editComment="editComment"
			@editReply="editReply"
			@replyToReply="addNewReply"
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
		deleteComment(id) {},
		addNewReply(commentId, replyData) {
			
		},
		deleteReply(replyId, commentId) {
			fetch(
				`https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/${commentId}/replies/${replyId}.json`,
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			)
				.then(() => {
					delete this.comments[commentId].replies[replyId];
				})
				.catch((e) => console.log(e));
		},
		editComment(newContent, commentId) {
			this.comments[commentId].content = newContent;
			fetch(
				`https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/${commentId}.json`,
				{
					method: "PATCH",
					body: JSON.stringify({ content: newContent }),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			).catch((e) => console.log(e));
		},
		editReply(data) {
			this.comments[data.parentId].replies[data.id].content =
				data.newContent;
			fetch(
				`https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/${data.parentId}/replies/${data.id}.json`,
				{
					method: "PATCH",
					body: JSON.stringify({ content: data.newContent }),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			).catch((e) => console.log(e));
		},
		changeScore(type, id) {
			type === "-"
				? (this.comments[id].score -= 1)
				: (this.comments[id].score += 1);
		},
	},
	computed: {
		...mapStores(useCommentsStore),
	},
};
</script>
