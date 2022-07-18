<template>
	<div
		v-if="commentData.user.username !== 'juliusomo'"
		class="flex flex-col max-w-3xl mx-auto w-11/12 my-2"
	>
		<ReplyModal
			@submitModal="(data) => handleReply(data, 'Modal')"
			@cancel="replyModalShow = false"
			v-show="replyModalShow"
		/>
		<div class="flex items-center bg-white rounded">
			<div
				class="bg-purple-50 w-20 h-20 ml-2 py-2 rounded hidden md:flex flex-col items-center justify-between"
			>
				<img
					src="../assets/images/icon-plus.svg"
					class="cursor-pointer"
					@click="$emit('changeScore', '+', commentData.id)"
				/>
				<span class="text-purple-700 font-bold">{{
					commentData.score
				}}</span>
				<img
					class="cursor-pointer"
					src="../assets/images/icon-minus.svg"
					@click="$emit('changeScore', '-', commentData.id)"
				/>
			</div>
			<div
				class="bg-white flex flex-col justify-evenly h-60 md:h-40 rounded px-5 max-w-3xl"
			>
				<div class="flex items-center pr-20 md:pr-0 mt-3 text-gray-500">
					<img
						class="w-9 h-9 mr-2"
						:src="commentData.user.image.png"
						:alt="commentData.user.username"
					/>
					<span class="font-bold mr-2 text-gray-900 text-center">{{
						commentData.user.username
					}}</span>
					<span class="text-sm">{{ commentData.createdAt }}</span>
					<div
						@click="createReplyBox('desktop')"
						class="cursor-pointer flex-1 text-right hidden md:block reply-el"
						:class="{
							'text-purple-700': !replyBoxShow,
							'text-red-400': replyBoxShow,
						}"
					>
						<img
							src="../assets/images/icon-reply.svg"
							class="w-4 mr-1 inline-block align-middle"
							alt="reply"
							:class="{
								hidden: replyBoxShow,
							}"
						/><span class="inline-block font-bold">{{
							replyBoxShow === true ? "Cancel" : "Reply"
						}}</span>
					</div>
				</div>
				<p class="mt-3 text-gray-500 md:mt-0">
					{{ commentData.content }}
				</p>
				<div class="flex justify-between mt-2 md:hidden items-center">
					<div
						class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
					>
						<img
							src="../assets/images/icon-plus.svg"
							class="cursor-pointer"
							alt=""
						/>
						<span class="text-purple-700 font-bold">{{
							commentData.score
						}}</span>
						<img
							class="cursor-pointer"
							src="../assets/images/icon-minus.svg"
							alt=""
						/>
					</div>
					<div
						class="text-purple-700 cursor-pointer reply-mobile"
						@click="createReplyBox('mobile')"
					>
						<img
							src="../assets/images/icon-reply.svg"
							class="w-4 mr-1 inline-block align-middle"
							alt="reply"
						/><span class="inline-block font-bold">Reply</span>
					</div>
				</div>
			</div>
		</div>
		<form
			@submit.prevent="handleReply"
			v-show="replyBoxShow"
			class="bg-white py-4 mx-auto rounded flex w-full mt-5 items-center max-w-3xl"
		>
			<img
				class="w-9 h-9 mx-auto"
				src="../assets/images/avatars/image-juliusomo.png"
				alt="account owner image"
			/>
			<textarea
				name="reply"
				class="rounded border-2 w-10/12 mx-auto border-r-gray-400 resize-none outline-none px-2 focus:border-gray-600 py-2"
				data-test="reply-value"
				id=""
				cols="20"
				rows="4"
				v-model="replyText"
			></textarea>

			<button
				class="text-white bg-purple-700 rounded px-4 py-2 text-sm h-10 font-bold mx-auto send-button"
			>
				Send
			</button>
		</form>
		<div
			v-if="commentData.replies !== undefined"
			class="flex flex-col comments-container border-l-2 border-gray-300 pl-5 mt-5"
		>
			<Reply
				v-for="reply in commentData.replies"
				:key="reply.id"
				:replyData="reply"
				@delete-reply="
					(data) => this.$emit('delete-reply', data, commentData.id)
				"
				@editReply="
					(data) =>
						$emit('editReply', {
							...data,
							parentId: commentData.id,
						})
				"
				@createNewReply="
					(data) => $emit('replyToReply', commentData.id, data)
				"
			/>
		</div>
	</div>
	<div
		v-else
		ref="userComment"
		class="flex flex-col max-w-3xl mx-auto w-11/12 my-2"
	>
		<EditModal
			@cancel="editModalShow = false"
			v-show="editModalShow"
			:baseValue="commentData.content"
			@submitModal="handleEdit"
		/>
		<div class="flex items-center bg-white rounded">
			<div
				class="bg-purple-50 w-10 h-20 py-2 ml-2 rounded hidden md:flex flex-col items-center justify-between"
			>
				<img
					src="../assets/images/icon-plus.svg"
					class="cursor-pointer"
					alt=""
				/>
				<span class="text-purple-700 font-bold">{{
					commentData.score
				}}</span>
				<img
					class="cursor-pointer"
					src="../assets/images/icon-minus.svg"
					alt=""
				/>
			</div>
			<div
				class="bg-white flex flex-col justify-evenly w-full h-60 md:h-40 rounded px-5 max-w-3xl"
			>
				<div class="flex items-center pr-20 md:pr-0 mt-3 text-gray-500">
					<img
						class="w-9 h-9 mr-2"
						:src="commentData.user.image.png"
						:alt="commentData.user.username"
					/>
					<span class="font-bold mr-2 text-gray-900 text-center">{{
						commentData.user.username
					}}</span>
					<span
						class="text-white bg-purple-700 mr-2 class rounded text-sm px-1 font-light"
						>You</span
					>
					<span class="text-sm">{{ commentData.createdAt }}</span>
					<div
						class="text-purple-700 mx-2 delete-button cursor-pointer flex-1 justify-center hidden md:flex items-center"
						@click="handleDelete"
					>
						<img
							class="mx-2"
							src="../assets/images/icon-delete.svg"
							alt="delete"
						/>
						<span class="text-red-600">Delete</span>
					</div>
					<div
						class="text-purple-700 edit-button cursor-pointer flex-1 justify-center hidden md:inline-flex items-center mx-2"
						@click="createEditBox"
					>
						<img
							class="mx-2"
							src="../assets/images/icon-edit.svg"
							alt="edit"
						/>
						<span class="text-purple-600">Edit</span>
					</div>
				</div>
				<p class="mt-3 text-gray-500 md:mt-0 content">
					{{ commentData.content }}
				</p>
				<div class="flex justify-between mt-2 md:hidden items-center">
					<div
						class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
					>
						<img
							src="../assets/images/icon-plus.svg"
							class="cursor-pointer"
							alt=""
						/>
						<span class="text-purple-700 font-bold">{{
							commentData.score
						}}</span>
						<img
							class="cursor-pointer"
							src="../assets/images/icon-minus.svg"
							alt=""
						/>
					</div>
					<div class="flex flex-1 justify-evenly">
						<div
							class="flex items-center delete-button cursor-pointer"
						>
							<img
								class="mx-2"
								src="../assets/images/icon-delete.svg"
								alt="delete"
							/>
							<span class="text-red-600">Delete</span>
						</div>
						<div
							class="flex items-center edit-button cursor-pointer"
						>
							<img
								class="mx-2"
								src="../assets/images/icon-edit.svg"
								alt="edit"
							/>
							<span class="text-purple-600">Edit</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Reply from "./Reply.vue";
import EditModal from "./EditModal.vue";
import ReplyModal from "./ReplyModal.vue";
export default {
	components: { Reply, EditModal, ReplyModal },
	data() {
		return {
			replyBoxShow: false,
			replyModalShow: false,
			editModalShow: false,
			replyText: `${"@" + this.commentData.user.username.trim() + ","}`,
		};
	},
	props: {
		commentData: {
			type: Object,
			required: true,
		},
	},
	computed: {
		pureReplyData() {
			let text = this.replyText.split(",");
			text.shift();

			const replyObject = {
				content: text.join(" "),
				createdAt: "1 day ago",
				replyingTo: this.commentData.user.username,
				score: 0,
				user: {
					image: {
						png: "https://i.ibb.co/jWJfdwM/image-juliusomo.png",
						webp: "https://i.ibb.co/cDyZ7yQ/image-juliusomo.webp",
					},
					username: "juliusomo",
				},
			};
			return replyObject;
		},
	},
	methods: {
		createReplyBox(media) {
			if (media === "desktop") {
				this.replyBoxShow = !this.replyBoxShow;
			} else {
				this.replyModalShow = !this.replyModalShow;
			}
		},

		handleReply(data, Media) {
			this.replyModalShow = false;
			if (Media === "Modal") {
				if (data.trim() === "") {
					return;
				} else {
					this.$emit("addNewReply", this.commentData.id, {
						content: data,
						createdAt: "1 day ago",
						replyingTo: this.commentData.user.username,
						score: 0,
						user: {
							image: {
								png: "https://i.ibb.co/jWJfdwM/image-juliusomo.png",
								webp: "https://i.ibb.co/cDyZ7yQ/image-juliusomo.webp",
							},
							username: "juliusomo",
						},
					});
				}
			} else {
				if (this.pureReplyData.content === "") {
					return;
				} else {
					this.$emit(
						"addNewReply",
						this.commentData.id,
						this.pureReplyData
					);
					this.replyText = `${
						"@" + this.commentData.user.username.trim() + ","
					}`;
					this.replyBoxShow = !this.replyBoxShow;
				}
			}
		},
		handleDelete() {
			this.$refs.userComment.classList.add("delete-animation");
			this.$emit("deleteComment", this.commentData.id);
		},
		createEditBox() {
			this.editModalShow = true;
		},
		handleEdit(data) {
			this.$emit("editComment", data, this.commentData.id);
			this.editModalShow = false;
		},
	},
};
</script>

<style></style>
