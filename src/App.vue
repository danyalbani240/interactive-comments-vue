<template>
	<div class="mx-auto flex flex-col justify-center items-center">
		<Comment
			v-for="comment in comments"
			:commentData="comment"
			:key="comment.id"
			@addNewReply="addNewReply"
			@delete-reply="deleteReply"
			@delete-comment="deleteComment"
			@editComment="editComment"
			@editReply="editReply"
			@replyToReply="addNewReply"
		/>
	</div>
	<AddNewCommentForm @createComment="createComment" />
</template>

<script>
import Comment from "./components/Comment.vue";
import AddNewCommentForm from "./components/AddNewCommentForm.vue";
export default {
	components: { Comment, AddNewCommentForm },
	data() {
		return {
			comments: [],
		};
	},
	mounted() {
		fetch(
			"https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments.json"
		)
			.then((res) => res.json())
			.then((res) => {
				this.comments = Object.values(res);
			});
	},
	methods: {
		createComment(data) {
			fetch(
				"https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments.json",
				{
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			)
				.then((res) => res.json())
				.then(({ name }) => {
					this.comments.push({ ...data, id: name });
					fetch(
						"https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/" +
							name +
							".json",
						{
							method: "PATCH",
							body: JSON.stringify({ id: name }),
							headers: {
								"Content-type":
									"application/json; charset=UTF-8",
							},
						}
					).catch((e) => console.log(e));
				})
				.catch((e) => console.log(e));
		},
		deleteComment(id) {
			let commentIndex = this.comments.findIndex(
				(comment) => comment.id === id
			);
			fetch(
				"https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/" +
					id +
					".json",
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			).catch((e) => console.log(e));
			setTimeout(() => {
				this.comments.splice(commentIndex, 1);
			}, 1000);
		},
		addNewReply(commentId, replyData) {
			let currentCommentIndex = this.comments.findIndex(
				(comment) => comment.id === commentId
			);
			fetch(
				`https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/${commentId}/replies.json`,
				{
					method: "POST",
					body: JSON.stringify(replyData),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					if (
						this.comments[currentCommentIndex].replies !== undefined
					) {
						this.comments[currentCommentIndex].replies.push({
							...replyData,
							id: data.name,
						});
					} else {
						this.comments[currentCommentIndex]["replies"] = [
							{
								...replyData,
								id: data.name,
							},
						];
					}
					fetch(
						`https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments/${commentId}/replies/${data.name}.json`,
						{
							method: "PATCH",
							body: JSON.stringify({ id: data.name }),
							headers: {
								"Content-type":
									"application/json; charset=UTF-8",
							},
						}
					).catch((e) => console.log(e));
				})
				.catch((e) => console.log(e));
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
					const currentCommentIndex = this.comments.findIndex(
						(comment) => comment.id === commentId
					);
					const replyIndex = this.comments[
						currentCommentIndex
					].replies.findIndex((reply) => reply.id === replyId);

					this.comments[currentCommentIndex].replies.splice(
						replyIndex,
						1
					);
				})
				.catch((e) => console.log(e));
		},
		editComment(newContent, commentId) {
			const commentIndex = this.comments.findIndex(
				(comment) => comment.id === commentId
			);
			this.comments[commentIndex].content = newContent;
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
			const commentIndex = this.comments.findIndex(
				(comment) => comment.id === data.parentId
			);

			this.comments[commentIndex].replies[data.id].content =
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
	},
};
</script>
