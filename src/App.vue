<template>
	<div class="mx-auto flex flex-col justify-center items-center">
		<Comment
			v-for="comment in comments"
			:commentData="comment"
			:key="comment.id"
			@addNewReply="addNewReply"
		/>
	</div>
	<div
		class="bg-white py-4 mx-auto rounded flex flex-col w-11/12 mt-5 max-w-3xl add-comment-container"
	>
		<textarea
			placeholder="Add a Comment"
			name="Add a Comment"
			class="rounded border-2 add-comment-input w-11/12 mx-auto border-r-gray-400 resize-none outline-none px-2 focus:border-gray-600 py-2 user-new-comment-input"
			id=""
			cols="30"
			rows="5"
		></textarea>
		<div
			class="flex items-center mt-6 justify-between px-2 w-11/12 mx-auto"
		>
			<img
				class="w-9"
				src="https://i.ibb.co/jWJfdwM/image-juliusomo.png"
				alt="account owner image"
			/>
			<button
				data-test="send-comment"
				class="text-white add-new-comment bg-purple-700 rounded px-4 py-2 text-sm h-10 font-bold"
			>
				Send
			</button>
		</div>
	</div>
</template>

<script>
import Comment from "./components/Comment.vue";
export default {
	components: { Comment },
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
				});
		},
	},
};
</script>
