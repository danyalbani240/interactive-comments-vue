<template>
	<div class="flex bg-white my-2 items-center" ref="replyElement">
		<div
			class="bg-purple-50 w-10 h-20 ml-2 rounded py-2 hidden md:flex flex-col items-center justify-between"
		>
			<img
				src="../assets/images/icon-plus.svg"
				class="cursor-not-allowed"
				alt=""
			/>
			<span class="text-purple-700 font-bold">{{ replyData.score }}</span>
			<img
				class="cursor-not-allowed"
				src="../assets/images/icon-minus.svg"
				alt=""
			/>
		</div>
		<div
			class="bg-white ml-2 md:ml-0 my-2 md:w-full px-5 flex flex-col justify-evenly h-64 rounded md:h-40"
		>
			<EditModal
				v-show="showEditModal"
				@cancel="showEditModal = false"
				:baseValue="replyData.content"
				@submitModal="handleEdit"
			/>
			<div class="flex items-center md:pr-0 pr-14 mt-3 text-gray-500">
				<img
					class="w-9 h-9 mr-2"
					:src="replyData.user.image.png"
					:alt="replyData.user.username"
				/>
				<span class="font-bold text-gray-900 text-center mr-2">
					{{ replyData.user.username }}</span
				>
				<span
					class="text-white bg-purple-700 mr-2 class rounded text-sm px-1 font-light"
					>You</span
				>
				<span class="text-sm">{{ replyData.createdAt }}</span>

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
					class="text-purple-700 edit-button-mob cursor-pointer flex-1 justify-center hidden md:inline-flex items-center mx-2"
					@click="showEditModal = true"
				>
					<img
						class="mx-2"
						src="../assets/images/icon-edit.svg"
						alt="edit"
					/>
					<span class="text-purple-600">Edit</span>
				</div>
			</div>
			<p class="mt-3 text-gray-500 md:mt-0 reply-content">
				@{{ replyData.replyingTo }}, {{ replyData.content }}
			</p>
			<div class="flex justify-between mt-2 items-center md:hidden">
				<div
					class="bg-purple-50 w-20 h-9 rounded py-2 flex items-center justify-evenly"
				>
					<img
						src="../assets/images/icon-plus.svg"
						class="cursor-not-allowed"
						alt=""
					/>
					<span class="text-purple-700 font-bold">
						{{ replyData.score }}</span
					>
					<img
						class="cursor-not-allowed"
						src="../assets/images/icon-minus.svg"
						alt=""
					/>
				</div>
				<div class="flex flex-1 justify-evenly">
					<div
						@click="handleDelete"
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
						@click="showEditModal = true"
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
</template>

<script>
import EditModal from "./EditModal.vue";
import { mapStores } from "pinia";
import { useCommentsStore } from "../stores/comments";
export default {
	components: {
		EditModal,
	},
	props: {
		replyData: {
			type: Object,
			required: true,
		},
		parentId: {
			required: true,
			type: Number,
		},
	},
	data() {
		return {
			showEditModal: false,
		};
	},
	methods: {
		handleDelete() {
			this.$refs.replyElement.classList.add("delete-animation");

			this.commentsStore.deleteReply(this.replyData.id, this.parentId);
		},
		handleEdit(data) {
			this.commentsStore.editReply(
				{
					newContent: data,
					id: this.replyData.id,
				},
				this.parentId
			);
			this.showEditModal = false;
		},
	},
	computed: {
		...mapStores(useCommentsStore),
	},
};
</script>
