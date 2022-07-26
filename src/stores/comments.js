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
		createNewComment(data) {
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
					this.comments[name] = { ...data, id: name };
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
	},
});
