<template>
	<div ref="userComment" class="flex flex-col max-w-3xl mx-auto w-11/12 my-2">
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
							class="flex items-center edit-button cursor-pointer"
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapStores } from "pinia";
import { useCommentsStore } from "../stores/comments";
import EditModal from "./EditModal.vue";
export default {
	components: { EditModal },
	props: {
		commentData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			editModalShow: false,
		};
	},
	methods: {
		handleEdit(data) {
			this.commentsStore.editComment(data, this.commentData.id);
			this.editModalShow = false;
		},
		handleDelete() {
			this.$refs.userComment.classList.add("delete-animation");
			this.commentsStore.deleteComment(this.commentData.id);
		},
	},
	createEditBox() {
		this.editModalShow = true;
	},
	computed: {
		...mapStores(useCommentsStore),
	},
};
</script>
