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
			@changeScore="changeScore"
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
				let comments = Object.values(res);
				let convertedComments = {};
				for (const comment of comments) {
					if (
						comment.replies !== undefined &&
						Array.isArray(comment.replies)
					) {
						let convertedComment;
						convertedComment = {
							...comment,
							replies: Object.assign({}, comment.replies),
						};
						convertedComments[comment.id] = convertedComment;
					} else {
						convertedComments[comment.id] = comment;
					}
				}
				this.comments = convertedComments;
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
				delete this.comments[id];
			}, 1000);
		},
		addNewReply(commentId, replyData) {
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
					if (this.comments[commentId].replies !== undefined) {
						this.comments[commentId].replies[data.name] = {
							...replyData,
							id: data.name,
						};
					} else {
						this.comments[commentId].replies = {
							[data.name]: {
								...replyData,
								id: data.name,
							},
						};
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
};
</script>
