<template>
	<form
		@submit.prevent="handleSubmit"
		class="bg-white py-4 mx-auto rounded flex flex-col w-11/12 mt-5 max-w-3xl add-comment-container"
	>
		<textarea
			placeholder="Add a Comment"
			name="Add a Comment"
			class="rounded border-2 add-comment-input w-11/12 mx-auto border-r-gray-400 resize-none outline-none px-2 focus:border-gray-600 py-2 user-new-comment-input"
			id=""
			cols="30"
			rows="5"
			v-model="content"
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
	</form>
</template>

<script>
export default {
	data() {
		return {
			content: "",
		};
	},
	methods: {
		handleSubmit() {
			const data = {
				content: this.content,
				score: 0,
				replies: [],
				user: {
					username: "juliusomo",
					image: {
						png: "https://i.ibb.co/jWJfdwM/image-juliusomo.png",
						webp: "https://i.ibb.co/cDyZ7yQ/image-juliusomo.webp",
					},
				},
				createdAt: "1 day ago",
			};
			this.$emit("createComment", data);
			this.content = "";
		},
	},
};
</script>

<style></style>
