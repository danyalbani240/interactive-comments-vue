<template>
	<div class="flex bg-white my-2 items-center">
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
</template>

<script>
export default {
	props: {
		replyData: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style></style>
