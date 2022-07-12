<template>
	<div class="flex items-center bg-white rounded my-3 max-w-3xl w-11/12">
		<div
			class="bg-purple-50 w-20 h-20 ml-2 py-2 rounded hidden md:flex flex-col items-center justify-between"
		>
			<img src="../assets/images/icon-plus.svg" class="cursor-pointer" />
			<span class="text-purple-700 font-bold">{{
				commentData.score
			}}</span>
			<img class="cursor-pointer" src="../assets/images/icon-minus.svg" />
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
					data-test="reply-el"
					class="text-purple-700 cursor-pointer flex-1 text-right hidden md:block reply-el"
				>
					<img
						src="../assets/images/icon-reply.svg"
						class="w-4 mr-1 inline-block align-middle"
						alt="reply"
					/><span class="inline-block font-bold">Reply</span>
				</div>
			</div>
			<p class="mt-3 text-gray-500 md:mt-0">{{ commentData.content }}</p>
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
				<div class="text-purple-700 cursor-pointer reply-mobile">
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
		commentData: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style></style>
