<template>
	<div
		ref="modal"
		class="Modal fixed w-screen h-screen bg-black bg-opacity-40 z-10 left-0 top-0"
		@click.self="$emit('closeModal')"
	>
		<form
			class="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-6/12 h-44 bg-white rounded p-4 edit-reply-box"
			@submit.prevent=""
		>
			<textarea
				class="w-full h-20 border-gray-200 focus:border-gray-400 outline-none rounded px-4 py-2 border-2 resize-none my-3"
				placeholder="Reply Text"
				v-model="newContent"
			></textarea>
			<div class="flex justify-between">
				<button
					class="text-white bg-gray-600 cancel p-2 mt-2 cursor-pointer rounded"
					@click="this.$emit('cancel')"
				>
					CANCEL</button
				><button
					class="text-white bg-purple-600 p-2 mt-2 send-edit cursor-pointer rounded"
					@click="handleEdit"
				>
					Edit
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	props: {
		baseValue: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			newContent: this.baseValue,
		};
	},
	methods: {
		handleEdit() {
			// check if there is any change
			if (this.baseValue === this.newContent) {
				return;
			} else {
				this.$emit("submitModal", this.newContent);
			}
		},
	},
};
</script>

<style></style>
