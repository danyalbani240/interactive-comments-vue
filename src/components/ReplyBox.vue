<template>
	<form
		@submit.prevent="handleSubmit"
		class="bg-white py-4 mx-auto rounded flex w-full mt-5 items-center max-w-3xl"
		data-test="reply-box"
	>
		<img
			class="w-9 h-9 mx-auto"
			src="../assets/images/avatars/image-juliusomo.png"
			alt="account owner image"
		/>
		<textarea
			name="reply"
			class="rounded border-2 w-10/12 mx-auto border-r-gray-500 resize-none outline-none px-2 focus:border-gray-600 py-2"
			data-test="reply-value"
			id=""
			cols="20"
			rows="4"
			v-model="replyText"
			ref="textarea"
		></textarea>

		<button
			class="text-white bg-purple-700 rounded px-4 py-2 text-sm h-10 font-bold mx-auto send-button"
		>
			Send
		</button>
	</form>
</template>
<script>
export default {
	data() {
		return {
			replyText: ``,
		};
	},
	mounted() {
		this.$refs.textarea.focus();
	},
	methods: {
		handleSubmit() {
			this.replyText = "";
			this.$emit("handleReply", this.replyText);
		},
	},
};
</script>
