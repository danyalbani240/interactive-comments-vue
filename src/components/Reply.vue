<template>
	<div
		v-if="replyData.user.username !== 'juliusomo'"
		class="flex bg-white my-2 items-center"
	>
		<div
			class="bg-purple-50 w-20 h-20 ml-2 rounded hidden md:flex flex-col items-center justify-between py-2"
		>
			<img
				src="../assets/images/icon-plus.svg"
				class="cursor-pointer"
				alt=""
			/>
			<span class="text-purple-700 font-bold">{{ replyData.score }}</span>
			<img
				class="cursor-pointer"
				src="../assets/images/icon-minus.svg"
				alt=""
			/>
		</div>
		<div
			class="bg-white px-5 flex flex-col justify-evenly ml-2 md:ml-0 h-64 mb-2 rounded md:h-40"
		>
			<div class="flex items-center pr-20 md:pr-0 mt-3 text-gray-500">
				<img
					class="w-9 h-9 mr-2"
					:src="replyData.user.image.png"
					:alt="replyData.user.username"
				/>

				<span class="font-bold text-gray-900 mr-2 text-center">{{
					replyData.user.username
				}}</span>

				<span class="text-sm">{{ replyData.createdAt }}</span>
				<div
					class="text-purple-700 cursor-pointer reply-button flex-1 text-right hidden md:block"
				>
					<img
						src="../assets/images/icon-reply.svg"
						class="w-4 mr-1 inline-block align-middle"
						alt="reply"
					/><span class="inline-block font-bold">Reply</span>
				</div>
			</div>
			<p class="mt-3 text-gray-500 md:mt-0">
				@{{ replyData.replyingTo }}, {{ replyData.content }}
			</p>
			<div class="flex justify-between mt-2 items-center md:hidden">
				<div
					class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
				>
					<img
						src="../assets/images/icon-plus.svg"
						class="cursor-pointer"
						alt=""
					/>
					<span class="text-purple-700 font-bold">12</span>
					<img
						class="cursor-pointer"
						src="../assets/images/icon-minus.svg"
						alt=""
					/>
				</div>
				<div class="text-purple-700 cursor-pointer reply-button">
					<img
						src="../assets/images/icon-reply.svg"
						class="w-4 mr-1 inline-block align-middle"
						alt="reply"
					/><span class="inline-block font-bold">Reply</span>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="flex bg-white my-2 items-center" ref="replyElement">
		<div
			class="bg-purple-50 w-10 h-20 ml-2 rounded py-2 hidden md:flex flex-col items-center justify-between"
		>
			<img
				src="../assets/images/icon-plus.svg"
				class="cursor-pointer"
				alt=""
			/>
			<span class="text-purple-700 font-bold">{{ replyData.score }}</span>
			<img
				class="cursor-pointer"
				src="../assets/images/icon-minus.svg"
				alt=""
			/>
		</div>
		<div
			class="bg-white ml-2 md:ml-0 my-2 md:w-full px-5 flex flex-col justify-evenly h-64 rounded md:h-40"
		>
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
						class="cursor-pointer"
						alt=""
					/>
					<span class="text-purple-700 font-bold">
						{{ replyData.score }}</span
					>
					<img
						class="cursor-pointer"
						src="../assets/images/icon-minus.svg"
						alt=""
					/>
				</div>
				<div class="flex flex-1 justify-evenly">
					<div class="flex items-center delete-button cursor-pointer">
						<img
							class="mx-2"
							src="../assets/images/icon-delete.svg"
							alt="delete"
						/>
						<span class="text-red-600">Delete</span>
					</div>
					<div class="flex items-center edit-button cursor-pointer">
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
export default {
	props: {
		replyData: {
			type: Object,
			required: true,
		},
	},
	methods: {
		handleDelete() {
			this.$refs.replyElement.classList.add("delete-animation");
			setTimeout(() => {
				this.$refs.replyElement.remove();
			}, 1000);
			this.$emit("deleteReply", this.replyData.id);
		},
	},
};
</script>

<style></style>
