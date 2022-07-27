<template>
	<div class="flex flex-col max-w-3xl mx-auto w-11/12 my-2">
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
					class="cursor-not-allowed"
				/>
				<span class="text-purple-700 font-bold">{{
					commentData.score
				}}</span>
				<img
					class="cursor-not-allowed"
					src="../assets/images/icon-minus.svg"
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
							class="cursor-not-allowed"
							alt=""
						/>
						<span class="text-purple-700 font-bold">{{
							commentData.score
						}}</span>
						<img
							class="cursor-not-allowed"
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
		<ReplyBox
			@handleReply="handleReply"
			v-model="replyText"
			:replyBoxShow="replyBoxShow"
		/>
		<div
			v-if="commentData.replies !== undefined"
			class="flex flex-col comments-container border-l-2 border-gray-300 pl-5 mt-5"
		>
			<Reply
				v-for="reply in commentData.replies"
				:key="reply.id"
				:replyData="reply"
				:parentId="commentData.id"
			/>
		</div>
	</div>
</template>
<script>
import Reply from "./Reply.vue";
import EditModal from "./EditModal.vue";
import ReplyModal from "./ReplyModal.vue";
import ReplyBox from "./ReplyBox.vue";
import { mapStores } from "pinia";
import { useCommentsStore } from "../stores/comments";
export default {
	components: {
		Reply,
		EditModal,
		ReplyModal,
		ReplyBox,
	},
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
		...mapStores(useCommentsStore),
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
					this.commentsStore.createNewReply(
						{
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
						},
						this.commentData.id
					);
				}
			} else {
				if (this.pureReplyData.content === "") {
					return;
				} else {
					this.commentsStore.createNewReply(
						this.pureReplyData,
						this.commentData.id
					);

					this.replyText = `${
						"@" + this.commentData.user.username.trim() + ","
					}`;
					this.replyBoxShow = !this.replyBoxShow;
				}
			}
		},
	},
};
</script>
