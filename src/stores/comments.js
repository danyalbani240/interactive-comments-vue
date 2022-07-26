import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", {
	state: () => ({
		comments: [],
	}),
	actions: {
		getComments() {
			try {
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
								convertedComments[comment.id] =
									convertedComment;
							} else {
								convertedComments[comment.id] = comment;
							}
						}
						this.comments = convertedComments;
					});
			} catch (e) {
				console.log(e);
			}
		},
	},
});
